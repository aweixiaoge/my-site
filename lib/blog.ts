import type { BlogPost } from "@/sanity/types";

export const BLOG_PAGE_SIZE = 6;

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

export function formatPostDate(createdTime?: string | null): string {
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

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatPostMeta({
  author,
  createdTime,
}: Pick<BlogPost, "author" | "createdTime">): string {
  return [author, formatPostDate(createdTime)].filter(Boolean).join(" · ");
}

export function blogListingHref(page: number): string {
  return page > 1 ? `/blog?page=${page}` : "/blog";
}

export function blogDetailHref(slug: string): string {
  return `/blog/${slug}`;
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
