import { indexBlogSlugs } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale, fetchSanity } from "@/sanity/localized";
import { BLOG_POST_BY_ID_QUERY, BLOG_POSTS_QUERY } from "@/sanity/queries";
import type { BlogPost, BlogPostDetail } from "@/sanity/types";

type BlogPostDocument = Omit<BlogPostDetail, "images"> & {
  images?: (string | null)[] | null;
};

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return (await fetchInLocale<BlogPost[]>(BLOG_POSTS_QUERY, locale)) ?? [];
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale,
): Promise<BlogPostDetail | null> {
  const { postsBySlug } = indexBlogSlugs(await getBlogPosts(locale));
  const match = postsBySlug.get(slug);

  if (!match) {
    return null;
  }

  // The id was resolved from an already-localised list, so this lookup needs no
  // locale of its own — and filtering it would 404 a post being served from
  // the English fallback.
  const post = await fetchSanity<BlogPostDocument>(BLOG_POST_BY_ID_QUERY, {
    id: match._id,
  });

  if (!post) {
    return null;
  }

  return {
    ...post,
    images: (post.images ?? []).filter(
      (image): image is string => Boolean(image),
    ),
  };
}
