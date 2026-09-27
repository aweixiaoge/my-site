// Kept textually identical to lib/queries.ts in the Sanity Studio repo; the
// studio owns this query. Not wrapped in defineQuery so Jest does not have to
// transform the ESM-only next-sanity package.
export const NAVIGATION_QUERY = `*[_type == "navigation" && language == $language][0]{
  items[]{
    label,
    href
  }
}`;
