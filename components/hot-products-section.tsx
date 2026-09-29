import { ProductCard } from "@/components/product-card";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/localized-href";
import { getHotProducts } from "@/sanity/hot-products";

export async function HotProductsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const products = await getHotProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            {dict.home.hotProductsTitle}
          </h2>
          <p className="text-base leading-[1.6] text-neutral-600">
            {dict.home.hotProductsDescription}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
              path={localizedHref(locale, product.path)}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
