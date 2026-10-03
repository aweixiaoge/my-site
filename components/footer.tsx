import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const columns = [
    {
      title: dict.footer.productColumn,
      links: [
        {
          label: dict.footer.earbud,
          href: localizedHref(locale, "/product?category=31ef3f8e-8e36-4ad4-8b0f-018bd1043165"),
        },
        {
          label: dict.footer.smartphone,
          href: localizedHref(locale, "/product?category=4605470e-6aad-4609-8edc-38c57900aab2"),
        },
        {
          label: dict.footer.headphone,
          href: localizedHref(locale, "/product?category=1457ab35-94f7-494e-9075-c16345246e63"),
        },
      ],
    },
    {
      title: dict.footer.companyColumn,
      links: [
        { label: dict.footer.about, href: localizedHref(locale, "/about") },
        { label: dict.footer.blog, href: localizedHref(locale, "/blog") },
        { label: dict.footer.home, href: localizedHref(locale, "/") },
        { label: dict.footer.contact, href: localizedHref(locale, "/contact") },
      ],
    },
    {
      title: dict.footer.legalColumn,
      links: [
        { label: dict.footer.privacy, href: localizedHref(locale, "/privacy") },
        { label: dict.footer.terms, href: localizedHref(locale, "/terms") },
        { label: dict.footer.cookies, href: localizedHref(locale, "/cookies") },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-100 px-5 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-[336px] lg:shrink-0">
            <Link
              href={localizedHref(locale, "/")}
              className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950"
            >
              {dict.site.name}
            </Link>
            <p className="text-sm leading-[1.5] text-neutral-600">
              {dict.footer.tagline}
            </p>
          </div>
          {columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-4 lg:flex-1"
            >
              <span className="text-xs leading-[1.4] font-medium tracking-[0.01em] text-neutral-400 uppercase">
                {column.title}
              </span>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-sm leading-[1.5] text-neutral-600 hover:text-neutral-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="h-px w-full bg-neutral-200" />
          <p className="text-xs leading-[1.4] font-medium tracking-[0.01em] text-neutral-400">
            {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
