import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Scroll and mouse interactive animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Get current scroll position
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Scroll interpolation targets
    const targetScale = 1 - scrollPercent * 0.35; // Shrink sphere as we scroll down
    const targetX = scrollPercent * 1.5 + mouse.x * 0.6; // Shift right and track mouse
    const targetY = -scrollPercent * 0.8 + mouse.y * 0.6; // Shift down and track mouse
    
    // Wireframe Sphere
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.08;
      meshRef.current.rotation.x = time * 0.04;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05));
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
    
    // Core Point Nodes
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.12;
      pointsRef.current.rotation.x = -time * 0.06;
      pointsRef.current.scale.setScalar(THREE.MathUtils.lerp(pointsRef.current.scale.x, targetScale, 0.05));
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 2), []);

  return (
    <group>
      {/* Wireframe outer shell */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial 
          color="#6C3BFF" 
          wireframe 
          transparent 
          opacity={0.12} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Glowing point nodes on vertices */}
      <points ref={pointsRef}>
        <icosahedronGeometry args={[2.02, 2]} />
        <pointsMaterial 
          color="#00D4FF" 
          size={0.05} 
          sizeAttenuation 
          transparent 
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function StarField({ count = 250 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#7DF9FF" 
        size={0.015} 
        sizeAttenuation 
        transparent 
        opacity={0.35} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const CyberSphere: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6C3BFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#00D4FF" />
        <SphereMesh />
        <StarField />
      </Canvas>
    </div>
  );
};
