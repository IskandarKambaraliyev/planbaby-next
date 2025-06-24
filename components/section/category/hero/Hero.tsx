import { getTranslations } from "next-intl/server";

import {
  NutritionIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
} from "@/components/icons";
import PlanningImage from "./PlanningImage";
import PreparationImage from "./PreparationImage";
import PregnancyImage from "./PregnancyImage";
import NutritionImage from "./NutritionImage";

import { cn } from "@/lib/utils";

import type { BlogCategory, PropsWithClassName } from "@/types";

type Props = {
  category: BlogCategory;
} & PropsWithClassName;
const Hero = async ({ category, className }: Props) => {
  const t = await getTranslations();

  const config = {
    planning: {
      icon: PlanningIcon,
      title: t("categories.planning"),
      description: t("categories.planningDescription"),
      key: "planning",
      image: PlanningImage,
      bgColor: "bg-blue-200",
      textColor: "text-blue-main",
    },
    preparation: {
      icon: PreparationIcon,
      title: t("categories.preparation"),
      description: t("categories.preparationDescription"),
      key: "preparation",
      image: PreparationImage,
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-main",
    },
    pregnancy: {
      icon: PregnancyIcon,
      title: t("categories.pregnancy"),
      description: t("categories.pregnancyDescription"),
      key: "pregnancy",
      image: PregnancyImage,
      bgColor: "bg-green-200",
      textColor: "text-green-main",
    },
    nutrition: {
      icon: NutritionIcon,
      title: t("categories.nutrition"),
      description: t("categories.nutritionDescription"),
      key: "nutrition",
      image: NutritionImage,
      bgColor: "bg-pink-200",
      textColor: "text-pink-main",
    },
  };

  const current = config[category];
  return (
    <section
      className={cn(
        "container rounded-3xl p-5 md:px-8 md:pt-10 lg:px-10 lg:pt-12 pb-0 flex flex-col lg:grid grid-cols-2 gap-10",
        current.bgColor,
        className
      )}
    >
      <div className="max-lg:max-w-2xl space-y-4">
        <div className="flex max-md:flex-col md:items-center gap-4">
          <h1
            className={cn(
              "font-bold text-2xl md:text-4xl max-md:order-1",
              current.textColor
            )}
          >
            {current.title}
          </h1>
          <div
            className={cn("size-16 rounded-full flex-center", current.bgColor)}
          >
            {current.icon && <current.icon className="size-3/5" />}
          </div>
        </div>
        <p>{current.description}</p>
      </div>
      <div className="flex justify-center items-end">
        <current.image className="max-w-100 w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;
