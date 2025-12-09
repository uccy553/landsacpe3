// TypeScript interfaces for the lawn care website data

export interface ContactAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    full: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Company {
    name: string;
    tagline: string;
    description: string;
    founded: string;
    owner?: string;
    contact: {
        phone: string;
        phoneRaw: string;
        email: string;
        address: ContactAddress;
        coordinates: Coordinates;
    };
    social: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
    hours: Record<string, string>;
    serviceRadius: string;
}

export interface HeroStat {
    number: string;
    label: string;
}

export interface Hero {
    headline: string;
    subheadline: string;
    cta: {
        primary: string;
        secondary: string;
    };
    stats: HeroStat[];
}

export interface ValueItem {
    icon: string;
    title: string;
    description: string;
}

export interface About {
    title: string;
    story: string;
    mission: string;
    values: ValueItem[];
}

export interface Service {
    id: string;
    name: string;
    icon: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    pricing: string;
    frequency: string;
    image: string;
}

export interface ProcessStep {
    number: number;
    title: string;
    description: string;
    icon: string;
}

export interface Process {
    title: string;
    steps: ProcessStep[];
}

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    service: string;
    date: string;
}

export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    description: string;
    beforeImage: string;
    afterImage: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface CTASection {
    title: string;
    description: string;
    buttonText: string;
    phone?: string;
}

export interface CTA {
    main: CTASection;
    secondary: CTASection;
}

export interface SEOPage {
    title: string;
    description: string;
    keywords: string;
}

export interface SEO {
    homepage: SEOPage;
    services: SEOPage;
}

export interface Badge {
    name: string;
    icon: string;
}

export interface Features {
    guarantees: string[];
    badges: Badge[];
}

export interface CompanyData {
    company: Company;
    hero: Hero;
    about: About;
    services: Service[];
    process: Process;
    testimonials: Testimonial[];
    portfolio: PortfolioItem[];
    faq: FAQItem[];
    cta: CTA;
    seo: SEO;
    features: Features;
}
