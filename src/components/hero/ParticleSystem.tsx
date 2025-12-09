import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
    count: number;
    quality: 'high' | 'medium' | 'low';
}

export default function ParticleSystem({ count, quality }: ParticleSystemProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Adjust particle count based on quality
    const particleCount = useMemo(() => {
        const baseCount = count;
        switch (quality) {
            case 'high': return baseCount;
            case 'medium': return Math.floor(baseCount * 0.5);
            case 'low': return Math.floor(baseCount * 0.2);
        }
    }, [count, quality]);

    // Initialize particles
    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Random position in field
            positions[i3] = (Math.random() - 0.5) * 40;
            positions[i3 + 1] = Math.random() * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 40;

            // Upward velocity with randomness
            velocities[i3] = (Math.random() - 0.5) * 0.1;
            velocities[i3 + 1] = 0.02 + Math.random() * 0.05;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
        }

        return { positions, velocities };
    }, [particleCount]);

    // Animation
    useFrame(({ clock }) => {
        if (!pointsRef.current) return;

        const time = clock.getElapsedTime();
        const positionAttribute = pointsRef.current.geometry.attributes.position;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Update position
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Add swirling motion
            positions[i3] += Math.sin(time + i * 0.1) * 0.01;
            positions[i3 + 2] += Math.cos(time + i * 0.1) * 0.01;

            // Reset if too high
            if (positions[i3 + 1] > 15) {
                positions[i3 + 1] = 0;
                positions[i3] = (Math.random() - 0.5) * 40;
                positions[i3 + 2] = (Math.random() - 0.5) * 40;
            }
        }

        positionAttribute.needsUpdate = true;
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
                size={0.15}
                color="#d4af37"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}
