import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ContactHeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
        {dict.contact.heroTitle}
      </h1>
      <p className="text-base leading-[1.6] text-neutral-600">
        {dict.contact.heroDescription}
      </p>
    </section>
  );
}
