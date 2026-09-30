import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { getAboutUs } from "@/sanity/about-us";

export async function AboutStorySection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const aboutUs = await getAboutUs(locale);

  if (!aboutUs) {
    return null;
  }

  const image = aboutUs.images[0];

  return (
    <section className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
      {/* The padding sits on an inner element: a zero flex-basis item is floored
          at its own padding, which would skew the 673 / 615 column split. */}
      <div className="lg:flex-[673_1_0%]">
        <div className="flex flex-col gap-[30px] lg:px-[30px] lg:py-[50px]">
          <h2 className="text-2xl leading-[1.2] font-bold text-neutral-950">
            {dict.about.storyTitle}
          </h2>
          <p className="wrap-anywhere text-xs leading-[1.25] text-neutral-600">
            {aboutUs.storyDescription}
          </p>
        </div>
      </div>
      <div className="relative aspect-[615/483] overflow-hidden rounded-xl border border-neutral-200 lg:aspect-auto lg:h-[483px] lg:flex-[615_1_0%]">
        {image ? (
          <Image
            src={image}
            alt={dict.about.storyImageAlt}
            fill
            unoptimized
            loading="eager"
            className="object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}
