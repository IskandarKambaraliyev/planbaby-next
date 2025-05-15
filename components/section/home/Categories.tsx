import { Button } from "@/components/custom";
import {
  NutritionIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
} from "@/components/icons";
import { useTranslations } from "next-intl";
import React from "react";

const Categories = () => {
  const t = useTranslations("home.categories");

  const categories = [
    {
      title: t("preparation.title"),
      description: t("preparation.description"),
      icon: <PreparationIcon className="size-3/5" />,
      btn: t("preparation.btn"),
      link: "/category/preparation",
      color: "yellow",
    },
    {
      title: t("planning.title"),
      description: t("planning.description"),
      icon: <PlanningIcon className="size-3/5" />,
      btn: t("planning.btn"),
      link: "/category/planning",
      color: "blue",
    },
    {
      title: t("pregnancy.title"),
      description: t("pregnancy.description"),
      icon: <PregnancyIcon className="size-3/5" />,
      btn: t("pregnancy.btn"),
      link: "/category/pregnancy",
      color: "green",
    },
    {
      title: t("nutrition.title"),
      description: t("nutrition.description"),
      icon: <NutritionIcon className="size-3/5" />,
      btn: t("nutrition.btn"),
      link: "/category/nutrition",
      color: "pink",
    },
  ];
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-4 gap-5">
      {categories.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center text-center md:flex-row md:items-start md:text-left lg:flex-col lg:items-center lg:text-center gap-y-4 gap-x-5 bg-${item.color}-200 rounded-3xl p-5`}
        >
          <div
            className={`bg-${item.color}-200 size-[6.25rem] flex-center rounded-full shrink-0`}
          >
            {item.icon}
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-2xl leading-[1.75rem] font-bold">
                {item.title}
              </h3>
              <p className="line-clamp-2 text-dark-blue-500">
                {item.description}
              </p>
            </div>

            <Button
              href={item.link}
              color={item.color as "yellow" | "blue" | "green" | "pink"}
              className="w-full md:w-fit lg:w-full"
            >
              {item.btn}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
