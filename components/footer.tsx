import Link from "next/link";

const SITE_NAME = "Meridian";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Earbud", href: "/product/earbud" },
      { label: "Smartphone", href: "/product/smartphone" },
      { label: "Headphone", href: "/product/headphone" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-100 px-5 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-[336px] lg:shrink-0">
            <Link
              href="/"
              className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950"
            >
              {SITE_NAME}
            </Link>
            <p className="text-sm leading-[1.5] text-neutral-600">
              The platform where modern B2B teams run their operations.
            </p>
          </div>
          {COLUMNS.map((column) => (
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
            © 2026 Meridian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
