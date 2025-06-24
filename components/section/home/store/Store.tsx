"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

import Title from "@/components/custom/Title";
import SearchTrigger from "./SearchTrigger";
import ProductCard from "@/components/cards/ProductCard";

import type { RawProduct } from "@/types";
import devLog from "@/utility/devLog";

type Props = {
  data: RawProduct[];
};

const BATCH_SIZE = 8;

const Store = ({ data }: Props) => {
  const t = useTranslations();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && visibleCount < data.length) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, data.length));
      devLog("Loading more products:", visibleCount + BATCH_SIZE);
    }
  }, [inView, visibleCount, data.length]);

  const visibleProducts = data.slice(0, visibleCount);

  return (
    <div className="container space-y-8">
      <div className="flex items-center md:grid grid-cols-2 gap-4">
        <Title href="/store" className="flex-1">
          {t("common.store")}
        </Title>
        <SearchTrigger />
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4"
        role="list"
      >
        {visibleProducts.map((item, index) => (
          <ProductCard
            key={item.id}
            item={item}
            ref={index === visibleProducts.length - 1 ? ref : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Store;
