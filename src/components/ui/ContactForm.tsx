"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Service } from "@/types";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    service: z.string().min(1, "Please select a service"),
    propertySize: z.string().min(1, "Please select your property size"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    services: Service[];
}

export function ContactForm({ services }: ContactFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted:", data);
        setIsSubmitting(false);
        setIsSubmitted(true);
        reset();
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputStyles = `
    w-full px-4 py-3 rounded-xl border bg-white
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent
  `;

    const labelStyles = "block text-sm font-medium text-[var(--color-charcoal)] mb-2";
    const errorStyles = "text-red-500 text-sm mt-1";

    if (isSubmitted) {
        return (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[var(--color-charcoal)] mb-4">
                    Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                    We&apos;ve received your message and will get back to you within 24
                    hours. We appreciate your interest in our services!
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl"
        >
            <h3 className="font-heading text-2xl font-bold text-[var(--color-charcoal)] mb-6">
                Request a Free Quote
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className={labelStyles}>
                        Full Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        className={cn(inputStyles, errors.name && "border-red-500")}
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className={errorStyles}>{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className={labelStyles}>
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={cn(inputStyles, errors.email && "border-red-500")}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className={errorStyles}>{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className={labelStyles}>
                        Phone Number *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="(334) 555-1234"
                        className={cn(inputStyles, errors.phone && "border-red-500")}
                        {...register("phone")}
                    />
                    {errors.phone && (
                        <p className={errorStyles}>{errors.phone.message}</p>
                    )}
                </div>

                {/* Service */}
                <div>
                    <label htmlFor="service" className={labelStyles}>
                        Service Needed *
                    </label>
                    <select
                        id="service"
                        className={cn(inputStyles, errors.service && "border-red-500")}
                        {...register("service")}
                    >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                    {errors.service && (
                        <p className={errorStyles}>{errors.service.message}</p>
                    )}
                </div>

                {/* Property Size */}
                <div className="md:col-span-2">
                    <label htmlFor="propertySize" className={labelStyles}>
                        Property Size *
                    </label>
                    <select
                        id="propertySize"
                        className={cn(inputStyles, errors.propertySize && "border-red-500")}
                        {...register("propertySize")}
                    >
                        <option value="">Select property size</option>
                        <option value="small">Small (under 1/4 acre)</option>
                        <option value="medium">Medium (1/4 - 1/2 acre)</option>
                        <option value="large">Large (1/2 - 1 acre)</option>
                        <option value="xlarge">Extra Large (over 1 acre)</option>
                    </select>
                    {errors.propertySize && (
                        <p className={errorStyles}>{errors.propertySize.message}</p>
                    )}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                    <label htmlFor="message" className={labelStyles}>
                        Tell Us About Your Project *
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="Describe your lawn care needs, any specific concerns, or questions you have..."
                        className={cn(
                            inputStyles,
                            "resize-none",
                            errors.message && "border-red-500"
                        )}
                        {...register("message")}
                    />
                    {errors.message && (
                        <p className={errorStyles}>{errors.message.message}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-6"
                isLoading={isSubmitting}
            >
                {isSubmitting ? (
                    "Sending..."
                ) : (
                    <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                    </>
                )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
                We respect your privacy. Your information will never be shared.
            </p>
        </form>
    );
}
