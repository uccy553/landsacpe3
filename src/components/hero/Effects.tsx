import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface EffectsProps {
    quality: 'high' | 'medium' | 'low';
}

export default function Effects({ quality }: EffectsProps) {
    // Disable effects on low quality
    if (quality === 'low') return null;

    return (
        <EffectComposer>
            {/* Bloom for glowing particles */}
            <Bloom
                intensity={0.5}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.9}
                mipmapBlur
            />

            {/* Depth of Field for cinematic look */}
            {quality === 'high' ? (
                <DepthOfField
                    focusDistance={0.02}
                    focalLength={0.05}
                    bokehScale={3}
                    height={480}
                />
            ) : <></>}

            {/* Subtle chromatic aberration */}
            {quality === 'high' ? (
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={[0.0002, 0.0002]}
                />
            ) : <></>}
        </EffectComposer>
    );
}
