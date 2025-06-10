"use client";

import { Input } from "@/components/custom";
import Title from "@/components/custom/Title";
import TopArticles from "@/components/TopArticles";
import { useModalStore } from "@/stores/modal";
import { Blog } from "@/types";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  data: Blog[];
};
const Articles = ({ data }: Props) => {
  const t = useTranslations();

  const openModal = useModalStore((state) => state.openModal);
  return (
    <section>
      <div className="container space-y-8">
        <div className="flex items-center md:grid grid-cols-2 gap-4">
          <Title className="flex-1">{t("articles")}</Title>

          <div className="relative max-md:w-2/3">
            <Input
              color="white"
              startIcon={<SearchIcon />}
              label={t("modal.search.blog")}
              className=""
            />

            <button
              className="absolute inset-0 rounded-full"
              onClick={() => openModal("blogs")}
            />
          </div>
        </div>

        <TopArticles data={data} categoryBadge={true} />
      </div>
    </section>
  );
};

export default Articles;
