import { getTools } from "@/app/apiCalls";
import { getLocale } from "next-intl/server";
import Tools from "../Tools";

export async function ToolsSection() {
  const locale = await getLocale();
  const { data } = await getTools(locale);

  if (!data || data.results.length === 0) return null;

  return (
    <section className="py-20">
      <Tools data={data.results} />
    </section>
  );
}
