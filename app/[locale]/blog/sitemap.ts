import type { MetadataRoute } from "next";
import type { Blog } from "@/types";

const siteUrl = process.env.NEXT_PUBLIC_ORIGIN_URL!;

export async function generateSitemaps() {
  return [
    {
      id: "uz",
    },
    {
      id: "ru",
    },
  ];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const maps: MetadataRoute.Sitemap = [];

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${id}/api/articles/all/?limit=200`;
  try {
    const res = await fetch(url);

    const articles = (await res.json()).results as Blog[];

    maps.push(
      ...articles.map((article) => ({
        url: `${siteUrl}/${id}/blog/${article.id}`,
        lastModified: new Date(article.publish),
        priority: 0.8,
        alternates: {
          languages: {
            uz: `${siteUrl}/uz/blog/${article.id}`,
            ru: `${siteUrl}/ru/blog/${article.id}`,
          },
        },
      }))
    );
  } catch (error) {
    console.error(`Error fetching articles for ${id}:`, error);
  }

  return maps;
}
