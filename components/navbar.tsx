import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavMenu } from "@/components/nav-menu";
import { LANGUAGES } from "@/lib/languages";
import { NAV_ITEMS } from "@/lib/navigation";

const SITE_NAME = "Meridian";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-neutral-200 bg-white">
      <div className="flex h-full items-center gap-2 px-4 md:px-20">
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950"
          >
            {SITE_NAME}
          </Link>
        </div>
        <NavMenu items={NAV_ITEMS} />
        <div className="flex h-full flex-1 items-center justify-end">
          <LanguageSwitcher languages={LANGUAGES} />
        </div>
      </div>
    </header>
  );
}
