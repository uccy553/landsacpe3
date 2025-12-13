"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    alt: string;
    className?: string;
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    alt,
    className = "",
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (clientX: number) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
                const percentage = (x / rect.width) * 100;
                setSliderPosition(percentage);
            }
        },
        []
    );

    const handleMouseDown = () => setIsDragging(true);
    const handleTouchStart = () => setIsDragging(true);

    const handleMouseUp = useCallback(() => setIsDragging(false), []);
    const handleTouchEnd = useCallback(() => setIsDragging(false), []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        },
        [isDragging, handleMove]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (isDragging) {
                handleMove(e.touches[0].clientX);
            }
        },
        [isDragging, handleMove]
    );

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    // Handle click on container to jump to position
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        handleMove(e.clientX);
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full select-none cursor-ew-resize ${className}`}
            onClick={handleContainerClick}
        >
            {/* After Image (Background - Defines Size) */}
            <img
                src={afterImage}
                alt={`After ${alt}`}
                className="block w-full h-auto"
                draggable={false}
            />

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt={`Before ${alt}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-[var(--color-primary-500)]">
                    <MoveHorizontal size={20} />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm pointer-events-none shadow-xl">
                BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm pointer-events-none shadow-xl">
                AFTER
            </div>
        </div>
    );
}
