import { getLocale } from "next-intl/server";

import TopArticles from "@/components/TopArticles";

import { getBlog } from "@/app/apiCalls";
import mapCategory from "@/utility/mapCategory";

import type { BlogCategory } from "@/types";

type Props = {
  category: BlogCategory;
};
export default async function Pinned({ category }: Props) {
  const locale = await getLocale();
  const { data, error } = await getBlog(
    locale,
    5,
    mapCategory(category),
    undefined,
    true
  );

  if (error || !data || data.results.length === 0) return null;

  return (
    <section className="container mb-20">
      <TopArticles data={data.results} categoryBadge={false} />
    </section>
  );
}
