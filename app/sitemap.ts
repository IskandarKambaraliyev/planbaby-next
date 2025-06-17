import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_ORIGIN_URL as string;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["uz", "ru"];

  const paths = ["", "store", "cart", "ovulation-calculator"];
  const sitemaps: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      sitemaps.push({
        url: `${url}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "always" : "weekly",
        priority: path === "" ? 1.0 : 0.9,
      });
    }
  }

  // Blog sitemap XML as localized links
  sitemaps.push(
    ...locales.map((locale) => ({
      url: `${url}/${locale}/blog/sitemap/${locale}.xml`,
      lastModified: new Date(),
    }))
  );

  return sitemaps;
}
