"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useTexture, Decal } from "@react-three/drei";
import * as THREE from "three";
import { useSpring } from "framer-motion";

interface CoinProps {
  activeSection: number;
}

const Coin = ({ activeSection }: CoinProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  const logoTexture = useTexture("/logo.png");
  
  // Create persistent colors for lerping
  const baseColor = useRef(new THREE.Color("#c8f560")).current;
  const pulseColor = useRef(new THREE.Color("#C8F560")).current;

  const springX = useSpring(0, { stiffness: 120, damping: 14 });
  const springY = useSpring(0, { stiffness: 120, damping: 14 });
  const springScale = useSpring(1, { stiffness: 120, damping: 14 });

  React.useEffect(() => {
    if (activeSection === 1) {
      springX.set(0);
      springY.set(0);
      springScale.set(1);
    } else if (activeSection === 2) {
      springX.set(-3.5);
      springY.set(1.5); // Top-left, beneath navbar
      springScale.set(0.5);
    } else if (activeSection === 3) {
      springX.set(3.5);
      springY.set(-2); // Bottom-right
      springScale.set(0.5);
    }
  }, [activeSection, springX, springY, springScale]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Spin horizontally (Y axis) and add slight wobble (X and Z)
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.05;

    // Pulse Logic only in Section 3 (Impact Feed)
    let currentScale = springScale.get();
    let emissiveIntensity = 2;
    let pulseRatio = 0;

    if (activeSection === 3) {
      pulseRatio = (Math.sin(state.clock.getElapsedTime() * 8) + 1) / 2;
      currentScale *= (1 + pulseRatio * 0.05);
      emissiveIntensity = 2 + pulseRatio * 4;
    }

    // Apply Transformations
    groupRef.current.scale.set(currentScale, currentScale, currentScale);
    groupRef.current.position.set(springX.get(), springY.get(), 0);

    // Apply Material Pulse
    if (glowMaterialRef.current) {
      glowMaterialRef.current.emissive.lerpColors(baseColor, pulseColor, pulseRatio);
      glowMaterialRef.current.color.lerpColors(baseColor, pulseColor, pulseRatio);
      glowMaterialRef.current.emissiveIntensity = emissiveIntensity;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.1}
            emissive="#c8f560"
            emissiveIntensity={0.5}
          />
          <Decal
            position={[0, 0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1.8, 0.7, 1]}
          >
            <meshStandardMaterial
              map={logoTexture}
              transparent
              polygonOffset
              polygonOffsetFactor={-1}
              emissive="#c8f560"
              emissiveIntensity={0.5}
            />
          </Decal>
          <Decal
            position={[0, -0.1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.8, 0.7, 1]}
          >
            <meshStandardMaterial
              map={logoTexture}
              transparent
              polygonOffset
              polygonOffsetFactor={-1}
              emissive="#c8f560"
              emissiveIntensity={0.5}
            />
          </Decal>
          {/* We can add a secondary glowing ring to emphasize the neon emerald rim */}
          <mesh>
            <torusGeometry args={[1.5, 0.05, 16, 100]} />
            <meshStandardMaterial
              ref={glowMaterialRef}
              color="#c8f560"
              emissive="#c8f560"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
};

interface Scene3DProps {
  activeSection: number;
}

export const Scene3D = ({ activeSection }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <Coin activeSection={activeSection} />
      </Canvas>
    </div>
  );
};
