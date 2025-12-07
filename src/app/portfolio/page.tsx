import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Portfolio as PortfolioSection } from "@/components/sections/Portfolio";
import { CTA } from "@/components/sections/CTA";

import data from "../../../public/data.json";
import { CompanyData } from "@/types";

const typedData = data as CompanyData;

export const metadata: Metadata = {
    title: `Our Work | ${typedData.company.name}`,
    description: "Browse our portfolio of lawn care and landscaping projects. See the transformations we've achieved for satisfied customers.",
};

export default function PortfolioPage() {
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
                                <li className="text-white">Portfolio</li>
                            </ol>
                        </nav>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Our Portfolio
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            See the stunning transformations we&apos;ve achieved for our clients. Every project
                            showcases our commitment to quality and attention to detail.
                        </p>
                    </div>
                </section>

                <PortfolioSection items={typedData.portfolio} />

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
