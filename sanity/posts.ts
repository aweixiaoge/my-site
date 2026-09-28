import { client } from "@/sanity/client";
import { BLOG_POSTS_QUERY } from "@/sanity/queries";
import type { BlogPost } from "@/sanity/types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch<BlogPost[]>(
      BLOG_POSTS_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}
