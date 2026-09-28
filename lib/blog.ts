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

function formatPostDate(createdTime?: string | null): string {
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
