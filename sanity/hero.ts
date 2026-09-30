import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import { HERO_QUERY } from "@/sanity/queries";
import type { Hero } from "@/sanity/types";

export async function getHero(locale: Locale): Promise<Hero> {
  return fetchInLocale<Hero>(HERO_QUERY, locale);
}
