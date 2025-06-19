import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/uz/cart", "/ru/cart"],
    },
    sitemap: [
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/uz/blog/sitemap/uz.xml`,
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/ru/blog/sitemap/ru.xml`,
    ],
  };
}
