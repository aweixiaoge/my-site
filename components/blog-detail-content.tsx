import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { PostBadge } from "@/components/post-badge";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductGallery } from "@/components/product-gallery";
import { formatPostDate } from "@/lib/blog";
import type { BlogPostDetail } from "@/sanity/types";

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-[1.6] text-neutral-600">{children}</p>
    ),
  },
};

export function BlogDetailContent({ post }: { post: BlogPostDetail }) {
  const author = post.author || null;
  const date = formatPostDate(post.createdTime);
  const hasBody = Boolean(post.body?.length);

  return (
    <section className="flex flex-col gap-12 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
      <ProductBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="flex max-w-[700px] flex-col gap-4">
        {post.label ? <PostBadge>{post.label}</PostBadge> : null}
        <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
          {post.title}
        </h1>
        {author || date ? (
          <div className="flex items-center gap-3 text-sm leading-[1.5] text-neutral-600">
            {author ? <span>{author}</span> : null}
            {author && date ? (
              <span
                aria-hidden="true"
                className="text-xs font-medium tracking-[0.01em] text-neutral-400"
              >
                ·
              </span>
            ) : null}
            {date ? <span>{date}</span> : null}
          </div>
        ) : null}
      </div>

      {post.images.length > 0 ? (
        <div className="w-full lg:max-w-[1100px]">
          <ProductGallery
            images={post.images}
            title={post.title}
            mainImageAspectClassName="aspect-[1100/644]"
          />
        </div>
      ) : null}

      {hasBody ? (
        <div className="flex flex-col gap-6">
          <PortableText value={post.body} components={bodyComponents} />
        </div>
      ) : null}
    </section>
  );
}
