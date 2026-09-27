import Link from "next/link";
import { NavMenu } from "@/components/nav-menu";
import { getNavigationItems } from "@/sanity/navigation";

const SITE_NAME = "My Site";

export async function Navbar() {
  const items = await getNavigationItems();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/15">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        {items.length > 0 ? <NavMenu items={items} /> : null}
      </div>
    </header>
  );
}
