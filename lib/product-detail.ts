/**
 * Builds the locale-less path used to match a product document's `path` field
 * in Sanity. This is a lookup key, not a link — links go through
 * `localizedHref`.
 */
export function productDetailPath(segments: string[]): string {
  return `/product/${segments.join("/")}`;
}
