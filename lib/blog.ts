import { localizedHref } from "@/lib/i18n/localized-href";
import { LOCALE_TAGS, type Locale } from "@/lib/i18n/locales";
import type { BlogPost } from "@/sanity/types";

export const BLOG_PAGE_SIZE = 6;

/**
 * Deliberately English and deliberately not in the dictionary: this is compared
 * against the label document referenced by each post in Sanity, which stores
 * English titles. Translating it would silently reclassify every post as
 * non-featured.
 */
const FEATURED_LABEL = "Featured";

export function parseBlogPage(
  searchParams: Record<string, string | string[] | undefined>,
): number {
  const raw = searchParams.page;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const page = Number.parseInt(value ?? "", 10);

  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function splitBlogPosts(posts: BlogPost[]): {
  featured: BlogPost[];
  rest: BlogPost[];
} {
  const featured: BlogPost[] = [];
  const rest: BlogPost[] = [];

  for (const post of posts) {
    if (post.label?.trim().toLowerCase() === FEATURED_LABEL.toLowerCase()) {
      featured.push(post);
    } else {
      rest.push(post);
    }
  }

  return { featured, rest };
}

export function formatPostDate(
  locale: Locale,
  createdTime?: string | null,
): string {
  const match = createdTime?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatPostMeta(
  locale: Locale,
  { author, createdTime }: Pick<BlogPost, "author" | "createdTime">,
): string {
  return [author, formatPostDate(locale, createdTime)]
    .filter(Boolean)
    .join(" · ");
}

export function blogListingHref(locale: Locale, page: number): string {
  return localizedHref(locale, page > 1 ? `/blog?page=${page}` : "/blog");
}

export function blogDetailHref(locale: Locale, slug: string): string {
  return localizedHref(locale, `/blog/${slug}`);
}

const ID_TAIL_LENGTH = 8;

export function slugifyBlogTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function indexBlogSlugs(posts: BlogPost[]): {
  slugsByPostId: Map<string, string>;
  postsBySlug: Map<string, BlogPost>;
} {
  const slugsByPostId = new Map<string, string>();
  const postsBySlug = new Map<string, BlogPost>();

  // _id order keeps slug assignment stable no matter how the query ordered the posts.
  const ordered = [...posts].sort((a, b) =>
    a._id < b._id ? -1 : a._id > b._id ? 1 : 0,
  );

  for (const post of ordered) {
    const idTail = post._id.slice(0, ID_TAIL_LENGTH);
    const base = slugifyBlogTitle(post.title) || `post-${idTail}`;

    let slug = base;
    for (let attempt = 1; postsBySlug.has(slug); attempt += 1) {
      slug = `${base}-${attempt === 1 ? idTail : `${idTail}-${attempt}`}`;
    }

    slugsByPostId.set(post._id, slug);
    postsBySlug.set(slug, post);
  }

  return { slugsByPostId, postsBySlug };
}
