import type { Metadata } from "next";
import { BlogContentSection } from "@/components/blog-content-section";
import { parseBlogPage } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Notes on operations, product, and the craft of building calm software.",
  };
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const page = parseBlogPage(await searchParams);

  return (
    <main className="flex-1">
      <BlogContentSection page={page} />
    </main>
  );
}
