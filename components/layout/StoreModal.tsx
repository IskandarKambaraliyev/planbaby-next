"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import throttle from "lodash.throttle";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { searchBlog, searchProducts } from "@/app/api";
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

const StoreModal = ({ initialData }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [states, setStates] = useState<States>(initialData);

  const isOpen = useModalStore((state) => state.isOpen);
  const view = useModalStore((state) => state.view);
  const closeModal = useModalStore((state) => state.closeModal);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintable =
        e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      const tag = document.activeElement?.tagName.toLowerCase();

      if (
        isOpen &&
        isPrintable &&
        inputRef.current &&
        tag !== "input" &&
        tag !== "textarea"
      ) {
        inputRef.current.focus();
      }

      if (isOpen && e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Throttled API search
  const throttledFetch = useMemo(
    () =>
      throttle(async (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return setStates(initialData);

        const [products, preparation, pregnancy, planning, nutrition] =
          await Promise.all([
            searchProducts(locale, trimmed),
            searchBlog(locale, trimmed, "preparing"),
            searchBlog(locale, trimmed, "pregnancy"),
            searchBlog(locale, trimmed, "planning"),
            searchBlog(locale, trimmed, "feeding"),
          ]);

        setStates({
          products: products?.results || [],
          preparation: preparation?.results || [],
          pregnancy: pregnancy?.results || [],
          planning: planning?.results || [],
          nutrition: nutrition?.results || [],
        });
      }, 1000),
    [locale, initialData]
  );

  useEffect(() => {
    throttledFetch(search);
  }, [search, throttledFetch]);

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

            <div className="flex flex-col max-h-[85vh] h-auto">
              <div className="py-4 container">
                <Input
                  ref={inputRef}
                  label={
                    view === "products"
                      ? t("modal.search.product")
                      : view === "blogs"
                      ? t("modal.search.blog")
                      : t("modal.search.both")
                  }
                  color="blue"
                  startIcon={<SearchIcon />}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  defaultValue={search}
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
                              key={item.id}
                              className="!w-[13rem] !h-[unset] flex"
                            >
                              {section === "products" ? (
                                <ProductCard
                                  item={item as RawProduct}
                                  size="sm"
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
