import { Suspense } from "react";
import { getLocale } from "next-intl/server";

import {
  Hero,
  SliderSection,
  StoriesSection,
  ArticlesSection,
  StoreSection,
  Categories,
  About,
  Uzum,
} from "@/components/section/home";
import { ToolsSection } from "@/components/tools/Section";
import {
  SliderSkeleton,
  StoreSkeleton,
  ToolsSkeleton,
} from "@/components/skeleton";

import { getHappyFamilies } from "../apiCalls";

export default async function HomePage() {
  const locale = await getLocale();

  const happyFamilies = await getHappyFamilies(locale);
  return (
    <>
      {/* Hero */}
      <Hero data={happyFamilies.data} />

      {/* Slider, Categories, About */}
      <section className="flex flex-col py-20 gap-20">
        <Suspense fallback={<SliderSkeleton />}>
          <SliderSection />
        </Suspense>

        <Categories />

        <About />
      </section>

      {/* Stories */}
      <Suspense>
        <StoriesSection />
      </Suspense>

      {/* Tools */}
      <Suspense fallback={<ToolsSkeleton />}>
        <ToolsSection />
      </Suspense>

      {/* Blogs */}
      <Suspense>
        <ArticlesSection />
      </Suspense>

      {/* Store, Uzum */}
      <section className="flex flex-col py-20 gap-20">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection />
        </Suspense>

        <Uzum />
      </section>
    </>
  );
}
