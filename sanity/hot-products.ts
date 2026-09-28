import { client } from "@/sanity/client";
import { HOT_PRODUCTS_QUERY } from "@/sanity/queries";
import type { HotProduct } from "@/sanity/types";

export async function getHotProducts(): Promise<HotProduct[]> {
  try {
    return await client.fetch<HotProduct[]>(
      HOT_PRODUCTS_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}
