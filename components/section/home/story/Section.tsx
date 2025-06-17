import { getStories } from "@/app/apiCalls";
import { getLocale } from "next-intl/server";
import Stories from "./Stories";

export default async function StoriesSection() {
  const locale = await getLocale();
  const { data } = await getStories(locale);

  if (!data) return null;

  return (
    <section className="py-20 bg-blue-100">
      <Stories data={data} />
    </section>
  );
}
