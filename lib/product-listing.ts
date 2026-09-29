import type { Product } from "@/sanity/types";

export const PRODUCTS_PAGE_SIZE = 9;

export type ProductListingFilters = {
  category: string;
  q: string;
  page: number;
};

export function parseProductFilters(
  searchParams: Record<string, string | string[] | undefined>,
): ProductListingFilters {
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value) ?? "";

  const page = Number.parseInt(first(searchParams.page), 10);

  return {
    category: first(searchParams.category),
    q: first(searchParams.q),
    page: Number.isInteger(page) && page >= 1 ? page : 1,
  };
}

export function filterProducts(
  products: Product[],
  filters: { category: string; q: string },
): Product[] {
  const query = filters.q.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category && product.categoryId !== filters.category) {
      return false;
    }

    return !query || product.title.toLowerCase().includes(query);
  });
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): { items: T[]; page: number; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const start = (clampedPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: clampedPage,
    totalPages,
  };
}

import { localizedHref } from "@/lib/i18n/localized-href";
import type { Locale } from "@/lib/i18n/locales";

export function productListingHref(
  locale: Locale,
  filters: {
    category?: string;
    q?: string;
    page?: number;
  },
): string {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set("category", filters.category);
  }
  if (filters.q) {
    params.set("q", filters.q);
  }
  if (filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  const query = params.toString();
  return localizedHref(locale, query ? `/product?${query}` : "/product");
}
