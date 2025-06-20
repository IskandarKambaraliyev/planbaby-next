import { notFound } from "next/navigation";

import { getBlogDetail } from "@/app/apiCalls";

import Article from "@/components/section/blog/Article";
import VideoArticle from "@/components/section/blog/VideoArticle";

import htmlToPlainText from "@/utility/htmlToPlainText";

import type { Blog } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string; locale: string }>;
}): Promise<Metadata> {
  const { blogId, locale } = await params;

  const { data, error } = await getBlogDetail(locale, blogId);

  if (error || !data) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: data.title,
    description: htmlToPlainText(data.short_content),
    openGraph: {
      title: data.title,
      description: htmlToPlainText(data.short_content),
      images: [
        {
          url: data.image_large,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ blogId: string; locale: string }>;
}) {
  const { blogId, locale } = await params;

  const { data, error } = await getBlogDetail(locale, blogId);

  if (error || !data) {
    notFound();
  }

  const isVideoArticle = data.youtube_link && data.youtube_link !== "";

  return isVideoArticle ? (
    <VideoArticle data={data} />
  ) : (
    <Article data={data} />
  );
}

const LOCALES = ["uz", "ru"];

export async function generateStaticParams() {
  const staticParams: { blogId: string; locale: string }[] = [];

  for (const locale of LOCALES) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/articles/all/?limit=10`;
    try {
      const res = await fetch(url);

      if (!res.ok) {
        console.warn(`Failed fetch: ${url}`);
        continue;
      }

      const articles = (await res.json()).results as Blog[];

      for (const article of articles) {
        staticParams.push({
          blogId: article.id.toString(),
          locale,
        });
      }
    } catch (error) {
      console.error(`Error fetching articles for ${url}:`, error);
    }
  }

  return staticParams;
}
