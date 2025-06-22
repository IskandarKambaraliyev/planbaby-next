import { getLocale } from "next-intl/server";

import VideoArticles from "@/components/VideoArticles";

import { getBlog } from "@/app/apiCalls";
import mapCategory from "@/utility/mapCategory";
import { cn } from "@/lib/utils";

import type { BlogCategory, PropsWithClassName } from "@/types";

export default async function VideoBlogs({
  category,
  className,
}: {
  category: BlogCategory;
} & PropsWithClassName) {
  const locale = await getLocale();
  const { data, error } = await getBlog(
    locale,
    100,
    mapCategory(category),
    true
  );

  if (error || !data || data.results.length === 0) return null;

  return (
    <section className={cn("py-20 bg-dark-blue-main", className)}>
      <VideoArticles data={data.results} />
    </section>
  );
}
