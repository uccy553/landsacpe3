import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Camera() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(({ mouse }) => {
        if (cameraRef.current) {
            // Gentle parallax effect based on mouse position
            cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouse.x * 0.5, 0.05);
            cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 2 + mouse.y * 0.2, 0.05);
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return (
        <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            position={[0, 2, 10]}
            fov={75}
        />
    );
}
