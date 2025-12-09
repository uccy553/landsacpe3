import { Environment } from '@react-three/drei';

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={0.5} color="#e8f5e9" />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                color="#fff"
                castShadow
            />
            <pointLight position={[-10, 5, -5]} intensity={0.5} color="#d4af37" />
            <Environment preset="sunset" />
        </>
    );
}
