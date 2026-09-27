"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/sanity/types";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label="Toggle menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 md:hidden dark:border-white/15"
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
        aria-label="Main"
        className={`${open ? "block" : "hidden"} absolute inset-x-0 top-16 border-b border-black/10 bg-background md:static md:block md:border-0 dark:border-white/15`}
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:justify-end md:gap-6 md:py-0">
          {items.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium md:py-0 ${
                    active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`}
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
