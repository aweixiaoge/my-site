export type Locale = "en" | "es" | "de" | "ja";

export type Language = {
  label: string;
  value: Locale;
};

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Labels are endonyms: a language picker names each language in that language,
 * so the list reads the same no matter which locale is currently active.
 */
export const LOCALES: Language[] = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Deutsch", value: "de" },
  { label: "日本語", value: "ja" },
];

export const LOCALE_VALUES: Locale[] = LOCALES.map((locale) => locale.value);

/** BCP-47 tags for Intl formatting, which wants a region as well as a language. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
  ja: "ja-JP",
};

export function hasLocale(value: string): value is Locale {
  return (LOCALE_VALUES as string[]).includes(value);
}

/**
 * Narrows an unvalidated route param to a supported locale. The layout 404s on
 * anything unsupported, so this is a typing aid with a safe fallback.
 */
export function toLocale(value: string): Locale {
  return hasLocale(value) ? value : DEFAULT_LOCALE;
}
