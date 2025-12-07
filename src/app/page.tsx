import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Portfolio } from "@/components/sections/Portfolio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

// Import data
import data from "../../public/data.json";
import { CompanyData } from "@/types";

const typedData = data as CompanyData;

export default function Home() {
  return (
    <>
      <Header
        companyName={typedData.company.name}
        phone={typedData.company.contact.phone}
        phoneRaw={typedData.company.contact.phoneRaw}
      />

      <main id="main-content">
        <Hero
          data={typedData.hero}
          phone={typedData.company.contact.phone}
          phoneRaw={typedData.company.contact.phoneRaw}
        />

        <Services services={typedData.services} />

        <About data={typedData.about} />

        <Process data={typedData.process} />

        <Portfolio items={typedData.portfolio} />

        <Testimonials testimonials={typedData.testimonials} />

        <CTA
          data={typedData.cta}
          features={typedData.features}
          phone={typedData.company.contact.phone}
          phoneRaw={typedData.company.contact.phoneRaw}
        />

        <FAQ items={typedData.faq} />

        <Contact
          company={typedData.company}
          services={typedData.services}
        />
      </main>

      <Footer company={typedData.company} />
    </>
  );
}
