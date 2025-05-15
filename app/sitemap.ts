import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_SITE_URL as string;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url,
      lastModified: new Date(),
      alternates: {
        languages: {
          uz: `${url}/uz`,
          ru: `${url}/ru`,
        },
      },
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${url}/ovulation-calculator`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uz: `${url}/uz/ovulation-calculator`,
          ru: `${url}/ru/ovulation-calculator`,
        },
      },
    },
  ];
}
