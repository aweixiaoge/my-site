import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getContentMedia } from "@/sanity/content-media";

export async function ContentMediaSection({ dict }: { dict: Dictionary }) {
  const media = await getContentMedia();

  if (!media) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            {dict.home.mediaTitle}
          </h2>
          <p className="text-base leading-[1.6] text-neutral-600">
            {dict.home.mediaDescription}
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <div className="relative aspect-[568/384] w-full overflow-hidden rounded-xl border border-neutral-200 lg:flex-1">
            {media.videoUrl ? (
              <video
                src={media.videoUrl}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-1">
            <h3 className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950">
              {media.title}
            </h3>
            {media.description ? (
              <p className="wrap-anywhere text-base leading-[1.6] text-neutral-600">
                {media.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
