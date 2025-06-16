import { useTranslations } from "next-intl";

// 1. Define reusable union type for allowed category colors
type CategoryColor = "yellow" | "blue" | "pink" | "green" | "white" | "gray";

// 2. Define the shape of a single category
type Category = {
  label: string;
  link: string;
  color: CategoryColor;
};

// 3. Hook function with return type explicitly typed
export default function useSeparateCategories(title: string): {
  categoryTitle: string;
  categoryLabel: string;
  categoryLink: string;
  categoryColor: CategoryColor;
} {
  const t = useTranslations("categories");

  // 4. Category map with explicit types
  const categoriesMap: Record<string, Category> = {
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

  // 5. Default fallback category if no match is found
  const defaultCategory: Category = {
    label: t("preparation"),
    link: "/preparation",
    color: "yellow",
  };

  // 6. Lookup or fallback
  const category = categoriesMap[title] ?? defaultCategory;

  return {
    categoryTitle: title,
    categoryLabel: category.label,
    categoryLink: category.link,
    categoryColor: category.color,
  };
}
