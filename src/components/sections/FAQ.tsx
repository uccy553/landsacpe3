"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";
import { FAQItem } from "@/types";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface FAQProps {
    items: FAQItem[];
}

function FAQAccordionItem({
    item,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            variants={staggerItem}
            className={`border-b border-gray-200 last:border-b-0 ${isOpen ? "bg-[var(--color-primary-50)]" : "bg-white"
                } transition-colors`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 px-6 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-heading text-lg font-semibold text-[var(--color-charcoal)] pr-4">
                    {item.question}
                </span>
                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen
                            ? "bg-[var(--color-primary-500)] text-white"
                            : "bg-[var(--color-primary-50)] text-[var(--color-primary-500)]"
                        }`}
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4" />
                    ) : (
                        <Plus className="w-4 h-4" />
                    )}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ({ items }: FAQProps) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="section-padding bg-white" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Header */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="lg:sticky lg:top-32"
                    >
                        <span className="inline-block px-4 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-500)] rounded-full text-sm font-semibold mb-4">
                            FAQ
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Got questions? We&apos;ve got answers. If you can&apos;t find what
                            you&apos;re looking for, feel free to contact us.
                        </p>
                        <div className="p-6 bg-[var(--color-cream)] rounded-2xl">
                            <h4 className="font-heading text-lg font-bold text-[var(--color-charcoal)] mb-2">
                                Still have questions?
                            </h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Can&apos;t find the answer you&apos;re looking for? Please chat
                                with our friendly team.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center text-[var(--color-primary-500)] font-semibold hover:text-[var(--color-primary-600)] transition-colors"
                            >
                                Get in touch
                                <span className="ml-2">→</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column - FAQ Items */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                        {items.map((item, index) => (
                            <FAQAccordionItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
