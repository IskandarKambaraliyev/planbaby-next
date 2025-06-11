import { z } from "zod";

export const regions = [
  "tash",
  "and",
  "bukh",
  "jiz",
  "kashk",
  "nav",
  "nam",
  "sam",
  "surkh",
  "sir",
  "tash_reg",
  "fer",
  "khor",
  "kar",
  "other",
] as const;
export const RegionKeySchema = z.enum(regions);

export const categories = [
  "preparation",
  "planning",
  "pregnancy",
  "nutrition",
] as const;
export const CategoriesSchema = z.enum(categories);

export const apiCategories = [
  "preparing",
  "pregnancy",
  "planning",
  "feeding",
] as const;
export const ApiCategoriesSchema = z.enum(apiCategories);
