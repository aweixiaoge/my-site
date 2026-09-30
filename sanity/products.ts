import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import {
  PRODUCT_BY_PATH_QUERY,
  PRODUCT_CATEGORIES_QUERY,
  PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/sanity/queries";
import type { Product, ProductCategory, ProductDetail } from "@/sanity/types";

type ProductDetailDocument = Omit<ProductDetail, "images"> & {
  images?: (string | null)[] | null;
};

export async function getProducts(locale: Locale): Promise<Product[]> {
  return (await fetchInLocale<Product[]>(PRODUCTS_QUERY, locale)) ?? [];
}

export async function getProductCategories(
  locale: Locale,
): Promise<ProductCategory[]> {
  return (
    (await fetchInLocale<ProductCategory[]>(PRODUCT_CATEGORIES_QUERY, locale)) ??
    []
  );
}

export async function getProductByPath(
  path: string,
  locale: Locale,
): Promise<ProductDetail | null> {
  const product = await fetchInLocale<ProductDetailDocument>(
    PRODUCT_BY_PATH_QUERY,
    locale,
    { path },
  );

  if (!product) {
    return null;
  }

  return {
    ...product,
    images: (product.images ?? []).filter(
      (image): image is string => Boolean(image),
    ),
  };
}

export async function getRelatedProducts(
  { categoryId, excludeId }: { categoryId: string; excludeId: string },
  locale: Locale,
): Promise<Product[]> {
  return (
    (await fetchInLocale<Product[]>(RELATED_PRODUCTS_QUERY, locale, {
      categoryId,
      excludeId,
    })) ?? []
  );
}
