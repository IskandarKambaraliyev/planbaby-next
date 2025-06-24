import SearchTrigger from "./SearchTrigger";
import { Title } from "@/components/custom";
import TopArticles from "@/components/TopArticles";

import type { Blog } from "@/types";
import { getTranslations } from "next-intl/server";

type Props = {
  data: Blog[];
};
const Articles = async ({ data }: Props) => {
  const t = await getTranslations();
  return (
    <section>
      <div className="container space-y-8">
        <div className="flex items-center md:grid grid-cols-2 gap-4">
          <Title className="flex-1">{t("common.articles")}</Title>

          <SearchTrigger />
        </div>

        <TopArticles data={data} categoryBadge={true} />
      </div>
    </section>
  );
};

export default Articles;
