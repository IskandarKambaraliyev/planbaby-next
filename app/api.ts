import { fetcher } from "@/lib/fetcher";
import type {
  HappyFamiliesApi,
  RawProduct,
  SlidersApi,
  StoriesApi,
  ToolsApi,
} from "@/types";

export async function getHappyFamilies(locale: string) {
  try {
    return await fetcher<HappyFamiliesApi>("/pages/main/", locale, {
      next: { revalidate: 600 },
    });
  } catch (err) {
    console.error("Error loading happy families:", err);
    return null;
  }
}

export async function getProducts(locale: string, limit = 12) {
  try {
    return await fetcher<{ results: RawProduct[] }>(
      `/stores/products/?limit=${limit}`,
      locale
    );
  } catch (err) {
    console.error("Error loading products:", err);
    return null;
  }
}

export async function getSliders(locale: string) {
  try {
    return await fetcher<SlidersApi>("/pages/sliders/", locale);
  } catch (err) {
    console.error("Error loading sliders:", err);
    return null;
  }
}

export async function getStories(locale: string, region: string) {
  try {
    return await fetcher<StoriesApi>(
      `/pages/feedback/?region=${region}`,
      locale
    );
  } catch (err) {
    console.error("Error loading stories:", err);
    return null;
  }
}

export async function getTools(locale: string) {
  try {
    return await fetcher<ToolsApi>(`/pages/tools/`, locale);
  } catch (err) {
    console.error("Error loading tools:", err);
    return null;
  }
}
