import { client } from "@/sanity/client";
import { HERO_QUERY } from "@/sanity/queries";
import type { Hero } from "@/sanity/types";

export async function getHero(): Promise<Hero> {
  try {
    return await client.fetch<Hero>(
      HERO_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return null;
  }
}
