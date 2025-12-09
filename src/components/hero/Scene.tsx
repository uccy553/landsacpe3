import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import GrassField from './GrassField';
import ParticleSystem from './ParticleSystem';
import Lighting from './Lighting';
import Effects from './Effects';
import Camera from './Camera';

interface SceneProps {
    quality: 'high' | 'medium' | 'low';
    onLoad: () => void;
}

export default function Scene({ quality, onLoad }: SceneProps) {
    const { mouse } = useThree();
    const [mousePosition, setMousePosition] = useState(new THREE.Vector2());

    // Track mouse for grass interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMousePosition(new THREE.Vector2(x * 20, y * 20));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Call onLoad after scene is ready
    useEffect(() => {
        const timer = setTimeout(() => onLoad(), 1000);
        return () => clearTimeout(timer);
    }, [onLoad]);

    return (
        <>
            {/* Camera */}
            <Camera />

            {/* Lighting */}
            <Lighting />

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a1915" />
            </mesh>

            {/* Grass Field */}
            <GrassField quality={quality} mousePosition={mousePosition} />

            {/* Particle System */}
            <ParticleSystem
                count={quality === 'high' ? 30000 : quality === 'medium' ? 15000 : 5000}
                quality={quality}
            />

            {/* Post-processing Effects */}
            <Effects quality={quality} />

            {/* Fog for atmosphere */}
            <fog attach="fog" args={['#1a3d2e', 20, 60]} />
        </>
    );
}
