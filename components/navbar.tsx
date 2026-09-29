import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavMenu } from "@/components/nav-menu";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedHref } from "@/lib/i18n/localized-href";
import type { Locale } from "@/lib/i18n/locales";
import { navItems } from "@/lib/navigation";

export function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-neutral-200 bg-white">
      <div className="flex h-full items-center gap-2 px-4 md:px-20">
        <div className="flex flex-1 items-center">
          <Link
            href={localizedHref(locale, "/")}
            className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950"
          >
            {dict.site.name}
          </Link>
        </div>
        <NavMenu
          items={navItems(locale, dict)}
          toggleLabel={dict.nav.toggleMenu}
          navLabel={dict.nav.main}
        />
        <div className="flex h-full flex-1 items-center justify-end">
          <LanguageSwitcher label={dict.language.label} />
        </div>
      </div>
    </header>
  );
}
