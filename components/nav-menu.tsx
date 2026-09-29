"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/navigation";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavMenu({
  items,
  toggleLabel,
  navLabel,
}: {
  items: NavItem[];
  toggleLabel: string;
  navLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={toggleLabel}
        className="order-last inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>
      <nav
        id="site-nav"
        aria-label={navLabel}
        className={`${open ? "block" : "hidden"} absolute inset-x-0 top-20 border-b border-neutral-200 bg-white md:static md:block md:border-0`}
      >
        <ul className="flex w-full flex-col gap-1 px-4 py-3 md:w-auto md:flex-row md:items-center md:gap-8 md:px-0 md:py-0">
          {items.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm leading-[1.5] text-neutral-600 hover:text-neutral-950 md:py-0"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
