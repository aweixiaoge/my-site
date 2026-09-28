import type { Metadata } from "next";
import { ProductContentSection } from "@/components/product-content-section";
import { parseProductFilters } from "@/lib/product-listing";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Product",
    description: "Browse the Meridian product catalog.",
  };
}

export default async function ProductPage({ searchParams }: PageProps<"/product">) {
  const filters = parseProductFilters(await searchParams);

  return (
    <main className="flex-1">
      <ProductContentSection filters={filters} />
    </main>
  );
}
