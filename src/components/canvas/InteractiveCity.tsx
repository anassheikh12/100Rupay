"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const DigitalGrid = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() % 2) - 1;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid
        infiniteGrid
        fadeDistance={50}
        sectionColor="#006600"
        cellColor="#32CD32"
        sectionSize={5}
        cellSize={1}
      />
    </group>
  );
};

const CyberBox = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#32CD32"
        wireframe={true}
        emissive="#006600"
        emissiveIntensity={2}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      <fog attach="fog" args={["#0d0f0e", 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#32CD32" intensity={1} />
      
      <DigitalGrid />
      
      {/* CyberBoxes removed to prevent blocking the Coin */}
    </>
  );
};

export const InteractiveCity = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
};
