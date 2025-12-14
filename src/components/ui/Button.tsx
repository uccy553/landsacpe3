"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center font-semibold
      transition-all duration-300 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      rounded-lg
    `;

        const variants = {
            primary: "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
            secondary: "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
            outline: "border-2 hover:text-white",
            ghost: "",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        const getVariantStyles = (variant: string) => {
            switch (variant) {
                case "primary":
                    return { backgroundColor: "#1a3d2e", color: "#ffffff", borderColor: "transparent" };
                case "secondary":
                    return { backgroundColor: "#d4af37", color: "#0a1915", borderColor: "transparent" };
                case "outline":
                    return { backgroundColor: "transparent", color: "#1a3d2e", borderColor: "#1a3d2e" };
                case "ghost":
                    return { backgroundColor: "transparent", color: "#1a3d2e", borderColor: "transparent" };
                default:
                    return {};
            }
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                style={{ ...getVariantStyles(variant), ...props.style }}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
