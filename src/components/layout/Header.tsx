"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];

interface HeaderProps {
    companyName: string;
    phone: string;
    phoneRaw: string;
}

export function Header({ companyName, phone, phoneRaw }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
                        : "bg-gradient-to-b from-black/50 to-transparent py-5"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 relative">
                            <Image
                                src="/lawn_care_logo.svg"
                                alt={companyName}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span
                            className={cn(
                                "font-heading text-xl font-bold transition-colors duration-300",
                                isScrolled ? "text-[var(--color-primary-500)]" : "!text-white"
                            )}
                        >
                            {companyName.split(",")[0]}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative font-medium transition-colors duration-300 group",
                                    isScrolled
                                        ? "text-[var(--color-charcoal)] hover:text-[var(--color-primary-500)]"
                                        : "!text-white hover:!text-[var(--color-accent-400)]"
                                )}
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent-500)] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href={`tel:${phoneRaw}`}
                            className={cn(
                                "flex items-center gap-2 font-medium transition-colors",
                                isScrolled
                                    ? "text-[var(--color-primary-500)]"
                                    : "!text-white"
                            )}
                        >
                            <Phone className="w-4 h-4" />
                            {phone}
                        </a>
                        <Button variant="secondary" size="sm">
                            Get Free Quote
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={cn(
                            "lg:hidden p-2 rounded-lg transition-colors",
                            isScrolled
                                ? "text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]"
                                : "text-white hover:bg-white/10"
                        )}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                        navLinks={navLinks}
                        phone={phone}
                        phoneRaw={phoneRaw}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
