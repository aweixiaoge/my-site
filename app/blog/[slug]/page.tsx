import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { getBlogPostBySlug } from "@/sanity/posts";

const FALLBACK_TITLE = "Blog";
const FALLBACK_DESCRIPTION =
  "Notes on operations, product, and the craft of building calm software.";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
    };
  }

  return {
    title: post.title,
    description: post.description || FALLBACK_DESCRIPTION,
  };
}

export default async function BlogDetailPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1">
      <BlogDetailContent post={post} />
    </main>
  );
}
