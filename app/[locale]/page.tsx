import { getLocale } from "next-intl/server";
import { getHappyFamilies } from "../apiCalls";

import { Hero, Categories, About, Uzum } from "@/components/section/home";
import { Suspense } from "react";
import SliderSection from "@/components/section/home/slider/Section";
import StoriesSection from "@/components/section/home/story/Section";
import { ToolsSection } from "@/components/section/home/tools/Section";
import ArticlesSection from "@/components/section/home/articles/ArticleSection";
import StoreSection from "@/components/section/home/store/Section";

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
      <Suspense fallback={<div>Loading Tools...</div>}>
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
