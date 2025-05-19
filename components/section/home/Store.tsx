"use client";

import ProductCard from "@/components/cards/ProductCard";
import { Input } from "@/components/custom";
import Title from "@/components/custom/Title";
import { SearchIcon } from "@/components/icons";
import { useModalStore } from "@/stores/modal";
import { RawProduct } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  data: RawProduct[];
};
const Store = ({ data }: Props) => {
  const t = useTranslations();

  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className="container space-y-8">
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
        <Title href="/store">{t("nav.store")}</Title>

        <div className="relative">
          <Input
            color="blue"
            startIcon={<SearchIcon />}
            label={t("modal.search.product")}
            className=""
          />

          <button
            className="absolute inset-0 rounded-full"
            onClick={() => openModal("products")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-[1024px]:grid-cols-3 lg:grid-cols-4 gap-y-4">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Store;
