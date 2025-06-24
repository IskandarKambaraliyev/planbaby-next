import { notFound } from "next/navigation";

import {
  Cart,
  ProductDetail,
  ProductInfo,
} from "@/components/section/products/Detail";

import { getProductDetail } from "@/app/apiCalls";
import { Suspense } from "react";
import { StoreSkeleton } from "@/components/skeleton";
import { StoreSection } from "@/components/section/home";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}) {
  const { locale, productId } = await params;

  const { data, error } = await getProductDetail(locale, productId);

  if (error || !data) {
    notFound();
  }

  return (
    <>
      <article className="container flex gap-4 pt-8">
        {/* Content */}
        <div className="flex-1">
          <ProductInfo product={data} />

          {/* Add To Cart Section for Mobile and Tablet */}
          <Cart product={data} className="lg:hidden h-fit w-full my-8" />

          <ProductDetail product={data} className="mt-8" />
        </div>

        {/* Add To Cart Section for Desktop */}
        <Cart
          product={data}
          className="max-lg:hidden sticky top-30 w-[24rem] h-fit"
        />
      </article>

      <section className="py-20">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection />
        </Suspense>
      </section>
    </>
  );
}
