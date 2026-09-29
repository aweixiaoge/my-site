import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function ProductBreadcrumb({
  items,
  label,
}: {
  items: BreadcrumbItem[];
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 text-sm leading-[1.5] text-neutral-600">
        {items.map((item, index) => (
          <li
            key={`${index}-${item.label}`}
            className="flex items-center gap-2"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="text-xs font-medium tracking-[0.01em] text-neutral-400"
              >
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-neutral-400">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
