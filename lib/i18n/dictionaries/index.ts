import { de } from "@/lib/i18n/dictionaries/de";
import { en } from "@/lib/i18n/dictionaries/en";
import { es } from "@/lib/i18n/dictionaries/es";
import { ja } from "@/lib/i18n/dictionaries/ja";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n/locales";

/** Derived from English, so every other locale must match it key for key. */
export type Dictionary = typeof en;

export const DICTIONARIES: Record<Locale, Dictionary> = { en, es, de, ja };

/**
 * Resolves a dictionary for a locale string. `params.lang` arrives as an
 * unvalidated string, so anything unsupported falls back to English rather
 * than throwing.
 */
export function dictionaryFor(locale: string): Dictionary {
  return hasLocale(locale)
    ? DICTIONARIES[locale]
    : DICTIONARIES[DEFAULT_LOCALE];
}
