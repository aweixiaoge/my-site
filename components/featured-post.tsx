import Image from "next/image";
import Link from "next/link";
import { PostBadge } from "@/components/post-badge";
import { formatPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/locales";
import type { BlogPost } from "@/sanity/types";

export function FeaturedPost({
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
    <Link href={href} className="block">
      <article className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-xl border border-neutral-200 lg:h-[362px] lg:flex-1">
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
        <div className="flex flex-col gap-4 lg:flex-1">
          {post.label ? <PostBadge>{post.label}</PostBadge> : null}
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            {post.title}
          </h2>
          {post.description ? (
            <p className="line-clamp-3 text-base leading-[1.6] text-neutral-600">
              {post.description}
            </p>
          ) : null}
          {meta ? (
            <p className="text-sm leading-[1.5] text-neutral-600">{meta}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
