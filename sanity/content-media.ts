import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import { CONTENT_MEDIA_QUERY } from "@/sanity/queries";
import type { ContentMedia } from "@/sanity/types";

export async function getContentMedia(locale: Locale): Promise<ContentMedia> {
  return fetchInLocale<ContentMedia>(CONTENT_MEDIA_QUERY, locale);
}
