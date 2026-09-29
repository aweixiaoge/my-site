import Image from "next/image";
import Link from "next/link";
import { PostBadge } from "@/components/post-badge";
import { formatPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/locales";
import type { BlogPost } from "@/sanity/types";

export function BlogPostCard({
  post,
  href,
  locale,
}: {
  post: BlogPost;
  href: string;
  locale: Locale;
}) {
  const meta = formatPostMeta(locale, post);

  return (
    <Link
      href={href}
      className="block rounded-xl border border-neutral-200 bg-white p-6"
    >
      <article className="flex flex-col gap-4">
        <div className="relative h-[214px] w-full shrink-0 overflow-hidden rounded-xl border border-neutral-200">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : null}
        </div>
        {post.label ? <PostBadge>{post.label}</PostBadge> : null}
        <h3 className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950">
          {post.title}
        </h3>
        {post.description ? (
          <p className="line-clamp-2 text-sm leading-[1.5] text-neutral-600">
            {post.description}
          </p>
        ) : null}
        {meta ? (
          <p className="text-sm leading-[1.5] text-neutral-600">{meta}</p>
        ) : null}
      </article>
    </Link>
  );
}
