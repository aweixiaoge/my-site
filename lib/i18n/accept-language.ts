import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n/locales";

type Entry = {
  tag: string;
  quality: number;
  order: number;
};

/** RFC 9110 q-values, clamped to [0, 1]; anything malformed counts as 1. */
function parseQuality(params: string[]): number {
  const raw = params
    .map((param) => param.trim())
    .find((param) => param.toLowerCase().startsWith("q="));

  if (!raw) {
    return 1;
  }

  const value = Number.parseFloat(raw.slice(2));

  return Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : 1;
}

function parseEntries(header: string): Entry[] {
  return header
    .split(",")
    .map((part, order) => {
      const [tag = "", ...params] = part.split(";");

      return {
        tag: tag.trim().toLowerCase(),
        quality: parseQuality(params),
        order,
      };
    })
    .filter(
      (entry) => entry.tag !== "" && entry.tag !== "*" && entry.quality > 0,
    )
    .sort((a, b) => b.quality - a.quality || a.order - b.order);
}

/**
 * Picks the best supported locale for an Accept-Language header. Only the
 * primary subtag is matched ("es-MX" and "es-419" both resolve to "es"), which
 * is all our locale set needs — revisit if regional variants are ever added.
 */
export function preferredLocaleFromHeader(header: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  for (const entry of parseEntries(header)) {
    const primary = entry.tag.split("-")[0];

    if (hasLocale(primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}
