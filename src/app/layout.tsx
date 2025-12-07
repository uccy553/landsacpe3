import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Import data for metadata
import data from "../../public/data.json";

export const metadata: Metadata = {
  title: data.seo.homepage.title,
  description: data.seo.homepage.description,
  keywords: data.seo.homepage.keywords,
  openGraph: {
    title: data.company.name,
    description: data.company.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: data.company.name,
    description: data.company.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: data.company.name,
              description: data.company.description,
              telephone: data.company.contact.phone,
              email: data.company.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: data.company.contact.address.street,
                addressLocality: data.company.contact.address.city,
                addressRegion: data.company.contact.address.state,
                postalCode: data.company.contact.address.zip,
                addressCountry: data.company.contact.address.country,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: data.company.contact.coordinates.lat,
                longitude: data.company.contact.coordinates.lng,
              },
              openingHoursSpecification: Object.entries(data.company.hours).map(
                ([day, hours]) => ({
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
                  opens: hours === "Closed" ? undefined : hours.split(" - ")[0],
                  closes: hours === "Closed" ? undefined : hours.split(" - ")[1],
                })
              ),
              sameAs: Object.values(data.company.social).filter(Boolean),
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-lg z-[9999]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
