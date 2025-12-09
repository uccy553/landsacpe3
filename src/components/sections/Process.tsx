"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    MessageSquare,
    FileText,
    CalendarCheck,
    ThumbsUp,
} from "lucide-react";
import { Process as ProcessType } from "@/types";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface ProcessProps {
    data: ProcessType;
}

const iconMap: Record<string, React.ComponentType<any>> = {
    consultation: MessageSquare,
    proposal: FileText,
    service: CalendarCheck,
    guarantee: ThumbsUp,
};

export function Process({ data }: ProcessProps) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section className="section-padding bg-white" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-500)] rounded-full text-sm font-semibold mb-4">
                        How It Works
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">
                        {data.title}
                    </h2>
                </motion.div>

                {/* Process Timeline */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="relative"
                >
                    {/* Desktop Timeline Line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary-500)] via-[var(--color-accent-500)] to-[var(--color-primary-500)]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {data.steps.map((step, index) => {
                            const Icon = iconMap[step.icon] || MessageSquare;
                            return (
                                <motion.div
                                    key={step.number}
                                    variants={staggerItem}
                                    className="relative"
                                >
                                    {/* Mobile/Tablet Connector Line */}
                                    {index < data.steps.length - 1 && (
                                        <div className="lg:hidden absolute top-24 left-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-accent-500)]" />
                                    )}

                                    <div className="flex flex-col items-center text-center relative z-10">
                                        {/* Step Number Circle */}
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center shadow-lg">
                                                <span className="font-heading text-3xl font-bold text-white">
                                                    {step.number}
                                                </span>
                                            </div>
                                            {/* Icon Badge */}
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--color-accent-500)] flex items-center justify-center shadow-md">
                                                <Icon className="w-5 h-5 text-[var(--color-primary-900)]" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                                            <h3 className="font-heading text-xl font-bold text-[var(--color-charcoal)] mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
