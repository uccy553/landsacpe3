"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
    Scissors,
    TreePine,
    Droplets,
    Hammer,
    Snowflake,
    Leaf,
    ArrowRight,
} from "lucide-react";
import { Service } from "@/types";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface ServicesProps {
    services: Service[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
    mower: Scissors,
    plants: TreePine,
    treatment: Leaf,
    water: Droplets,
    hardscape: Hammer,
    seasons: Snowflake,
};

export function Services({ services }: ServicesProps) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="services" className="section-padding bg-[var(--color-cream)]" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-[var(--color-primary-500)] text-white rounded-full text-sm font-semibold mb-4">
                        Our Services
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-6">
                        Professional Lawn Care Solutions
                    </h2>
                    <p className="text-gray-600 text-lg">
                        From routine maintenance to complete landscape transformations, we offer
                        comprehensive services to keep your outdoor space looking its best.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Leaf;
                        return (
                            <motion.div
                                key={service.id}
                                variants={staggerItem}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Card Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url('${service.image}')`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-900)] via-transparent to-transparent" />

                                    {/* Icon Badge */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent-500)] rounded-xl flex items-center justify-center shadow-lg">
                                        <Icon className="w-6 h-6 text-[var(--color-primary-900)]" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h3 className="font-heading text-xl font-bold text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-primary-500)] transition-colors">
                                        {service.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {service.shortDescription}
                                    </p>

                                    {/* Pricing & Frequency */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm font-semibold text-[var(--color-primary-500)]">
                                            {service.pricing}
                                        </span>
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent-600)] hover:text-[var(--color-accent-500)] transition-colors group/link"
                                        >
                                            Learn More
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[var(--color-primary-500)]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 text-white">
                                    <Icon className="w-12 h-12 text-[var(--color-accent-500)] mb-4" />
                                    <h3 className="font-heading text-xl font-bold mb-3">
                                        {service.name}
                                    </h3>
                                    <p className="text-white/80 text-sm mb-4 line-clamp-3">
                                        {service.fullDescription}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                <span className="w-1.5 h-1.5 bg-[var(--color-accent-500)] rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="inline-flex items-center gap-2 text-[var(--color-accent-500)] font-medium hover:gap-3 transition-all"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
