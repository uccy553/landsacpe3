"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { backdrop, slideInFromBottom } from "@/lib/animations";

interface NavLink {
    href: string;
    label: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: NavLink[];
    phone: string;
    phoneRaw: string;
}

export function MobileMenu({
    isOpen,
    onClose,
    navLinks,
    phone,
    phoneRaw,
}: MobileMenuProps) {
    const handleLinkClick = () => {
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <motion.div
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <span className="font-heading text-xl font-bold text-[var(--color-primary-500)]">
                            Menu
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5 text-[var(--color-charcoal)]" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-6">
                        <ul className="space-y-1 px-4">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        className="flex items-center px-4 py-4 rounded-xl text-lg font-medium text-[var(--color-charcoal)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-500)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 space-y-4">
                        <a
                            href={`tel:${phoneRaw}`}
                            className="flex items-center gap-3 px-4 py-3 bg-[var(--color-primary-50)] rounded-xl text-[var(--color-primary-500)] font-medium"
                        >
                            <Phone className="w-5 h-5" />
                            {phone}
                        </a>
                        <Button variant="secondary" size="lg" className="w-full">
                            Get Free Quote
                        </Button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
