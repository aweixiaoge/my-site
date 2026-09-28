import Link from "next/link";

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2 self-center">
      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm leading-[1.5] ${
            page === currentPage
              ? "bg-accent text-white"
              : "text-neutral-600 hover:text-neutral-950"
          }`}
        >
          {page}
        </Link>
      ))}
      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-8 items-center gap-1 rounded-lg px-2 text-sm leading-[1.5] text-neutral-600 hover:text-neutral-950"
        >
          Next
          <ChevronRight />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="flex h-8 items-center gap-1 rounded-lg px-2 text-sm leading-[1.5] text-neutral-400"
        >
          Next
          <ChevronRight />
        </span>
      )}
    </nav>
  );
}
