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
function usePrintTexture(lite: boolean) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = lite ? 1024 : 2048;
    c.height = lite ? 512 : 1024;
    const ctx = c.getContext("2d")!;
    const s = lite ? 0.5 : 1;
    ctx.scale(s, s);
    ctx.clearRect(0, 0, 2048, 1024);

    const gold = "#f2c53d";
    const W = 2048;

    const band = (y: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = gold;
      ctx.fillStyle = gold;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, y - h / 2);
      ctx.lineTo(W, y - h / 2);
      ctx.moveTo(0, y + h / 2);
      ctx.lineTo(W, y + h / 2);
      ctx.stroke();

      const step = 84;
      for (let x = 0; x < W; x += step) {
        const cx = x + step / 2;
        ctx.beginPath();
        ctx.moveTo(cx, y - h * 0.32);
        ctx.lineTo(cx + h * 0.22, y);
        ctx.lineTo(cx, y + h * 0.32);
        ctx.lineTo(cx - h * 0.22, y);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx - step * 0.28, y, h * 0.3, -Math.PI * 0.85, Math.PI * 0.85);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + step * 0.28, y, h * 0.3, Math.PI * 0.15, Math.PI * 1.85);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, y - h * 0.42, 4, 0, Math.PI * 2);
        ctx.arc(cx, y + h * 0.42, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    band(170, 96);
    band(760, 96);

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
    tex.anisotropy = lite ? 2 : 8;
    return tex;
  }, [lite]);
}

function Drops({ count }: { count: number }) {
  const drops = useMemo(() => {
    const out: { p: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < count; i++) {
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
  }, [count]);

  return (
    <group>
      {drops.map((d, i) => (
        <mesh key={i} position={d.p} scale={[1, 1.35, 1]}>
          <sphereGeometry args={[d.s, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.45}
            roughness={0.08}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Cup({ progress, lite }: { progress: RefObject<number>; lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const print = usePrintTexture(lite);
  const current = useRef(0);
  const seg = lite ? 40 : 96;

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const target = (progress.current ?? 0) * Math.PI * 2;
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
      <mesh>
        <cylinderGeometry args={[TOP_R, BOT_R, HEIGHT, seg, 1, true]} />
        {lite ? (
          <meshStandardMaterial
            color="#eaf3ec"
            roughness={0.45}
            metalness={0}
            transparent
            opacity={0.62}
            side={THREE.DoubleSide}
          />
        ) : (
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
        )}
      </mesh>

      {/* print layer */}
      <mesh scale={[1.006, 1, 1.006]}>
        <cylinderGeometry args={[TOP_R, BOT_R, HEIGHT * 0.94, seg, 1, true]} />
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
        <torusGeometry args={[TOP_R + 0.012, 0.026, lite ? 8 : 16, seg]} />
        <meshStandardMaterial color="#f2f7f0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* bottom */}
      <mesh position={[0, -HEIGHT / 2 + 0.01, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[BOT_R, lite ? 32 : 64]} />
        <meshStandardMaterial color="#dfe9e0" roughness={0.5} transparent opacity={0.8} />
      </mesh>

      {/* iced drink */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[TOP_R * 0.93, BOT_R * 0.96, HEIGHT * 0.78, lite ? 32 : 64]} />
        {lite ? (
          <meshStandardMaterial color="#dff2f7" roughness={0.25} transparent opacity={0.55} />
        ) : (
          <meshPhysicalMaterial
            color="#dff2f7"
            roughness={0.2}
            transmission={0.75}
            thickness={0.9}
            ior={1.33}
            transparent
            opacity={0.8}
          />
        )}
      </mesh>

      {/* clear lid */}
      <group position={[0, HEIGHT / 2 + 0.045, 0]}>
        <mesh>
          <cylinderGeometry args={[TOP_R + 0.05, TOP_R + 0.05, 0.09, lite ? 32 : 64, 1, true]} />
          <meshStandardMaterial
            color="#eef6f8"
            roughness={0.22}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[TOP_R + 0.05, lite ? 32 : 64]} />
          <meshStandardMaterial
            color="#e8f3f6"
            roughness={0.18}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* clear straw */}
      <group position={[0.15, 0.55, 0.04]} rotation-z={-0.2}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2.2, lite ? 12 : 24, 1, true]} />
          <meshStandardMaterial
            color="#e6f4f7"
            roughness={0.12}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      
    </group>
  );
}

export default function CupScene({
  progress,
  scale = 1,
}: {
  progress: RefObject<number>;
  scale?: number;
}) {
  const lite =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <Canvas
      dpr={lite ? 1 : [1, 2]}
      frameloop="always"
      camera={{ position: [0, 0.35, 4.2 / scale], fov: 42 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={lite ? 0.9 : 0.55} />
      <directionalLight position={[3, 5, 4]} intensity={2.1} color="#eaffd0" />
      <directionalLight position={[-4, 1, -3]} intensity={0.9} color="#8fd0ff" />
      {!lite && (
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
      )}
      <Cup progress={progress} lite={lite} />
    </Canvas>
  );
}
