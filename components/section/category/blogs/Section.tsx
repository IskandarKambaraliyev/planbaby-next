import { getLocale } from "next-intl/server";

import Blogs from "./Blogs";

import { getBlog } from "@/app/apiCalls";
import mapCategory from "@/utility/mapCategory";

import type { BlogCategory, PropsWithClassName } from "@/types";

type Props = {
  isFirstSection?: boolean;
  category: BlogCategory;
} & PropsWithClassName;
export default async function BlogsSection({
  isFirstSection = false,
  category,
  className,
}: Props) {
  const locale = await getLocale();

  const { data, error } = await getBlog(
    locale,
    isFirstSection ? 12 : 1000,
    mapCategory(category),
    false,
    undefined,
    isFirstSection ? undefined : 12
  );
  if (error || !data || data.results.length === 0) return null;

  return <Blogs data={data.results} className={className} />;
}
