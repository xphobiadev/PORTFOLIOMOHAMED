"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Orb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#c8a24a"
          emissive="#c8a24a"
          emissiveIntensity={1.5}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

export default function SceneBg() {
  return (
    <div className="absolute inset-0 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 4]} intensity={1.5} />
        <Orb />
      </Canvas>
    </div>
  );
}
