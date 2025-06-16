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

// Tools
export async function getTools(locale: string) {
  return safeFetcher<PaginatedResponse<ToolChild>>(`/pages/tools/`, locale);
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

// Blog
export async function getBlog(
  locale: string,
  limit = 12,
  category?: BlogCategoryForApi,
  video?: boolean
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    if (category) queryParams.append("category", category);
    if (video !== undefined) queryParams.append("youtube", String(video));

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ORIGIN_URL
      }/api/${locale}/articles?${queryParams.toString()}`
    );
    const data = (await res.json()) as PaginatedResponse<Blog>;

    return { data };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { error: "Failed to fetch blog", data: null };
  }
}

// Blog search
export async function searchBlog(
  locale: string,
  query: string,
  category: BlogCategoryForApi
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("search", query);
    queryParams.append("category", category);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ORIGIN_URL
      }/api/${locale}/articles?${queryParams.toString()}`
    );
    const data = (await res.json()) as PaginatedResponse<Blog>;

    return { data };
  } catch (error) {
    console.error("Error searching blog:", error);
    return { error: "Failed to search blog", data: null };
  }
}

export async function getBlogDetail(locale: string, blogId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/articles/${blogId}`
    );
    const data = (await res.json()) as Blog;

    if (!res.ok) {
      return {
        error: "Blog not found",
        data: null,
      };
    }

    return { data };
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return { error: "Failed to fetch blog detail", data: null };
  }
}
