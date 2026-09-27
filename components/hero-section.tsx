import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/primary-button";
import { getHero } from "@/sanity/hero";
import type { Hero } from "@/sanity/types";

const FALLBACK_HERO: NonNullable<Hero> = {
  title: "Modern infrastructure for B2B teams",
  description:
    "Meridian unifies your data, workflows, and integrations in one platform, so every team works from the same live picture of the business. No exports, no stale spreadsheets, no guessing.",
  path: "/products",
  imageUrl: null,
};

export async function HeroSection() {
  const hero = (await getHero()) ?? FALLBACK_HERO;

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
          <PrimaryButton href={hero.path}>Check out</PrimaryButton>
        </div>
        <div className="relative aspect-[615/384] flex-1 overflow-hidden rounded-xl border border-neutral-200 lg:aspect-auto lg:h-[384px]">
          {hero.imageUrl ? (
            <Link
              href={hero.path}
              className="relative block h-full w-full"
            >
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
