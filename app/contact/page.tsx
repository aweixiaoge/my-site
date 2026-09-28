import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact-hero-section";
import { ContactMessageSection } from "@/components/contact-message-section";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us",
    description:
      "Questions about pricing, migrations, or partnerships — reach the Meridian team and we will get back to you within one business day.",
  };
}

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="flex flex-col gap-16 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
        <ContactHeroSection />
        <ContactMessageSection />
      </div>
    </main>
  );
}
