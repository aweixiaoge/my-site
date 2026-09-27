import { client } from "@/sanity/client";
import { NAVIGATION_QUERY } from "@/sanity/queries";
import type { NavItem, Navigation } from "@/sanity/types";

const DEFAULT_LANGUAGE = "en";

export async function getNavigationItems(
  language: string = DEFAULT_LANGUAGE,
): Promise<NavItem[]> {
  const requested = await fetchNavigation(language);

  if (requested?.items?.length) {
    return requested.items;
  }

  if (language !== DEFAULT_LANGUAGE) {
    const fallback = await fetchNavigation(DEFAULT_LANGUAGE);

    if (fallback?.items?.length) {
      return fallback.items;
    }
  }

  return [];
}

async function fetchNavigation(language: string): Promise<Navigation | null> {
  try {
    return await client.fetch<Navigation | null>(
      NAVIGATION_QUERY,
      { language },
      { next: { revalidate: 30 } },
    );
  } catch {
    return null;
  }
}
