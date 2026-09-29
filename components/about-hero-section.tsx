import type { Dictionary } from "@/lib/i18n/dictionaries";

export function AboutHeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
        {dict.about.heroTitle}
      </h1>
      <p className="text-xs leading-[1.25] text-neutral-600">
        {dict.about.heroIntro}
      </p>
      <p className="text-xs leading-[1.25] text-neutral-600">
        {dict.about.heroFacts}
      </p>
    </section>
  );
}
