"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "@/components/dropdown";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { localeFromPath, localizedHref } from "@/lib/i18n/localized-href";

export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeFromPath(pathname);

  return (
    <Dropdown
      label={label}
      options={LOCALES}
      value={current}
      onChange={(value) => {
        // Read the query string at click time rather than via useSearchParams,
        // which would need a Suspense boundary on every statically rendered page.
        const search = typeof window === "undefined" ? "" : window.location.search;

        router.replace(localizedHref(value as Locale, `${pathname}${search}`));
      }}
    />
  );
}
