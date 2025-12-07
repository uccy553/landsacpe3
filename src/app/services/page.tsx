import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Services as ServicesSection } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";

import data from "../../../public/data.json";
import { CompanyData } from "@/types";

const typedData = data as CompanyData;

export const metadata: Metadata = {
    title: typedData.seo.services.title,
    description: typedData.seo.services.description,
    keywords: typedData.seo.services.keywords,
};

export default function ServicesPage() {
    return (
        <>
            <Header
                companyName={typedData.company.name}
                phone={typedData.company.contact.phone}
                phoneRaw={typedData.company.contact.phoneRaw}
            />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-primary-500)] via-[var(--color-primary-600)] to-[var(--color-primary-800)]">
                    <div className="container mx-auto px-4 text-center">
                        <nav className="mb-4">
                            <ol className="flex items-center justify-center gap-2 text-white/70 text-sm">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">Services</li>
                            </ol>
                        </nav>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Our Services
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Comprehensive lawn care and landscaping solutions tailored to your property&apos;s unique needs.
                        </p>
                    </div>
                </section>

                <ServicesSection services={typedData.services} />

                <CTA
                    data={typedData.cta}
                    features={typedData.features}
                    phone={typedData.company.contact.phone}
                    phoneRaw={typedData.company.contact.phoneRaw}
                />
            </main>

            <Footer company={typedData.company} />
        </>
    );
}
