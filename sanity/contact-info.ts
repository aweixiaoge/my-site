import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import { CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { ContactInfo } from "@/sanity/types";

export async function getContactInfo(locale: Locale): Promise<ContactInfo> {
  return fetchInLocale<ContactInfo>(CONTACT_INFO_QUERY, locale);
}
