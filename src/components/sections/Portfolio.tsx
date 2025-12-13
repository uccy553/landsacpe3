"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn, ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/types";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

interface PortfolioProps {
    items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [filter, setFilter] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const categories = ["All", ...new Set(items.map((item) => item.category))];
    const filteredItems =
        filter === "All"
            ? items
            : items.filter((item) => item.category === filter);

    const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;

            switch (e.key) {
                case "Escape":
                    setLightboxIndex(null);
                    break;
                case "ArrowLeft":
                    setLightboxIndex((prev) =>
                        prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
                    );
                    break;
                case "ArrowRight":
                    setLightboxIndex((prev) =>
                        prev !== null ? (prev + 1) % filteredItems.length : null
                    );
                    break;
            }
        };

        if (lightboxIndex !== null) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxIndex, filteredItems.length]);

    const navigate = useCallback((direction: "prev" | "next") => {
        setLightboxIndex((prev) => {
            if (prev === null) return null;
            if (direction === "prev") {
                return (prev - 1 + filteredItems.length) % filteredItems.length;
            }
            return (prev + 1) % filteredItems.length;
        });
    }, [filteredItems.length]);

    return (
        <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-br from-neutral-cream/30 via-white to-primary-50/20 relative overflow-hidden" ref={ref}>
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/3 to-accent-500/3 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg shadow-primary-500/30">
                        <Sparkles className="w-4 h-4" />
                        <span className="tracking-wide">OUR TRANSFORMATIONS</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-6 leading-tight">
                        Witness The
                        <span className="block bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500 bg-clip-text text-transparent mt-2">
                            Transformation
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Every project tells a story of dedication, expertise, and remarkable results.
                        Explore our portfolio of stunning lawn transformations.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setFilter(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden
                                ${filter === category
                                    ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/40"
                                    : "bg-white text-gray-700 hover:text-primary-600 shadow-md hover:shadow-lg border border-gray-200"
                                }
                            `}
                        >
                            {filter === category && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Portfolio Grid - REDESIGNED */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative cursor-pointer"
                                onClick={() => setLightboxIndex(index)}
                            >
                                {/* Card Container */}
                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                    {/* Image Container - 16:9 Aspect Ratio */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                        {/* After Image (Default) */}
                                        <img
                                            src={item.afterImage}
                                            alt={`${item.title} - After`}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                        {/* Category Badge - Top Left */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="inline-block px-4 py-1.5 bg-white/95 backdrop-blur-sm text-primary-600 text-xs font-bold rounded-full shadow-lg">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Zoom Icon - Top Right */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                scale: hoveredIndex === index ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40"
                                        >
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </motion.div>

                                        {/* Before/After Label Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                y: hoveredIndex === index ? 0 : 20
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex items-center justify-center z-10"
                                        >
                                            <div className="flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border-2 border-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                                    <span className="text-sm font-bold text-gray-800">Before</span>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                                    <span className="text-sm font-bold text-gray-800">After</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl md:text-2xl font-bold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mb-4">
                                            {item.description}
                                        </p>

                                        {/* View Details Button */}
                                        <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                            <span>View Transformation</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400/50 rounded-2xl transition-all duration-500 pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                            <Sparkles className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                            No projects found
                        </h3>
                        <p className="text-gray-600">
                            Try selecting a different category to see our work.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal - REDESIGNED */}
            <AnimatePresence>
                {currentItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        {/* Close Button - Top Right */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(null);
                            }}
                            className="absolute top-4 md:top-6 right-4 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 shadow-xl"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Counter - Top Left */}
                        <div className="absolute top-4 md:top-6 left-4 md:left-6 z-40 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold text-sm shadow-xl">
                            <span className="text-white/60">Project </span>
                            {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filteredItems.length}
                        </div>

                        {/* Navigation - Left */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("prev");
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        {/* Navigation - Right */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("next");
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        {/* Main Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-6xl mx-auto px-4 md:px-8 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                {/* Before/After Slider */}
                                <div className="relative">
                                    <BeforeAfterSlider
                                        beforeImage={currentItem.beforeImage}
                                        afterImage={currentItem.afterImage}
                                        alt={currentItem.title}
                                        className="w-full aspect-video"
                                    />
                                </div>

                                {/* Project Details */}
                                <div className="p-6 md:p-10">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                        {/* Left Side - Info */}
                                        <div className="flex-1">
                                            {/* Category Badge */}
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold rounded-full mb-4 shadow-lg">
                                                <Sparkles className="w-4 h-4" />
                                                <span>{currentItem.category}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4 leading-tight">
                                                {currentItem.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                                {currentItem.description}
                                            </p>
                                        </div>

                                        {/* Right Side - Tip Card */}
                                        <div className="flex-shrink-0 md:max-w-[280px]">
                                            <div className="p-5 bg-gradient-to-br from-primary-50 to-accent-50/30 rounded-xl border-2 border-primary-200/50">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg">
                                                        <Sparkles className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-primary-900 font-bold text-sm mb-1">
                                                            Interactive Comparison
                                                        </p>
                                                        <p className="text-primary-700 text-xs leading-relaxed">
                                                            Drag the slider to compare before and after, or click anywhere on the image
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}