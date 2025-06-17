import { getLocale } from "next-intl/server";

import { getSliders } from "@/app/apiCalls";
import Slider from "../Slider";

export default async function SliderSection() {
  const locale = await getLocale();
  const { data } = await getSliders(locale);

  if (!data || data.results.length === 0) return null;

  return <Slider data={data.results} />;
}
