import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  title,
  path,
  imageUrl,
}: {
  title: string;
  path: string;
  imageUrl?: string | null;
}) {
  return (
    <Link
      href={path}
      className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-neutral-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : null}
      </div>
      <h3 className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950">
        {title}
      </h3>
    </Link>
  );
}
