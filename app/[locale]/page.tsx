import { getLocale } from "next-intl/server";
import {
  getBlog,
  getHappyFamilies,
  getProducts,
  getSliders,
  getTools,
} from "../apiCalls";

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
import Articles from "@/components/section/home/Articles";

export async function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }];
}

export default async function HomePage() {
  const locale = await getLocale();

  const happyFamilies = await getHappyFamilies(locale);
  const sliders = await getSliders(locale);
  const tools = await getTools(locale);
  const products = await getProducts(locale, 8);

  const articles = await getBlog(locale, 5, undefined, false);
  return (
    <>
      {/* Hero */}
      <HomeHero data={happyFamilies.data} />

      {/* Slider, Categories, About */}
      <div className="flex flex-col py-20 gap-20">
        {sliders.data && sliders.data.results.length > 0 && (
          <Slider data={sliders.data.results} />
        )}

        <Categories />

        <About />
      </div>

      {/* Stories */}
      <div className="py-20 bg-blue-100">
        <Stories />
      </div>

      {/* Tools */}
      {tools.data && tools.data.results.length > 0 && (
        <div className="py-20">
          <Tools data={tools.data.results} />
        </div>
      )}

      {/* Blogs */}
      {articles.data && articles.data.results.length > 0 && (
        <div className="py-20 bg-blue-100">
          <Articles data={articles.data.results} />
        </div>
      )}

      {/* Video blogs */}
      <div className="py-20 bg-dark-blue-main"></div>

      {/* Store, Uzum */}
      <div className="flex flex-col py-20 gap-20">
        {products.data && products.data.results.length > 0 && (
          <Store data={products.data.results} />
        )}

        <Uzum />
      </div>
    </>
  );
}
