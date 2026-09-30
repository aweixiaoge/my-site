import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { client } from "@/sanity/client";

const REVALIDATE_SECONDS = 30;

/** Sanity answers a missing document with null and a missing list with []. */
function hasContent(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  return !Array.isArray(value) || value.length > 0;
}

/** Runs a query, turning a failed request into "no content" rather than a throw. */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await client.fetch<T | null>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
    return null;
  }
}

/**
 * Runs a query for one locale and falls back to English when that locale has
 * nothing. Content is one document per language in Sanity, so a locale
 * returning nothing means it has not been translated yet — not that the
 * content is gone. The fallback is per collection, so a half-translated list
 * serves English rather than a mix of languages.
 */
export async function fetchInLocale<T>(
  query: string,
  locale: Locale,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  const requested = await fetchSanity<T>(query, { ...params, language: locale });

  if (hasContent(requested)) {
    return requested;
  }

  if (locale === DEFAULT_LOCALE) {
    return null;
  }

  return fetchSanity<T>(query, { ...params, language: DEFAULT_LOCALE });
}
