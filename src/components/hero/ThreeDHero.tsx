'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Scene from './Scene';
import HeroOverlay from './HeroOverlay';
import LoadingFallback from './LoadingFallback';
import { detectDeviceCapability } from '@/utils/deviceDetection';
import { CompanyData } from '@/types';

interface ThreeDHeroProps {
    data: CompanyData;
}

export default function ThreeDHero({ data }: ThreeDHeroProps) {
    const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Detect device capability and adjust quality
        const capability = detectDeviceCapability();
        setQuality(capability);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* 3D Canvas */}
            <Canvas
                className="absolute inset-0"
                camera={{ position: [0, 2, 10], fov: 75 }}
                dpr={[1, 2]} // Pixel ratio for retina displays
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <Suspense fallback={null}>
                    <Scene quality={quality} onLoad={() => setIsLoading(false)} />
                </Suspense>
            </Canvas>

            {/* UI Overlay */}
            <HeroOverlay isLoading={isLoading} data={data} />

            {/* Loading State */}
            {isLoading && <LoadingFallback />}
        </div>
    );
}
