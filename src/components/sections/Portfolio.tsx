"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioItem } from "@/types";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface PortfolioProps {
    items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [filter, setFilter] = useState("All");
    const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
    const [showAfter, setShowAfter] = useState(true);

    const categories = ["All", ...new Set(items.map((item) => item.category))];
    const filteredItems =
        filter === "All"
            ? items
            : items.filter((item) => item.category === filter);

    return (
        <section id="portfolio" className="section-padding bg-[var(--color-cream)]" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <span className="inline-block px-4 py-1 bg-primary-500 text-white rounded-full text-sm font-semibold mb-4">
                        Our Portfolio
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
                        See Our Transformations
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Browse our before and after gallery to see the quality of our work.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${filter === category
                                ? "!bg-primary-500 !text-white shadow-lg"
                                : "bg-white text-charcoal hover:bg-primary-50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Portfolio Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => setLightboxItem(item)}
                            >
                                {/* Image Container with Before/After Slider */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-accent-500 text-primary-900 text-xs font-semibold rounded-full">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Before/After Toggle */}
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-charcoal">
                                            View Before & After
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-heading text-xl font-bold text-charcoal mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setLightboxItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setLightboxItem(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[var(--color-charcoal)] hover:bg-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image */}
                            <div className="relative h-[60vh] overflow-hidden">
                                <img
                                    src={`https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1600&auto=format&fit=crop`}
                                    alt={lightboxItem.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Before/After Toggle */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setShowAfter(false)}
                                        className={`px-6 py-2 text-sm font-medium transition-colors ${!showAfter
                                            ? "bg-primary-500 text-white"
                                            : "text-charcoal"
                                            }`}
                                    >
                                        Before
                                    </button>
                                    <button
                                        onClick={() => setShowAfter(true)}
                                        className={`px-6 py-2 text-sm font-medium transition-colors ${showAfter
                                            ? "bg-primary-500 text-white"
                                            : "text-charcoal"
                                            }`}
                                    >
                                        After
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-accent-500/10 text-accent-600 text-xs font-semibold rounded-full mb-2">
                                            {lightboxItem.category}
                                        </span>
                                        <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">
                                            {lightboxItem.title}
                                        </h3>
                                        <p className="text-gray-600">{lightboxItem.description}</p>
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
