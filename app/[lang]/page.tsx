import type { Metadata } from "next";
import { ContentMediaSection } from "@/components/content-media-section";
import { ContentStatsSection } from "@/components/content-stats-section";
import { HeroSection } from "@/components/hero-section";
import { HotProductsSection } from "@/components/hot-products-section";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = dictionaryFor(lang);

  return {
    title: dict.home.metadataTitle,
    description: dict.home.metadataDescription,
  };
}

export default async function IndexPage({ params }: PageProps<"/[lang]">) {
  const locale = toLocale((await params).lang);
  const dict = dictionaryFor(locale);

  return (
    <main className="flex-1">
      <HeroSection locale={locale} dict={dict} />
      <HotProductsSection locale={locale} dict={dict} />
      <ContentMediaSection locale={locale} dict={dict} />
      <ContentStatsSection dict={dict} />
    </main>
  );
}
