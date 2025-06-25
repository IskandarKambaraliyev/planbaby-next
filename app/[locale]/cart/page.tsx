import { Suspense } from "react";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import StoredSection from "@/components/section/cart/Section";
import StoreSection from "@/components/section/home/store/Section";
import { StoreSkeleton } from "@/components/skeleton";

export default async function CartPage() {
  return (
    <>
      <StoredSection />

      <section className="py-20">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection />
        </Suspense>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("cartPage.meta.title"),
    description: t("cartPage.meta.description"),
    keywords: t("cartPage.meta.keywords"),
    openGraph: {
      title: t("cartPage.meta.title"),
      description: t("cartPage.meta.description"),
    },
  };
}
