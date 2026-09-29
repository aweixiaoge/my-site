import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedHref } from "@/lib/i18n/localized-href";
import type { Locale } from "@/lib/i18n/locales";

export type NavItem = {
  label: string;
  href: string;
};

/** Built per request so both the label and the locale prefix are correct. */
export function navItems(locale: Locale, dict: Dictionary): NavItem[] {
  return [
    { label: dict.nav.home, href: localizedHref(locale, "/") },
    { label: dict.nav.product, href: localizedHref(locale, "/product") },
    { label: dict.nav.blog, href: localizedHref(locale, "/blog") },
    { label: dict.nav.about, href: localizedHref(locale, "/about") },
    { label: dict.nav.contact, href: localizedHref(locale, "/contact") },
  ];
}
