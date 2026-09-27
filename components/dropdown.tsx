"use client";

import { useEffect, useId, useRef, useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

export function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleMouseDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className="relative flex h-full items-center">
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-neutral-950"
      >
        <span className="text-sm leading-[1.5]">{selected?.label ?? value}</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-neutral-600"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <ul
          id={menuId}
          className="absolute top-full right-0 z-10 mt-1 min-w-full rounded-lg border border-neutral-200 bg-white py-1"
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                aria-current={option.value === value ? "true" : undefined}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm leading-[1.5] text-neutral-600 hover:text-neutral-950"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
