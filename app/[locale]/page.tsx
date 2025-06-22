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
import ToolsSkeleton from "@/components/tools/ToolsSkeleton";

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
        <Suspense fallback={<div>Loading Sliders...</div>}>
          <SliderSection />
        </Suspense>

        <Categories />

        <About />
      </section>

      {/* Stories */}
      <Suspense fallback={<div>Loading Stories...</div>}>
        <StoriesSection />
      </Suspense>

      {/* Tools */}
      <Suspense fallback={<ToolsSkeleton />}>
        <ToolsSection />
      </Suspense>

      {/* Blogs */}
      <Suspense fallback={<div>Loading Articles...</div>}>
        <ArticlesSection />
      </Suspense>

      {/* Store, Uzum */}
      <section className="flex flex-col py-20 gap-20">
        <Suspense fallback={<div>Loading Store...</div>}>
          <StoreSection />
        </Suspense>

        <Uzum />
      </section>
    </>
  );
}
