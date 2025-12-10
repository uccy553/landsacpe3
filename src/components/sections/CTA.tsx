"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTA as CTAType, Features } from "@/types";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

interface CTAProps {
    data: CTAType;
    features: Features;
    phone: string;
    phoneRaw: string;
}

export function CTA({ data, features, phone, phoneRaw }: CTAProps) {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <section
            className="section-padding bg-gradient-to-br from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-900)] relative overflow-hidden"
            ref={ref}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            {data.main.title}
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-lg">
                            {data.main.description}
                        </p>

                        {/* Guarantees */}
                        <ul className="space-y-3 mb-8">
                            {features.guarantees.slice(0, 4).map((guarantee, index) => (
                                <li key={index} className="flex items-center gap-3 text-white">
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-accent-500)] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-[var(--color-primary-900)]" />
                                    </div>
                                    <span>{guarantee}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-[var(--color-accent-600)] text-white hover:bg-[var(--color-accent-500)] shadow-lg hover:shadow-xl transition-all"
                            >
                                {data.main.buttonText}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <a
                                href={`tel:${phoneRaw}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm !text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                {phone}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Content - Stats/Trust Box */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                            <h3 className="font-heading text-2xl font-bold text-[var(--color-charcoal)] mb-6 text-center">
                                {data.secondary.title}
                            </h3>
                            <p className="text-gray-600 text-center mb-8">
                                {data.secondary.description}
                            </p>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {features.badges.map((badge, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 bg-[var(--color-cream)] rounded-xl"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary-500)] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-[var(--color-charcoal)]">
                                            {badge.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button variant="primary" size="lg" className="w-full">
                                {data.secondary.buttonText}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
