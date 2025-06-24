import { fetcher } from "@/lib/fetcher";
import type { FetcherOptions } from "@/lib/fetcher";

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
  BlogWithSimilarArticles,
  SlugApi,
} from "@/types";
import devLog from "@/utility/devLog";

// ✅ Safe fetch wrapper
async function safeFetcher<T>(
  path: string,
  locale: string,
  options?: FetcherOptions
): Promise<ApiResult<T>> {
  try {
    const data = await fetcher<T>(path, locale, options);
    return { data, error: null };
  } catch (error) {
    devLog(`❌ Error fetching ${path}:`, error);
    return { data: null, error };
  }
}

// ✅ Reusable fetch utility for internal backend APIs
async function internalFetch<T>(
  path: string,
  locale: string,
  revalidate: number = 60
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/${locale}${path}`,
      {
        cache: "force-cache",
        next: { revalidate },
      }
    );
    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (error) {
    devLog(`❌ Error fetching ${path}:`, error);
    return { data: null, error };
  }
}

// ✅ Query helper
function buildQuery(
  params: Record<string, string | number | boolean | undefined>
) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) searchParams.append(key, String(value));
  }
  return `?${searchParams.toString()}`;
}

// -------------------------------------------
// ✨ API Calls
// -------------------------------------------

// 🎉 Happy Families
export const getHappyFamilies = (locale: string) =>
  safeFetcher<HappyFamiliesApi>("/pages/main/", locale, {
    next: { revalidate: 3000 },
  });

// 🛍 Products
export const getProducts = (locale: string, limit = 12) =>
  safeFetcher<{ results: RawProduct[] }>(
    `/stores/products/?limit=${limit}`,
    locale
  );

export const searchProducts = (locale: string, query: string) =>
  safeFetcher<{ results: RawProduct[] }>(
    `/stores/products/?search=${query}`,
    locale
  );

export const getProductDetail = (locale: string, productId: string) =>
  safeFetcher<RawProduct>(`/stores/products/${productId}/`, locale, {
    next: { revalidate: 300 },
  });

// 🖼 Sliders
export const getSliders = (locale: string) =>
  safeFetcher<PaginatedResponse<Slider>>("/pages/sliders/", locale);

// 🧰 Tools
export const getTools = (locale: string) =>
  safeFetcher<PaginatedResponse<ToolChild>>("/pages/tools/", locale);

// 🧡 Stories
export const getStories = (locale: string) =>
  internalFetch<FeedbackApi>("/feedback", locale, 60);

// 📚 Blog list
export async function getBlog(
  locale: string,
  limit = 12,
  category?: BlogCategoryForApi,
  video?: boolean,
  isPineed?: boolean,
  offset?: number
): Promise<ApiResult<PaginatedResponse<Blog>>> {
  const query = buildQuery({
    limit,
    category,
    youtube: video,
    is_pinned: isPineed,
    offset,
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/articles/all/${query}`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });
    const data = (await res.json()) as PaginatedResponse<Blog>;
    return { data, error: null };
  } catch (error) {
    devLog("❌ Error fetching blog list:", error);
    return { data: null, error };
  }
}

// 🔍 Blog search
export const searchBlog = (
  locale: string,
  query: string,
  category: BlogCategoryForApi
) =>
  internalFetch<PaginatedResponse<Blog>>(
    `/articles?${buildQuery({ search: query, category })}`,
    locale
  );

// 📄 Blog detail
export async function getBlogDetail(
  locale: string,
  blogId: string
): Promise<ApiResult<BlogWithSimilarArticles>> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/articles/${blogId}`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return { data: null, error: "Blog not found" };
    }

    const data = (await res.json()) as BlogWithSimilarArticles;
    return { data, error: null };
  } catch (error) {
    devLog("❌ Error fetching blog detail:", error);
    return { data: null, error };
  }
}

// Slug pages
export const getSlugPage = async (locale: string, slug: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/pages/page/${slug}/`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return { data: null, error: "Slug not found" };
    }

    const data = (await res.json()) as SlugApi;
    return { data, error: null };
  } catch (error) {
    devLog("❌ Error fetching slug page:", error);
    return { data: null, error };
  }
};
