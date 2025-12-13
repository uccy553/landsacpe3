import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

import data from "../../../../public/data.json";
import { CompanyData } from "@/types";

const typedData = data as CompanyData;

// Generate static params for all services
export function generateStaticParams() {
    return typedData.services.map((service) => ({
        slug: service.id,
    }));
}

// Generate metadata for each service page
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    return params.then((resolvedParams) => {
        const service = typedData.services.find((s) => s.id === resolvedParams.slug);
        if (!service) {
            return {
                title: "Service Not Found",
            };
        }
        return {
            title: `${service.name} | ${typedData.company.name}`,
            description: service.fullDescription,
        };
    });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const service = typedData.services.find((s) => s.id === resolvedParams.slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <Header
                companyName={typedData.company.name}
                shortName={typedData.company.shortName}
                phone={typedData.company.contact.phone}
                phoneRaw={typedData.company.contact.phoneRaw}
            />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-primary-500)] via-[var(--color-primary-600)] to-[var(--color-primary-800)]">
                    <div className="container mx-auto px-4">
                        <nav className="mb-4">
                            <ol className="flex items-center gap-2 text-white/70 text-sm">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href="/services" className="hover:text-white transition-colors">
                                        Services
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">{service.name}</li>
                            </ol>
                        </nav>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {service.name}
                        </h1>
                        <p className="text-white/80 text-lg max-w-3xl">
                            {service.shortDescription}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section-padding bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors mb-8"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Services
                                </Link>

                                <div className="prose prose-lg max-w-none">
                                    <h2 className="font-heading text-3xl font-bold text-[var(--color-charcoal)] mb-6">
                                        About This Service
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {service.fullDescription}
                                    </p>

                                    <h3 className="font-heading text-2xl font-bold text-[var(--color-charcoal)] mt-10 mb-6">
                                        What&apos;s Included
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-4 h-4 text-[var(--color-primary-500)]" />
                                                </div>
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-[var(--color-cream)] rounded-2xl p-8 sticky top-32">
                                    <h3 className="font-heading text-xl font-bold text-[var(--color-charcoal)] mb-4">
                                        Service Details
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Pricing</p>
                                            <p className="font-semibold text-[var(--color-primary-500)] text-lg">
                                                {service.pricing}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Frequency</p>
                                            <p className="font-medium text-[var(--color-charcoal)]">
                                                {service.frequency}
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="secondary" size="lg" className="w-full mb-4">
                                        Get Free Quote
                                    </Button>

                                    <a
                                        href={`tel:${typedData.company.contact.phoneRaw}`}
                                        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[var(--color-primary-500)] text-[var(--color-primary-500)] rounded-lg font-semibold hover:bg-[var(--color-primary-500)] hover:text-white transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Call {typedData.company.contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer company={typedData.company} />
        </>
    );
}
