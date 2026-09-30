import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/primary-button";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";
import { getHero } from "@/sanity/hero";

export async function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const hero = (await getHero(locale)) ?? {
    title: dict.home.heroTitle,
    description: dict.home.heroDescription,
    path: "/product",
    imageUrl: null,
  };
  const href = localizedHref(locale, hero.path);

  return (
    <section className="bg-white px-5 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:px-10 lg:px-20 lg:py-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
        <div className="flex flex-1 flex-col items-start justify-center gap-8 lg:px-[30px] lg:py-[50px]">
          <div className="flex flex-col gap-4 self-stretch">
            <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
              {hero.title}
            </h1>
            {hero.description ? (
              <p className="wrap-anywhere text-base leading-[1.6] text-neutral-600">
                {hero.description}
              </p>
            ) : null}
          </div>
          <PrimaryButton href={href}>{dict.home.heroCta}</PrimaryButton>
        </div>
        <div className="relative aspect-[615/384] flex-1 overflow-hidden rounded-xl border border-neutral-200 lg:aspect-auto lg:h-[384px]">
          {hero.imageUrl ? (
            <Link href={href} className="relative block h-full w-full">
              <Image
                src={hero.imageUrl}
                alt={hero.title}
                fill
                unoptimized
                loading="eager"
                className="object-cover"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
