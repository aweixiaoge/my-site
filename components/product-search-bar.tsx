"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/dropdown";
import { productListingHref } from "@/lib/product-listing";
import type { ProductCategory } from "@/sanity/types";

export function ProductSearchBar({
  categories,
  category,
  q,
}: {
  categories: ProductCategory[];
  category: string;
  q: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q);

  const options = [
    { label: "All Products", value: "" },
    ...categories.map((item) => ({ label: item.title, value: item._id })),
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <Dropdown
        label="Category"
        options={options}
        value={category}
        onChange={(value) => {
          router.push(productListingHref({ category: value, q, page: 1 }));
        }}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(productListingHref({ category, q: query, page: 1 }));
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm leading-[1.5] text-neutral-950 placeholder:text-neutral-400 sm:w-[370px]"
        />
      </form>
    </div>
  );
}
