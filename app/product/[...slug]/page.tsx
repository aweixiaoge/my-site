import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/product-detail-content";
import { productDetailPath } from "@/lib/product-detail";
import { getProductByPath } from "@/sanity/products";

const FALLBACK_DESCRIPTION = "Browse the Meridian product catalog.";

export async function generateMetadata({
  params,
}: PageProps<"/product/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByPath(productDetailPath(slug));

  if (!product) {
    return {
      title: "Product",
      description: FALLBACK_DESCRIPTION,
    };
  }

  return {
    title: product.title,
    description: product.description || FALLBACK_DESCRIPTION,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/product/[...slug]">) {
  const { slug } = await params;
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
      <ProductDetailContent product={product} />
    </main>
  );
}
