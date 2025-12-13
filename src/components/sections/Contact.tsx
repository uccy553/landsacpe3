"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Company, Service } from "@/types";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

interface ContactProps {
    company: Company;
    services: Service[];
}

export function Contact({ company, services }: ContactProps) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="contact" className="section-padding bg-[var(--color-cream)]" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-[var(--color-primary-500)] text-white rounded-full text-sm font-semibold mb-4">
                        Contact Us
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-6">
                        Get Your Free Quote Today
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Ready to transform your outdoor space? Fill out the form below or
                        give us a call. We&apos;ll get back to you within 24 hours.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact Cards */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-[var(--color-primary-500)]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] mb-1">
                                        Phone
                                    </h4>
                                    <a
                                        href={`tel:${company.contact.phoneRaw}`}
                                        className="text-[var(--color-primary-500)] font-medium hover:text-[var(--color-primary-600)] transition-colors"
                                    >
                                        {company.contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-[var(--color-primary-500)]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] mb-1">
                                        Email
                                    </h4>
                                    <a
                                        href={`mailto:${company.contact.email}`}
                                        className="text-[var(--color-primary-500)] font-medium hover:text-[var(--color-primary-600)] transition-colors break-all"
                                    >
                                        {company.contact.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-[var(--color-primary-500)]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] mb-1">
                                        Service Area
                                    </h4>
                                    <p className="text-gray-600">{company.serviceRadius}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-[var(--color-primary-500)]" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-[var(--color-charcoal)] mb-2">
                                        Business Hours
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li className="flex justify-between">
                                            <span>Mon - Fri:</span>
                                            <span>{company.hours.monday}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Saturday:</span>
                                            <span>{company.hours.saturday}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Sunday:</span>
                                            <span>{company.hours.sunday}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md h-48 lg:h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.856968161585!2d-90.23556062447618!3d32.20808457390646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8628352845e08a8b%3A0x660bcf85ca013e01!2sManogin%20and%20Younger%20Lawn%20Service!5e0!3m2!1sen!2sng!4v1765609989005!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="lg:col-span-3"
                    >
                        <ContactForm services={services} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
