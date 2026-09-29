import { PrimaryButton } from "@/components/primary-button";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";

export function AboutCtaSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.2] font-bold text-neutral-950">
          {dict.about.ctaTitle}
        </h2>
        <p className="text-xs leading-[1.25] text-neutral-600">
          {dict.about.ctaDescription}
        </p>
      </div>
      <div className="flex">
        <PrimaryButton href={localizedHref(locale, "/contact")}>
          {dict.about.ctaButton}
        </PrimaryButton>
      </div>
    </section>
  );
}
