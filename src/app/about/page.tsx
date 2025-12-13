import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About as AboutSection } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

import data from "../../../public/data.json";
import { CompanyData } from "@/types";

const typedData = data as CompanyData;

export const metadata: Metadata = {
    title: `About Us | ${typedData.company.name}`,
    description: typedData.about.story,
};

export default function AboutPage() {
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
                    <div className="container mx-auto px-4 text-center">
                        <nav className="mb-4">
                            <ol className="flex items-center justify-center gap-2 text-white/70 text-sm">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">About</li>
                            </ol>
                        </nav>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            About {typedData.company.name.split(",")[0]}
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Learn about our journey, values, and commitment to exceptional lawn care.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-white -mt-8 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {typedData.hero.stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-[var(--color-cream)] rounded-2xl">
                                    <p className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-500)]">
                                        {stat.number}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                                </div>
                            ))}
                            <div className="text-center p-6 bg-[var(--color-cream)] rounded-2xl">
                                <p className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-500)]">
                                    {typedData.company.founded}
                                </p>
                                <p className="text-gray-600 text-sm mt-2">Year Founded</p>
                            </div>
                        </div>
                    </div>
                </section>

                <AboutSection data={typedData.about} />

                <Process data={typedData.process} />

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
