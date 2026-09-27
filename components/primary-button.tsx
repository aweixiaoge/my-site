import Link from "next/link";
import type { ReactNode } from "react";

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
    >
      {children}
    </Link>
  );
}
