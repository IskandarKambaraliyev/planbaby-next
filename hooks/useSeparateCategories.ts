import { useTranslations } from "next-intl";

export default function useSeparateCategories(title: string) {
  const t = useTranslations("categories");

  const categoriesMap: Record<
    string,
    { label: string; link: string; color: string }
  > = {
    Oziqlantirish: {
      label: t("nutrition"),
      link: "/nutrition",
      color: "pink",
    },
    Кормление: {
      label: t("nutrition"),
      link: "/nutrition",
      color: "pink",
    },
    Rajalashtirish: {
      label: t("planning"),
      link: "/planning",
      color: "blue",
    },
    Планирование: {
      label: t("planning"),
      link: "/planning",
      color: "blue",
    },
    Homiladorlik: {
      label: t("pregnancy"),
      link: "/pregnancy",
      color: "green",
    },
    Беременность: {
      label: t("pregnancy"),
      link: "/pregnancy",
      color: "green",
    },
  };

  const defaultCategory = {
    label: t("preparation"),
    link: "/preparation",
    color: "yellow",
  };

  const category = categoriesMap[title] ?? defaultCategory;

  return {
    categoryTitle: title,
    categoryLabel: category.label,
    categoryLink: category.link,
    categoryColor: category.color,
  };
}
