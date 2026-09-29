import type { Metadata } from "next";
import { ProductContentSection } from "@/components/product-content-section";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";
import { parseProductFilters } from "@/lib/product-listing";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/product">): Promise<Metadata> {
  const { lang } = await params;
  const dict = dictionaryFor(lang);

  return {
    title: dict.product.metadataTitle,
    description: dict.product.metadataDescription,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps<"/[lang]/product">) {
  const locale = toLocale((await params).lang);
  const dict = dictionaryFor(locale);
  const filters = parseProductFilters(await searchParams);

  return (
    <main className="flex-1">
      <ProductContentSection locale={locale} dict={dict} filters={filters} />
    </main>
  );
}
