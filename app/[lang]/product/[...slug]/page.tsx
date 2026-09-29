import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/product-detail-content";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";
import { productDetailPath } from "@/lib/product-detail";
import { getProductByPath } from "@/sanity/products";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/product/[...slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = dictionaryFor(lang);
  const product = await getProductByPath(productDetailPath(slug));

  if (!product) {
    return {
      title: dict.product.metadataTitle,
      description: dict.product.metadataDescription,
    };
  }

  return {
    title: product.title,
    description: product.description || dict.product.metadataDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[lang]/product/[...slug]">) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const product = await getProductByPath(productDetailPath(slug));

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    ...(product.description ? { description: product.description } : {}),
    ...(product.images[0] ? { image: product.images[0] } : {}),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailContent
        product={product}
        locale={locale}
        dict={dictionaryFor(locale)}
      />
    </main>
  );
}
