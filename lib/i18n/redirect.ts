import { preferredLocaleFromHeader } from "@/lib/i18n/accept-language";
import { hasLocale } from "@/lib/i18n/locales";

/**
 * Returns the localised path a bare request should be redirected to, or null
 * when the path already carries a locale and must be left alone.
 *
 * Kept pure and separate from `proxy.ts` so the routing rule can be tested
 * without constructing a NextRequest.
 */
export function localeRedirectTarget(
  pathname: string,
  acceptLanguage: string | null,
): string | null {
  const segments = pathname.split("/");

  if (segments.length > 1 && hasLocale(segments[1])) {
    return null;
  }

  const locale = preferredLocaleFromHeader(acceptLanguage);

  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}
