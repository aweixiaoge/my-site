import {
  ProductBreadcrumb,
  type BreadcrumbItem,
} from "@/components/product-breadcrumb";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";
import { productListingHref } from "@/lib/product-listing";
import { getRelatedProducts } from "@/sanity/products";
import type { ProductDetail } from "@/sanity/types";

export async function ProductDetailContent({
  product,
  locale,
  dict,
}: {
  product: ProductDetail;
  locale: Locale;
  dict: Dictionary;
}) {
  const related = product.category
    ? await getRelatedProducts({
        categoryId: product.category._id,
        excludeId: product._id,
      })
    : [];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: dict.common.home, href: localizedHref(locale, "/") },
    { label: dict.product.title, href: localizedHref(locale, "/product") },
    ...(product.category
      ? [
          {
            label: product.category.title,
            href: productListingHref(locale, {
              category: product.category._id,
            }),
          },
        ]
      : []),
    { label: product.title },
  ];

  return (
    <section className="flex flex-col gap-12 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
      <ProductBreadcrumb
        items={breadcrumbItems}
        label={dict.common.breadcrumb}
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="lg:flex-1">
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div className="flex flex-col justify-center gap-4 lg:flex-1">
          <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-neutral-950">
            {product.title}
          </h1>
          {product.description ? (
            <p className="text-sm leading-[1.5] text-neutral-600">
              {product.description}
            </p>
          ) : null}
        </div>
      </div>

      {product.description ? (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            {dict.product.descriptionHeading}
          </h2>
          <p className="text-base leading-[1.6] text-neutral-600">
            {product.description}
          </p>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            {dict.product.relatedHeading}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct._id}
                title={relatedProduct.title}
                path={localizedHref(locale, relatedProduct.path)}
                imageUrl={relatedProduct.imageUrl}
              />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
