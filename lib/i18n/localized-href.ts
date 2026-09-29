import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n/locales";

/** Splits "/blog?page=2" into its pathname and everything after it. */
function splitSuffix(path: string): { pathname: string; suffix: string } {
  const index = path.search(/[?#]/);

  return index === -1
    ? { pathname: path, suffix: "" }
    : { pathname: path.slice(0, index), suffix: path.slice(index) };
}

/** Drops a leading locale segment so a path is never prefixed twice. */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/");

  if (segments.length > 1 && hasLocale(segments[1])) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname;
}

/**
 * Prefixes an app-relative path with a locale, replacing any locale it already
 * carries. This is the single place locale prefixes are built, so every link in
 * the site goes through it.
 */
export function localizedHref(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { pathname, suffix } = splitSuffix(normalized);
  const stripped = stripLocale(pathname);

  return stripped === "/"
    ? `/${locale}${suffix}`
    : `/${locale}${stripped}${suffix}`;
}

/** Reads the active locale out of a pathname, defaulting when it has none. */
export function localeFromPath(pathname: string): Locale {
  const { pathname: path } = splitSuffix(pathname);
  const segments = path.split("/");
  const candidate = segments.length > 1 ? segments[1] : "";

  return hasLocale(candidate) ? candidate : DEFAULT_LOCALE;
}
