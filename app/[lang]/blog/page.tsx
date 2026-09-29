import type { Metadata } from "next";
import { BlogContentSection } from "@/components/blog-content-section";
import { parseBlogPage } from "@/lib/blog";
import { dictionaryFor } from "@/lib/i18n/dictionaries";
import { toLocale } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  const dict = dictionaryFor(lang);

  return {
    title: dict.blog.metadataTitle,
    description: dict.blog.metadataDescription,
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[lang]/blog">) {
  const locale = toLocale((await params).lang);
  const dict = dictionaryFor(locale);
  const page = parseBlogPage(await searchParams);

  return (
    <main className="flex-1">
      <BlogContentSection locale={locale} dict={dict} page={page} />
    </main>
  );
}
