import { Suspense } from "react";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import StoreSection from "@/components/section/home/store/Section";
import { StoreSkeleton } from "@/components/skeleton";

export default async function StorePage() {
  return (
    <>
      <section className="py-8">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection limit={200} />
        </Suspense>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("storePage.meta.title"),
    description: t("storePage.meta.description"),
    keywords: t("storePage.meta.keywords"),
    openGraph: {
      title: t("storePage.meta.title"),
      description: t("storePage.meta.description"),
    },
  };
}
