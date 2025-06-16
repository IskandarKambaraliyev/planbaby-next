import { getBlogDetail } from "@/app/apiCalls";
import Article from "@/components/section/blog/Article";
import VideoArticle from "@/components/section/blog/VideoArticle";
import htmlToPlainText from "@/utility/htmlToPlainText";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string; locale: string }>;
}) {
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
