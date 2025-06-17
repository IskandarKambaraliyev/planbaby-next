import { getLocale } from "next-intl/server";
import {
  getBlog,
  getHappyFamilies,
  getProducts,
  getSliders,
  getStories,
  getTools,
} from "../apiCalls";

import {
  Hero,
  Slider,
  Categories,
  About,
  Stories,
  Store,
  Tools,
  Uzum,
  Articles,
  VideoArticles,
} from "@/components/section/home";

export default async function HomePage() {
  const locale = await getLocale();

  const happyFamilies = await getHappyFamilies(locale);
  const sliders = await getSliders(locale);
  const stories = await getStories(locale);
  const tools = await getTools(locale);
  const products = await getProducts(locale, 8);

  const articles = await getBlog(locale, 5, undefined, false);
  const videoArticles = await getBlog(locale, 12, undefined, true);
  return (
    <>
      {/* Hero */}
      <Hero data={happyFamilies.data} />

      {/* Slider, Categories, About */}
      <section className="flex flex-col py-20 gap-20">
        {sliders.data && sliders.data.results.length > 0 && (
          <Slider data={sliders.data.results} />
        )}

        <Categories />

        <About />
      </section>

      {/* Stories */}
      {stories && stories.data && (
        <section className="py-20 bg-blue-100">
          <Stories data={stories.data} />
        </section>
      )}

      {/* Tools */}
      {tools.data && tools.data.results.length > 0 && (
        <section className="py-20">
          <Tools data={tools.data.results} />
        </section>
      )}

      {/* Blogs */}
      {articles.data && articles.data.results.length > 0 && (
        <section className="py-20 bg-blue-100">
          <Articles data={articles.data.results} />
        </section>
      )}

      {/* Video blogs */}
      {videoArticles.data && videoArticles.data.results.length > 0 && (
        <section className="py-20 bg-dark-blue-main">
          <VideoArticles data={videoArticles.data.results} />
        </section>
      )}

      {/* Store, Uzum */}
      <section className="flex flex-col py-20 gap-20">
        {products.data && products.data.results.length > 0 && (
          <Store data={products.data.results} />
        )}

        <Uzum />
      </section>
    </>
  );
}
