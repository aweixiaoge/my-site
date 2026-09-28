import { BlogPostCard } from "@/components/blog-post-card";
import { FeaturedPost } from "@/components/featured-post";
import { Pagination } from "@/components/pagination";
import {
  BLOG_PAGE_SIZE,
  blogDetailHref,
  blogListingHref,
  indexBlogSlugs,
  splitBlogPosts,
} from "@/lib/blog";
import { paginate } from "@/lib/product-listing";
import { getBlogPosts } from "@/sanity/posts";
import type { BlogPost } from "@/sanity/types";

export async function BlogContentSection({ page }: { page: number }) {
  const posts = await getBlogPosts();
  const { featured, rest } = splitBlogPosts(posts);
  const { items, page: currentPage, totalPages } = paginate(
    rest,
    page,
    BLOG_PAGE_SIZE,
  );
  const { slugsByPostId } = indexBlogSlugs(posts);
  const hrefOf = (post: BlogPost) =>
    blogDetailHref(slugsByPostId.get(post._id) as string);

  return (
    <section className="flex flex-col gap-12 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
          Blog
        </h1>
        <p className="max-w-[528px] text-center text-base leading-[1.6] text-neutral-600">
          Notes on operations, product, and the craft of building calm software.
        </p>
      </div>
      {featured.map((post) => (
        <FeaturedPost key={post._id} post={post} href={hrefOf(post)} />
      ))}
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <BlogPostCard key={post._id} post={post} href={hrefOf(post)} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={blogListingHref}
      />
    </section>
  );
}
