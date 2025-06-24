"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { AnimatePresence, motion } from "motion/react";
import {
  DownIcon,
  NutritionIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
} from "@/components/icons";

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

import { dropdownTransition, dropdownVariants } from "@/variants";

const BlogCategories = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const categories = [
    {
      key: "preparation",
      href: "/category/preparation",
      icon: PreparationIcon,
      bgColor: "bg-yellow-200",
      hoverColor: "hover:bg-yellow-200",
      label: t("categories.preparation"),
    },
    {
      key: "planning",
      href: "/category/planning",
      icon: PlanningIcon,
      bgColor: "bg-blue-200",
      hoverColor: "hover:bg-blue-200",
      label: t("categories.planning"),
    },
    {
      key: "pregnancy",
      href: "/category/pregnancy",
      icon: PregnancyIcon,
      bgColor: "bg-green-200",
      hoverColor: "hover:bg-green-200",
      label: t("categories.pregnancy"),
    },
    {
      key: "nutrition",
      href: "/category/nutrition",
      icon: NutritionIcon,
      bgColor: "bg-pink-200",
      hoverColor: "hover:bg-pink-200",
      label: t("categories.nutrition"),
    },
  ] as const;

  useClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className={cn(
          "px-4 py-2 rounded-full text-lg transition cursor-pointer flex-center gap-1.5",
          {
            "bg-blue-200 text-blue-main": isOpen,
            "bg-transparent hover:bg-blue-100 active:bg-blue-200": !isOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="blog-categories-menu"
        id="blog-categories-button"
      >
        <span>{t("header.blog")}</span>
        <DownIcon
          className={cn("size-6 transition", {
            "rotate-180": isOpen,
            "rotate-0": !isOpen,
          })}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="blog-categories-menu"
            role="menu"
            aria-labelledby="blog-categories-button"
            transition={dropdownTransition}
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute z-1 top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2 flex flex-col bg-white shadow-400 p-2 rounded-[1.75rem] border border-dark-blue-100"
          >
            {categories.map((category) => {
              return (
                <Link
                  key={category.key}
                  href={category.href}
                  className={cn(
                    "flex items-center gap-2 p-2 pr-4 rounded-full transition",
                    category.hoverColor
                  )}
                  role="menuitem"
                  tabIndex={-1}
                >
                  <div
                    className={cn(
                      "shrink-0 size-8 rounded-full flex-center",
                      category.bgColor
                    )}
                  >
                    <category.icon className="size-4.5" aria-hidden="true" />
                  </div>

                  <span className="w-max text-lg">{category.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCategories;
