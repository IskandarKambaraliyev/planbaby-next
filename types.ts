import { z } from "zod";
import { RegionKeySchema } from "./schemas";

export type PropsWithClassName = {
  className?: string;
};

export type RegionKey = z.infer<typeof RegionKeySchema>;

export type Region = {
  key: RegionKey;
  label: string;
};

export type HappyFamiliesApi = {
  results: {
    id: number;
    results_count: number;
  }[];
};

export type RawProduct = {
  id: number;
  languages: string[];
  name: string;
  short_description: string;
  description: string;
  price: string;
  discount_price?: string | null;
  bestseller: boolean;
  image: string;
};

export type CartProduct = {
  id: number;
  languages: string[];
  title: string;
  short_description: string;
  description: string;
  old_price: string | null;
  current_price: string;
  bestseller: boolean;
  image: string;
  count: number;
  total_price: string;
};

export type SlidersApi = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    languages: string[];
    image_large: string;
    image_medium: string;
    link: string;
    is_active: boolean;
  }[];
};

export type StoriesApi = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    name: string;
    region: string;
    video: string;
    thumbnail: string;
  }[];
};

export type ToolChild = {
  id: number;
  languages: string[];
  name: string;
  icon: string;
  link: string;
  is_active: boolean;
};

export type ToolsApi = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ToolChild[];
};
