import { getProducts } from "@/app/apiCalls";
import { getLocale } from "next-intl/server";
import Store from "./Store";

export default async function StoreSection() {
  const locale = await getLocale();
  const { data } = await getProducts(locale, 8);

  if (!data || data.results.length === 0) return null;

  return <Store data={data.results} />;
}
