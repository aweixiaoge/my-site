import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import { HOT_PRODUCTS_QUERY } from "@/sanity/queries";
import type { HotProduct } from "@/sanity/types";

export async function getHotProducts(locale: Locale): Promise<HotProduct[]> {
  return (await fetchInLocale<HotProduct[]>(HOT_PRODUCTS_QUERY, locale)) ?? [];
}
