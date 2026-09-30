import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";
import { getBlogPostBySlug } from "@/sanity/posts";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = dictionaryFor(lang);
  const post = await getBlogPostBySlug(slug, toLocale(lang));

  if (!post) {
    return {
      title: dict.blog.metadataTitle,
      description: dict.blog.metadataDescription,
    };
  }

  return {
    title: post.title,
    description: post.description || dict.blog.metadataDescription,
  };
}

export default async function BlogDetailPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1">
      <BlogDetailContent post={post} locale={locale} dict={dictionaryFor(locale)} />
    </main>
  );
}
