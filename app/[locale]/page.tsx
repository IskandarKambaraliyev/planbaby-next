import { getLocale } from "next-intl/server";
import { getHappyFamilies, getProducts, getSliders, getTools } from "../api";

import {
  HomeHero,
  Slider,
  Categories,
  About,
  Stories,
  Store,
  Tools,
  Uzum,
} from "@/components/section/home";

export async function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }];
}

export default async function HomePage() {
  const locale = await getLocale();

  const happyFamilies = await getHappyFamilies(locale);
  const sliders = await getSliders(locale);
  const tools = await getTools(locale);
  const products = await getProducts(locale, 8);
  return (
    <>
      {/* Hero */}
      <HomeHero data={happyFamilies} />

      {/* Slider, Categories, About */}
      <div className="flex flex-col py-20 gap-20">
        {sliders && sliders.results.length > 0 && (
          <Slider data={sliders.results} />
        )}

        <Categories />

        <About />
      </div>

      {/* Stories */}
      <div className="py-20 bg-blue-100">
        <Stories />
      </div>

      {/* Tools */}
      {tools && tools.results.length > 0 && (
        <div className="py-20">
          <Tools data={tools.results} />
        </div>
      )}

      {/* Blogs */}
      <div className="py-20 bg-blue-100"></div>

      {/* Video blogs */}
      <div className="py-20 bg-dark-blue-main"></div>

      {/* Store, Uzum */}
      <div className="flex flex-col py-20 gap-20">
        {products && products.results.length > 0 && (
          <Store data={products.results} />
        )}

        <Uzum />
      </div>
    </>
  );
}
