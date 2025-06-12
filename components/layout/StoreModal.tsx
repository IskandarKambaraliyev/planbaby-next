"use client";

import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import debounce from "lodash.debounce";
import { AnimatePresence, motion } from "motion/react";

import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { searchBlog, searchProducts } from "@/app/apiCalls";
import { useModalStore } from "@/stores/modal";
import { Blog, RawProduct } from "@/types";
import { Link } from "@/i18n/navigation";

import { Button, Input } from "../custom";
import ProductCard from "../cards/ProductCard";
import ArticleCard from "../cards/ArticleCard";
import {
  NutritionIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
  RightIcon,
  SearchIcon,
  StoreIcon,
  XIcon,
} from "../icons";

type States = {
  products: RawProduct[];
  preparation: Blog[];
  pregnancy: Blog[];
  planning: Blog[];
  nutrition: Blog[];
};

type Props = {
  initialData: States;
};

// 1️⃣ Fetch function used in useQuery
const fetchStoreSearch = async (
  locale: string,
  query: string,
  initialData: States
): Promise<States> => {
  const trimmed = query.trim();
  if (!trimmed) return initialData;

  const [products, preparation, pregnancy, planning, nutrition] =
    await Promise.all([
      searchProducts(locale, trimmed),
      searchBlog(locale, trimmed, "preparing"),
      searchBlog(locale, trimmed, "pregnancy"),
      searchBlog(locale, trimmed, "planning"),
      searchBlog(locale, trimmed, "feeding"),
    ]);

  return {
    products: products.data?.results || [],
    preparation: preparation.data?.results || [],
    pregnancy: pregnancy.data?.results || [],
    planning: planning.data?.results || [],
    nutrition: nutrition.data?.results || [],
  };
};

const StoreModal = ({ initialData }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const [inputValue, setInputValue] = useState(""); // raw input value
  const [search, setSearch] = useState(""); // debounced value

  const isOpen = useModalStore((state) => state.isOpen);
  const view = useModalStore((state) => state.view);
  const closeModal = useModalStore((state) => state.closeModal);

  // Debounce search input
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500), // 500ms debounce
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  // React Query hook
  const { data: states = initialData } = useQuery({
    queryKey: ["storeSearch", locale, search],
    queryFn: () => fetchStoreSearch(locale, search, initialData),
    staleTime: 1000 * 60 * 1, // 5 minutes cache
    enabled: isOpen, // only run when modal is open
  });

  // Focus input and lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const isPrintable =
        e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      const tag = document.activeElement?.tagName.toLowerCase();

      const input = document.getElementById("store-search-input");

      if (isPrintable && input && tag !== "input" && tag !== "textarea") {
        input.focus();
      }

      if (isOpen && e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const titles = {
    products: {
      title: t("nav.store"),
      icon: StoreIcon,
      href: "/store",
      bgColor: "bg-dark-blue-200",
    },
    preparation: {
      title: t("categories.preparation"),
      icon: PreparationIcon,
      href: "/category/preparation",
      bgColor: "bg-yellow-200",
    },
    planning: {
      title: t("categories.planning"),
      icon: PlanningIcon,
      href: "/category/planning",
      bgColor: "bg-blue-200",
    },
    pregnancy: {
      title: t("categories.pregnancy"),
      icon: PregnancyIcon,
      href: "/category/pregnancy",
      bgColor: "bg-green-200",
    },
    nutrition: {
      title: t("categories.nutrition"),
      icon: NutritionIcon,
      href: "/category/nutrition",
      bgColor: "bg-pink-200",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-dark-blue-400 backdrop-blur-sm"
            onClick={closeModal}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl"
          >
            <Button
              outlined
              color="white"
              size="sm"
              onClick={closeModal}
              className="absolute bottom-[calc(100%+1rem)] right-4"
            >
              <span>{t("modal.close")}</span>
              <XIcon className="-ml-2" />
            </Button>

            <div className="flex flex-col max-h-[80vh] h-auto">
              <div className="py-4 container">
                <Input
                  id="store-search-input"
                  label={
                    view === "products"
                      ? t("modal.search.product")
                      : view === "blogs"
                      ? t("modal.search.blog")
                      : t("modal.search.both")
                  }
                  color="blue"
                  startIcon={<SearchIcon />}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setInputValue(value);
                    debouncedSetSearch(value);
                  }}
                  defaultValue={inputValue}
                />
              </div>

              <div className="overflow-y-auto custom-scrollbar flex-1 pb-20">
                <div className="container flex flex-col gap-10">
                  {Object.entries(states).map(([section, list]) => {
                    const shouldRender =
                      list.length > 0 &&
                      (view === "both" ||
                        (view === "products" && section === "products") ||
                        (view === "blogs" && section !== "products"));

                    if (!shouldRender) return null;

                    const { title, icon, bgColor, href } =
                      titles[section as keyof typeof titles];

                    return (
                      <div key={section} className="flex flex-col gap-2">
                        <Link
                          href={href}
                          className="group w-fit flex items-center gap-2 hover:text-blue-main transition"
                        >
                          <div
                            className={cn(
                              "size-9 rounded-full flex-center shrink-0",
                              bgColor
                            )}
                          >
                            {React.createElement(icon, {
                              className: "size-3/5",
                            })}
                          </div>
                          <span className="text-lg font-bold truncate">
                            {title}
                          </span>
                          <RightIcon className="size-4 shrink-0" />
                        </Link>

                        <Swiper
                          slidesPerView="auto"
                          spaceBetween={8}
                          className="w-full"
                        >
                          {list.map((item) => (
                            <SwiperSlide
                              key={`${section}-${item.id}`}
                              className="!w-[13rem] !h-[unset] flex"
                            >
                              {section === "products" ? (
                                <ProductCard
                                  item={item as RawProduct}
                                  responsive={false}
                                  className="h-full hover:shadow-none border border-dark-blue-100 select-none"
                                />
                              ) : (
                                <ArticleCard
                                  item={item as Blog}
                                  className="h-full hover:shadow-none border border-dark-blue-100 select-none"
                                />
                              )}
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StoreModal;
