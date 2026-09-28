import { indexBlogSlugs } from "@/lib/blog";
import { client } from "@/sanity/client";
import { BLOG_POST_BY_ID_QUERY, BLOG_POSTS_QUERY } from "@/sanity/queries";
import type { BlogPost, BlogPostDetail } from "@/sanity/types";

type BlogPostDocument = Omit<BlogPostDetail, "images"> & {
  images?: (string | null)[] | null;
};

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

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDetail | null> {
  try {
    const { postsBySlug } = indexBlogSlugs(await getBlogPosts());
    const match = postsBySlug.get(slug);

    if (!match) {
      return null;
    }

    const post = await client.fetch<BlogPostDocument | null>(
      BLOG_POST_BY_ID_QUERY,
      { id: match._id },
      { next: { revalidate: 30 } },
    );

    if (!post) {
      return null;
    }

    return {
      ...post,
      images: (post.images ?? []).filter(
        (image): image is string => Boolean(image),
      ),
    };
  } catch {
    return null;
  }
}
