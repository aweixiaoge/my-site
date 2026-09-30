import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact-hero-section";
import { ContactMessageSection } from "@/components/contact-message-section";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  const dict = dictionaryFor(lang);

  return {
    title: dict.contact.metadataTitle,
    description: dict.contact.metadataDescription,
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const locale = toLocale((await params).lang);
  const dict = dictionaryFor(locale);

  return (
    <main className="flex-1">
      <div className="flex flex-col gap-16 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
        <ContactHeroSection dict={dict} />
        <ContactMessageSection locale={locale} dict={dict} />
      </div>
    </main>
  );
}
