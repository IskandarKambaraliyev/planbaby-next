import { fetcher } from "@/lib/fetcher";
import type {
  ApiResult,
  PaginatedResponse,
  Blog,
  BlogCategoryForApi,
  HappyFamiliesApi,
  RawProduct,
  Slider,
  FeedbackApi,
  ToolChild,
} from "@/types";
import type { FetcherOptions } from "@/lib/fetcher";

// ✨ Generic Safe Fetcher
async function safeFetcher<T>(
  path: string,
  locale: string,
  options?: FetcherOptions
): Promise<ApiResult<T>> {
  try {
    const data = await fetcher<T>(path, locale, options);
    return { data, error: null };
  } catch (err) {
    console.error(`Error fetching ${path}:`, err);
    return { data: null, error: err };
  }
}

// ✨ API Calls

// Happy Families
export async function getHappyFamilies(locale: string) {
  return safeFetcher<HappyFamiliesApi>("/pages/main/", locale, {
    next: { revalidate: 600 },
  });
}

// Products
export async function getProducts(locale: string, limit = 12) {
  return safeFetcher<{ results: RawProduct[] }>(
    `/stores/products/?limit=${limit}`,
    locale
  );
}

export async function searchProducts(locale: string, query: string) {
  return safeFetcher<{ results: RawProduct[] }>(
    `/stores/products/?search=${query}`,
    locale
  );
}

// Sliders
export async function getSliders(locale: string) {
  return safeFetcher<PaginatedResponse<Slider>>("/pages/sliders/", locale);
}

// Stories
export async function getStories(locale: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/${locale}/feedback`
    );
    const data = (await res.json()) as FeedbackApi;

    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    return { error: "Failed to fetch stories" };
  }
}

// Tools
export async function getTools(locale: string) {
  return safeFetcher<PaginatedResponse<ToolChild>>(`/pages/tools/`, locale);
}

// Blog
export async function getBlog(
  locale: string,
  limit = 12,
  category?: BlogCategoryForApi,
  video?: boolean
) {
  const query = category
    ? `?category=${category}&limit=${limit}`
    : `?limit=${limit}`;
  const videoParam = video ? `&youtube=${video}` : "";

  return safeFetcher<PaginatedResponse<Blog>>(
    `/articles/all/${query}${videoParam}`,
    locale
  );
}

export async function searchBlog(
  locale: string,
  query: string,
  category: BlogCategoryForApi
) {
  return safeFetcher<PaginatedResponse<Blog>>(
    `/articles/all/?category=${category}&search=${query}`,
    locale
  );
}
