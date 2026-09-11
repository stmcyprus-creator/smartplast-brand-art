import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const TOP_R = 0.62;
const BOT_R = 0.42;
const HEIGHT = 1.7;

/** Print texture: lime hearts + "LOVE" lettering, generated on a canvas. */
function usePrintTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);

    const heart = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#c7f24a";
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(-10, -4, -8, -14, 0, -8);
      ctx.bezierCurveTo(8, -14, 10, -4, 0, 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 14; col++) {
        const x = col * 74 + (row % 2 ? 37 : 0);
        const y = 60 + row * 78;
        heart(x, y, 1.5 + ((row + col) % 3) * 0.25, 0.85);
      }
    }

    ctx.globalAlpha = 1;
    ctx.font = "bold 118px 'Unbounded', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < 3; i++) {
      const x = 170 + i * 342;
      ctx.fillStyle = "#e9ffb0";
      ctx.fillText("LOVE", x, 256);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(199,242,74,0.9)";
      ctx.strokeText("LOVE", x, 256);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.anisotropy = 4;
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

      {/* drink */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[TOP_R * 0.93, BOT_R * 0.96, HEIGHT * 0.78, 64]} />
        <meshPhysicalMaterial
          color="#b7e04a"
          roughness={0.25}
          transmission={0.6}
          thickness={0.9}
          ior={1.33}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* straw */}
      <group position={[0.17, 0.42, 0.05]} rotation-z={-0.24}>
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 2.15, 24, 1, true]} />
          <meshStandardMaterial
            color="#c7f24a"
            roughness={0.35}
            metalness={0.05}
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
