import { client } from "@/sanity/client";
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

export async function getProducts(): Promise<Product[]> {
  try {
    return await client.fetch<Product[]>(
      PRODUCTS_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    return await client.fetch<ProductCategory[]>(
      PRODUCT_CATEGORIES_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}

export async function getProductByPath(
  path: string,
): Promise<ProductDetail | null> {
  try {
    const product = await client.fetch<ProductDetailDocument | null>(
      PRODUCT_BY_PATH_QUERY,
      { path },
      { next: { revalidate: 30 } },
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
  } catch {
    return null;
  }
}

export async function getRelatedProducts({
  categoryId,
  excludeId,
}: {
  categoryId: string;
  excludeId: string;
}): Promise<Product[]> {
  try {
    return await client.fetch<Product[]>(
      RELATED_PRODUCTS_QUERY,
      { categoryId, excludeId },
      { next: { revalidate: 30 } },
    );
  } catch {
    return [];
  }
}
