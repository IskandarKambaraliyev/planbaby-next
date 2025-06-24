import { notFound } from "next/navigation";

import {
  Cart,
  ProductDetail,
  ProductInfo,
} from "@/components/section/products/Detail";

import { getProductDetail, getProducts } from "@/app/apiCalls";
import { Suspense } from "react";
import { StoreSkeleton } from "@/components/skeleton";
import { StoreSection } from "@/components/section/home";
import htmlToPlainText from "@/utility/htmlToPlainText";
import { routing } from "@/i18n/routing";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}) {
  const { locale, productId } = await params;

  const { data, error } = await getProductDetail(locale, productId);

  if (error || !data) {
    return {};
  }

  return {
    title: data.name,
    description: htmlToPlainText(data.short_description),
    openGraph: {
      title: data.name,
      description: htmlToPlainText(data.short_description),
    },
  };
}

export async function generateStaticParams() {
  const productParams: {
    locale: string;
    productId: string;
  }[] = [];
  const locales = routing.locales;

  for (const locale of locales) {
    const { data } = await getProducts(locale);

    if (data && data?.results.length > 0) {
      for (const product of data.results) {
        productParams.push({
          locale,
          productId: product.id.toString(),
        });
      }
    }
  }

  return productParams;
}
