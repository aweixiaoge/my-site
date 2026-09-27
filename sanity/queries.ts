// Kept textually identical to lib/queries.ts in the Sanity Studio repo; the
// studio owns these queries. Not wrapped in defineQuery so Jest does not have
// to transform the ESM-only next-sanity package.
export const NAVIGATION_QUERY = `*[_type == "navigation" && language == $language][0]{
  items[]{
    label,
    href
  }
}`;

export const HERO_QUERY = `*[_type == "hero"][0]{
  title,
  description,
  path,
  "imageUrl": imageUrl.asset->url
}`;
