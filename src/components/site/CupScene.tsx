import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const TOP_R = 0.62;
const BOT_R = 0.42;
const HEIGHT = 1.7;

/**
 * Print texture in the style of the reference cup:
 * two golden ornament bands and turquoise "Qazaqstan" script lettering.
 */
function usePrintTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 1024;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);

    const gold = "#f2c53d";

    /** One repeating ornament band across the full width. */
    const band = (y: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = gold;
      ctx.fillStyle = gold;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, y - h / 2);
      ctx.lineTo(c.width, y - h / 2);
      ctx.moveTo(0, y + h / 2);
      ctx.lineTo(c.width, y + h / 2);
      ctx.stroke();

      const step = 84;
      for (let x = 0; x < c.width; x += step) {
        const cx = x + step / 2;
        // central diamond
        ctx.beginPath();
        ctx.moveTo(cx, y - h * 0.32);
        ctx.lineTo(cx + h * 0.22, y);
        ctx.lineTo(cx, y + h * 0.32);
        ctx.lineTo(cx - h * 0.22, y);
        ctx.closePath();
        ctx.fill();
        // curled side motifs
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx - step * 0.28, y, h * 0.3, -Math.PI * 0.85, Math.PI * 0.85);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + step * 0.28, y, h * 0.3, Math.PI * 0.15, Math.PI * 1.85);
        ctx.stroke();
        // small dots
        ctx.beginPath();
        ctx.arc(cx, y - h * 0.42, 4, 0, Math.PI * 2);
        ctx.arc(cx, y + h * 0.42, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    band(170, 96);
    band(760, 96);

    // turquoise handwritten-style wordmark, repeated around the cup
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < 2; i++) {
      const x = 512 + i * 1024;
      ctx.save();
      ctx.translate(x, 512);
      ctx.rotate(-0.05);
      ctx.font =
        "italic bold 220px 'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive";
      ctx.fillStyle = "#2ec5d8";
      ctx.fillText("Qazaqstan", 0, 0);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#1aa9bd";
      ctx.strokeText("Qazaqstan", 0, 0);
      ctx.restore();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function Drops() {
  const drops = useMemo(() => {
    const out: { p: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < 46; i++) {
      const t = Math.random();
      const y = -HEIGHT / 2 + t * HEIGHT;
      const r = BOT_R + (TOP_R - BOT_R) * t + 0.012;
      const a = Math.random() * Math.PI * 2;
      out.push({
        p: [Math.cos(a) * r, y, Math.sin(a) * r],
        s: 0.014 + Math.random() * 0.022,
      });
    }
    return out;
  }, []);

  return (
    <group>
      {drops.map((d, i) => (
        <mesh key={i} position={d.p} scale={[1, 1.35, 1]}>
          <sphereGeometry args={[d.s, 10, 10]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            roughness={0.05}
            metalness={0}
            transmission={0.85}
            thickness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Cup({ progress }: { progress: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const print = usePrintTexture();
  const current = useRef(0);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const target = (progress.current ?? 0) * Math.PI * 2;
    // frame-rate independent easing — behaves like GSAP scrub
    current.current += (target - current.current) * (1 - Math.exp(-6 * delta));
    if (group.current) {
      group.current.rotation.y = current.current;
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.9) * 0.045 - 0.05;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* frosted body */}
      <mesh castShadow>
        <cylinderGeometry args={[TOP_R, BOT_R, HEIGHT, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#eaf3ec"
          roughness={0.42}
          metalness={0}
          transmission={0.82}
          thickness={0.55}
          ior={1.46}
          transparent
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* print layer */}
      <mesh scale={[1.006, 1, 1.006]}>
        <cylinderGeometry args={[TOP_R, BOT_R, HEIGHT * 0.94, 96, 1, true]} />
        <meshStandardMaterial
          map={print}
          transparent
          roughness={0.55}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* rim */}
      <mesh position={[0, HEIGHT / 2, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[TOP_R + 0.012, 0.026, 16, 96]} />
        <meshStandardMaterial color="#f2f7f0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* bottom */}
      <mesh position={[0, -HEIGHT / 2 + 0.01, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[BOT_R, 64]} />
        <meshPhysicalMaterial
          color="#dfe9e0"
          roughness={0.5}
          transmission={0.4}
          thickness={0.3}
          transparent
        />
      </mesh>

      {/* iced drink */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[TOP_R * 0.93, BOT_R * 0.96, HEIGHT * 0.78, 64]} />
        <meshPhysicalMaterial
          color="#dff2f7"
          roughness={0.2}
          transmission={0.75}
          thickness={0.9}
          ior={1.33}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* clear lid */}
      <group position={[0, HEIGHT / 2 + 0.045, 0]}>
        <mesh>
          <cylinderGeometry args={[TOP_R + 0.05, TOP_R + 0.05, 0.09, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#eef6f8"
            roughness={0.22}
            transmission={0.85}
            thickness={0.25}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[TOP_R + 0.05, 64]} />
          <meshPhysicalMaterial
            color="#e8f3f6"
            roughness={0.18}
            transmission={0.8}
            thickness={0.2}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* clear straw */}
      <group position={[0.15, 0.55, 0.04]} rotation-z={-0.2}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2.2, 24, 1, true]} />
          <meshPhysicalMaterial
            color="#e6f4f7"
            roughness={0.1}
            transmission={0.85}
            thickness={0.15}
            ior={1.45}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <Drops />
    </group>
  );
}

export default function CupScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.35, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={2.1} color="#eaffd0" />
      <directionalLight position={[-4, 1, -3]} intensity={0.9} color="#8fd0ff" />
      <Environment>
        <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={1.1}
          color="#c7f24a"
          position={[-4, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[12, 3, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#7fb2ff"
          position={[4, 0, -1]}
          rotation-y={-Math.PI / 2}
          scale={[12, 3, 1]}
        />
      </Environment>
      <Cup progress={progress} />
    </Canvas>
  );
}
