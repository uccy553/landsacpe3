"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Clock, ShieldCheck, Heart } from "lucide-react";
import { About as AboutType } from "@/types";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface AboutProps {
    data: AboutType;
}

const iconMap: Record<string, React.ElementType> = {
    quality: Award,
    reliability: Clock,
    expertise: ShieldCheck,
    satisfaction: Heart,
};

export function About({ data }: AboutProps) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section id="about" className="section-padding bg-white" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-500)] rounded-full text-sm font-semibold mb-4">
                        About Us
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-6">
                        {data.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {data.story}
                    </p>
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-3xl p-8 md:p-12 mb-16 text-center"
                >
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                        Our Mission
                    </h3>
                    <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
                        {data.mission}
                    </p>
                </motion.div>

                {/* Values Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {data.values.map((value, index) => {
                        const Icon = iconMap[value.icon] || Award;
                        return (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--color-accent-500)] transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent-500)] transition-colors">
                                    <Icon className="w-7 h-7 text-[var(--color-primary-500)] group-hover:text-[var(--color-primary-900)]" />
                                </div>
                                <h4 className="font-heading text-xl font-bold text-[var(--color-charcoal)] mb-3">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
