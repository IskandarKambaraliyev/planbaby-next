import { getLocale } from "next-intl/server";

import Articles from "./Articles";
import VideoArticles from "@/components/VideoArticles";

import { getBlog } from "@/app/apiCalls";

export default async function ArticlesSection() {
  const locale = await getLocale();
  const [articles, videoArticles] = await Promise.all([
    getBlog(locale, 5, undefined, false),
    getBlog(locale, 12, undefined, true),
  ]);

  return (
    <>
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
    </>
  );
}
