"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, glass = false, children, ...props }, ref) => {
        const baseStyles = `
      rounded-2xl overflow-hidden
      transition-all duration-300
    `;

        const hoverStyles = hover
            ? "hover:shadow-xl hover:-translate-y-2"
            : "";

        const glassStyles = glass
            ? "bg-white/10 backdrop-blur-md border border-white/20"
            : "bg-white shadow-md";

        if (hover) {
            return (
                <motion.div
                    ref={ref}
                    className={cn(baseStyles, hoverStyles, glassStyles, className)}
                    whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    transition={{ duration: 0.3 }}
                    {...(props as React.ComponentProps<typeof motion.div>)}
                >
                    {children}
                </motion.div>
            );
        }

        return (
            <div
                ref={ref}
                className={cn(baseStyles, glassStyles, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
