"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Hero as HeroType } from "@/types";
import { heroTextContainer, heroTextItem, staggerContainer, staggerItem } from "@/lib/animations";

interface HeroProps {
    data: HeroType;
    phone: string;
    phoneRaw: string;
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
    const numericValue = parseInt(target.replace(/\D/g, ""));

    useEffect(() => {
        if (inView && numericValue) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, 30);
            return () => clearInterval(timer);
        }
    }, [inView, numericValue]);

    const displayValue = target.includes("+")
        ? `${count}+`
        : target.includes("%")
            ? `${count}%`
            : count.toString();

    return (
        <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-accent-500)]">
            {inView ? displayValue : "0"}
        </span>
    );
}

export function Hero({ data, phone, phoneRaw }: HeroProps) {
    const scrollToContent = () => {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-[100vh] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/hero.webp')`,
                    }}
                />
                {/* Vignette Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(5, 30, 5, 0.95) 100%)'
                    }}
                />

            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 py-20 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        variants={heroTextContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-white text-center lg:text-left"
                    >
                        {/* Rating Badge */}
                        <motion.div
                            variants={heroTextItem}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 md:mb-8"
                        >
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]" />
                                ))}
                            </div>
                            <span className="text-sm font-medium">5-Star Rated Service</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={heroTextItem}
                            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                        >
                            {data.headline}
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={heroTextItem}
                            className="text-base md:text-xl text-white/80 mb-6 max-w-xl mx-auto lg:mx-0"
                        >
                            {data.subheadline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={heroTextItem}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="bg-[var(--color-accent-600)] text-white hover:bg-[var(--color-accent-500)] shadow-lg hover:shadow-xl transition-all"
                            >
                                {data.cta.primary}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-[var(--color-primary-500)]"
                            >
                                {data.cta.secondary}
                            </Button>
                        </motion.div>

                        {/* Phone CTA */}
                        <motion.a
                            variants={heroTextItem}
                            href={`tel:${phoneRaw}`}
                            className="inline-flex items-center gap-2 mt-4 md:mt-8 text-white/80 hover:text-white transition-colors"
                        >
                            <div className="p-2 bg-[var(--color-accent-500)] rounded-full animate-pulse-glow">
                                <Phone className="w-5 h-5 text-[var(--color-primary-900)]" />
                            </div>
                            <span className="font-medium">Call {phone}</span>
                        </motion.a>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <div className="glass bg-black/50 backdrop-blur-md rounded-3xl p-8 space-y-8">
                            <h3 className="font-heading text-2xl font-bold text-white text-center">
                                Why Choose Us
                            </h3>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-3 gap-6"
                            >
                                {data.stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        className="text-center"
                                    >
                                        <AnimatedCounter target={stat.number} />
                                        <p className="mt-2 text-white/70 text-sm">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="lg:hidden mt-12"
                >
                    <div className="grid grid-cols-3 gap-4">
                        {data.stats.map((stat, index) => (
                            <div key={index} className="text-center text-white">
                                <AnimatedCounter target={stat.number} />
                                <p className="mt-1 text-white/70 text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToContent}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                aria-label="Scroll down"
            >
                <ArrowDown className="w-8 h-8" />
            </motion.button>
        </section>
    );
}
