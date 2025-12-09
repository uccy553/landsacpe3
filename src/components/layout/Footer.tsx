"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Company } from "@/types";

interface FooterProps {
    company: Company;
}

const quickLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About Us" },
    { href: "#portfolio", label: "Our Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];

export function Footer({ company }: FooterProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-primary-900)] text-white">
            {/* Main Footer */}
            <div className="w-full px-8 pt-20 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src="/lawn_care_logo.svg"
                                    alt={company.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-heading text-xl font-bold">
                                {company.name.split(",")[0]}
                            </span>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            {company.description}
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {company.social.facebook && (
                                <a
                                    href={company.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent-500)] transition-colors group"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5 group-hover:text-[var(--color-primary-900)]" />
                                </a>
                            )}
                            {company.social.instagram && (
                                <a
                                    href={company.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent-500)] transition-colors group"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5 group-hover:text-[var(--color-primary-900)]" />
                                </a>
                            )}
                            {company.social.twitter && (
                                <a
                                    href={company.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent-500)] transition-colors group"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5 group-hover:text-[var(--color-primary-900)]" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading text-lg font-bold mb-6 pt-8 md:pt-0 text-[var(--color-accent-500)]">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading text-lg font-bold mb-6 pt-8 md:pt-0 text-[var(--color-accent-500)]">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`tel:${company.contact.phoneRaw}`}
                                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <span>{company.contact.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${company.contact.email}`}
                                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
                                >
                                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <span>{company.contact.email}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>{company.contact.address.full}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="font-heading text-lg font-bold mb-6 pt-8 md:pt-0 text-[var(--color-accent-500)]">
                            Business Hours
                        </h3>
                        <ul className="space-y-2">
                            {Object.entries(company.hours).map(([day, hours]) => (
                                <li
                                    key={day}
                                    className="flex justify-between text-white/70 text-sm"
                                >
                                    <span className="capitalize">{day}</span>
                                    <span>{hours}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-sm text-center md:text-left">
                        © {currentYear} {company.name}. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
