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

export const HOT_PRODUCTS_QUERY = `*[_type == "productList"][0...6]{
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url
}`;

export const CONTENT_MEDIA_QUERY = `*[_type == "contentMedia"][0]{
  title,
  description,
  "videoUrl": video.asset->url
}`;

export const PRODUCTS_QUERY = `*[_type == "productList"] | order(title asc){
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url,
  "categoryId": category._ref
}`;

export const PRODUCT_CATEGORIES_QUERY = `*[_type == "category"] | order(title asc){
  _id,
  title
}`;

export const PRODUCT_BY_PATH_QUERY = `*[_type == "productList" && path == $path][0]{
  _id,
  title,
  description,
  path,
  "images": imageList[].asset->url,
  "category": category->{_id, title}
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "productList" && category._ref == $categoryId && _id != $excludeId] | order(title asc)[0...3]{
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url
}`;
