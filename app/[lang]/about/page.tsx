import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about-cta-section";
import { AboutHeroSection } from "@/components/about-hero-section";
import { AboutMissionSection } from "@/components/about-mission-section";
import { AboutStorySection } from "@/components/about-story-section";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  const dict = dictionaryFor(lang);

  return {
    title: dict.about.metadataTitle,
    description: dict.about.metadataDescription,
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const locale = toLocale((await params).lang);
  const dict = dictionaryFor(locale);

  return (
    <main className="flex-1">
      <div className="flex flex-col gap-16 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
        <AboutHeroSection dict={dict} />
        <AboutStorySection dict={dict} />
        <AboutMissionSection dict={dict} />
        <AboutCtaSection locale={locale} dict={dict} />
      </div>
    </main>
  );
}
