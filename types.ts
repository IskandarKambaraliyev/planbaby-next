import { z } from "zod";
import { RegionKeySchema } from "./schemas";

// ✨ Common Types

export type PropsWithClassName = {
  className?: string;
};

export type RegionKey = z.infer<typeof RegionKeySchema>;

export type Region = {
  key: RegionKey;
  label: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiResult<T> = {
  data: T | null;
  error: unknown | null;
};

// ✨ Domain Types

export type HappyFamiliesApi = {
  results: {
    id: number;
    results_count: number;
  }[];
};

// Product types

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

// Sliders

export type Slider = {
  id: number;
  languages: string[];
  image_large: string;
  image_medium: string;
  link: string;
  is_active: boolean;
};

// Stories

export type Story = {
  id: number;
  name: string;
  region: string;
  video: string;
  thumbnail: string;
};

// Tools

export type ToolChild = {
  id: number;
  languages: string[];
  name: string;
  icon: string;
  link: string;
  is_active: boolean;
};

// Blog

export type BlogCategory =
  | "preparation"
  | "planning"
  | "pregnancy"
  | "nutrition";

export type BlogCategoryForApi =
  | "preparing"
  | "pregnancy"
  | "planning"
  | "feeding";

export type Blog = {
  id: number;
  languages: string[];
  title: string;
  short_content: string;
  content: string;
  tags: string[];
  category: string;
  article_status: string;
  publish: string;
  number_of_views: number;
  is_pinned: boolean;
  author_choice: boolean;
  youtube_link: string | null;
  youtube_image: string | null;
  image_large: string;
  thumbnail: string;
  image_source: string | null;
  image_name: string | null;
  products: RawProduct[];
};
