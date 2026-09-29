"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/dropdown";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { productListingHref } from "@/lib/product-listing";
import type { ProductCategory } from "@/sanity/types";

export function ProductSearchBar({
  locale,
  dict,
  categories,
  category,
  q,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: ProductCategory[];
  category: string;
  q: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q);

  const options = [
    { label: dict.product.allProducts, value: "" },
    ...categories.map((item) => ({ label: item.title, value: item._id })),
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <Dropdown
        label={dict.product.categoryLabel}
        options={options}
        value={category}
        onChange={(value) => {
          router.push(
            productListingHref(locale, { category: value, q, page: 1 }),
          );
        }}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(
            productListingHref(locale, { category, q: query, page: 1 }),
          );
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.product.searchPlaceholder}
          aria-label={dict.product.searchLabel}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm leading-[1.5] text-neutral-950 placeholder:text-neutral-400 sm:w-[370px]"
        />
      </form>
    </div>
  );
}
