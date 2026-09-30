import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";
import { ProductSearchBar } from "@/components/product-search-bar";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";
import {
  PRODUCTS_PAGE_SIZE,
  filterProducts,
  paginate,
  productListingHref,
  type ProductListingFilters,
} from "@/lib/product-listing";
import { getProductCategories, getProducts } from "@/sanity/products";

export async function ProductContentSection({
  locale,
  dict,
  filters,
}: {
  locale: Locale;
  dict: Dictionary;
  filters: ProductListingFilters;
}) {
  const [products, categories] = await Promise.all([
    getProducts(locale),
    getProductCategories(locale),
  ]);

  const matching = filterProducts(products, filters);
  const { items, page, totalPages } = paginate(
    matching,
    filters.page,
    PRODUCTS_PAGE_SIZE,
  );

  return (
    <section className="flex flex-col gap-12 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
      <h1 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
        {dict.product.title}
      </h1>
      <ProductSearchBar
        locale={locale}
        dict={dict}
        categories={categories}
        category={filters.category}
        q={filters.q}
      />
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            path={localizedHref(locale, product.path)}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        buildHref={(target) =>
          productListingHref(locale, {
            category: filters.category,
            q: filters.q,
            page: target,
          })
        }
        nextLabel={dict.common.next}
        navLabel={dict.common.pagination}
      />
    </section>
  );
}
