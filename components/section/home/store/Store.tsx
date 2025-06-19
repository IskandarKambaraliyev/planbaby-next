"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

import Title from "@/components/custom/Title";
import SearchTrigger from "./SearchTrigger";
import ProductCard from "@/components/cards/ProductCard";

import type { RawProduct } from "@/types";
import StoreSkeleton from "@/components/StoreSkeleton";

type Props = {
  data: RawProduct[];
};

const BATCH_SIZE = 8;

const Store = ({ data }: Props) => {
  const t = useTranslations();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !isLoadingMore && visibleCount < data.length) {
      setIsLoadingMore(true);
      const nextCount = Math.min(visibleCount + BATCH_SIZE, data.length);

      setTimeout(() => {
        setVisibleCount(nextCount);
        setIsLoadingMore(false);
      }, 300);
      console.log(`Loading more products: ${nextCount} visible`);
    }
  }, [inView, isLoadingMore, visibleCount, data.length]);

  const visibleProducts = data.slice(0, visibleCount);

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
        {visibleProducts.map((item, index) => (
          <ProductCard
            key={item.id}
            item={item}
            ref={index === visibleProducts.length - 1 ? ref : undefined}
          />
        ))}
      </div>

      {isLoadingMore && <StoreSkeleton />}
    </div>
  );
};

export default Store;
