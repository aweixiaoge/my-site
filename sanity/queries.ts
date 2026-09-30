// Kept textually identical to lib/queries.ts in the Sanity Studio repo; the
// studio owns these queries. Not wrapped in defineQuery so Jest does not have
// to transform the ESM-only next-sanity package.

/**
 * Matches documents in the requested language. A document with no `language`
 * at all is English content authored before the field existed, so it only
 * matches when English is what was asked for — without this, every existing
 * document would stop matching and the site would render empty.
 */
const IN_LANGUAGE = `(language == $language || (!defined(language) && $language == "en"))`;

export const NAVIGATION_QUERY = `*[_type == "navigation" && ${IN_LANGUAGE}][0]{
  items[]{
    label,
    href
  }
}`;

export const HERO_QUERY = `*[_type == "hero" && ${IN_LANGUAGE}][0]{
  title,
  description,
  path,
  "imageUrl": imageUrl.asset->url
}`;

export const HOT_PRODUCTS_QUERY = `*[_type == "productList" && ${IN_LANGUAGE}][0...6]{
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url
}`;

export const CONTENT_MEDIA_QUERY = `*[_type == "contentMedia" && ${IN_LANGUAGE}][0]{
  title,
  description,
  "videoUrl": video.asset->url
}`;

export const PRODUCTS_QUERY = `*[_type == "productList" && ${IN_LANGUAGE}] | order(title asc){
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url,
  "categoryId": category._ref
}`;

export const PRODUCT_CATEGORIES_QUERY = `*[_type == "category" && ${IN_LANGUAGE}] | order(title asc){
  _id,
  title
}`;

export const PRODUCT_BY_PATH_QUERY = `*[_type == "productList" && ${IN_LANGUAGE} && path == $path][0]{
  _id,
  title,
  description,
  path,
  "images": imageList[].asset->url,
  "category": category->{_id, title}
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "productList" && ${IN_LANGUAGE} && category._ref == $categoryId && _id != $excludeId] | order(title asc)[0...3]{
  _id,
  title,
  path,
  "imageUrl": imageList[0].asset->url
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogList" && ${IN_LANGUAGE}] | order(createdTime desc){
  _id,
  title,
  description,
  author,
  createdTime,
  "label": label->title,
  "imageUrl": imageList[0].asset->url
}`;

// Deliberately not language-filtered: the _id comes from a post list that has
// already been resolved to a language, and a translated page may legitimately
// be serving an English fallback document here.
export const BLOG_POST_BY_ID_QUERY = `*[_type == "blogList" && _id == $id][0]{
  _id,
  title,
  description,
  author,
  createdTime,
  "label": label->title,
  "images": imageList[].asset->url,
  body
}`;

export const ABOUT_US_QUERY = `*[_type == "aboutUs" && ${IN_LANGUAGE}][0]{
  storyDescription,
  "images": imageList[].asset->url
}`;

export const CONTACT_INFO_QUERY = `*[_type == "contactInfo" && ${IN_LANGUAGE}][0]{
  email,
  phone,
  whatsapp,
  address,
  youtube,
  facebook,
  instagram
}`;
