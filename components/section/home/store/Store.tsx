import { getTranslations } from "next-intl/server";

import SearchTrigger from "./SearchTrigger";
import ProductCard from "@/components/cards/ProductCard";
import Title from "@/components/custom/Title";

import type { RawProduct } from "@/types";

type Props = {
  data: RawProduct[];
};
const Store = async ({ data }: Props) => {
  const t = await getTranslations();
  return (
    <div className="container space-y-8">
      <div className="flex items-center md:grid grid-cols-2 gap-4">
        <Title href="/store" className="flex-1">
          {t("nav.store")}
        </Title>

        <SearchTrigger />
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4"
        role="list"
      >
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Store;
