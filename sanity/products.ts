import { client } from "@/sanity/client";
import { PRODUCT_CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/queries";
import type { Product, ProductCategory } from "@/sanity/types";

export async function getProducts(): Promise<Product[]> {
  try {
    return await client.fetch<Product[]>(
      PRODUCTS_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    return await client.fetch<ProductCategory[]>(
      PRODUCT_CATEGORIES_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}
