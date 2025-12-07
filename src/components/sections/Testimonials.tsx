"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import { fadeInUp } from "@/lib/animations";

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Auto-scroll
    useEffect(() => {
        if (!emblaApi || isPaused) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [emblaApi, isPaused]);

    return (
        <section
            id="testimonials"
            className="section-padding bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)]"
            ref={ref}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
                        Testimonials
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        What Our Clients Say
                    </h2>
                    <p className="text-white/70 text-lg">
                        Don&apos;t just take our word for it—hear from our satisfied customers.
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                                >
                                    <div className="bg-white rounded-2xl p-8 h-full shadow-xl">
                                        {/* Quote Icon */}
                                        <Quote className="w-10 h-10 text-[var(--color-accent-500)] mb-4" />

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < testimonial.rating
                                                            ? "fill-[var(--color-accent-500)] text-[var(--color-accent-500)]"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Text */}
                                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-4">
                                            &ldquo;{testimonial.text}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center">
                                                <span className="font-bold text-[var(--color-primary-500)]">
                                                    {testimonial.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[var(--color-charcoal)]">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {testimonial.location}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Service Badge */}
                                        <div className="mt-4">
                                            <span className="inline-block px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-500)] text-xs font-medium rounded-full">
                                                {testimonial.service}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)] hover:text-white transition-colors z-10 hidden md:flex"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)] hover:text-white transition-colors z-10 hidden md:flex"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex
                                        ? "bg-[var(--color-accent-500)] w-8"
                                        : "bg-white/30 hover:bg-white/50"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
