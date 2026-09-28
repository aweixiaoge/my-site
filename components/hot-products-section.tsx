import Image from "next/image";
import Link from "next/link";
import { getHotProducts } from "@/sanity/hot-products";

export async function HotProductsSection() {
  const products = await getHotProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            Most popular products
          </h2>
          <p className="text-base leading-[1.6] text-neutral-600">
            Everything you need to run your operations, without switching tools.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product._id}
              href={product.path}
              className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6"
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-neutral-200">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : null}
              </div>
              <h3 className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950">
                {product.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
