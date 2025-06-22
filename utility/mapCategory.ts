import type { BlogCategory, BlogCategoryForApi } from "@/types";

 export default function mapCategory(category: BlogCategory): BlogCategoryForApi {
  const mapping: Record<BlogCategory, BlogCategoryForApi> = {
    pregnancy: "pregnancy",
    planning: "planning",
    preparation: "preparing", // mapping here
    nutrition: "feeding", // mapping here
  };

  return mapping[category];
}