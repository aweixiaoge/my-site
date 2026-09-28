import type { ReactNode } from "react";

export function PostBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-6 w-fit items-center rounded-md bg-neutral-100 px-2 text-xs leading-[1.4] font-medium tracking-[0.01em] text-neutral-600">
      {children}
    </span>
  );
}
