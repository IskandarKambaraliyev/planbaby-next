import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";

import {
  Category,
  DateLabel,
  Products,
  ShareBlog,
  SimilarArticles,
  Tags,
  Title,
  Toolbar,
} from "./Detail";

import { cn } from "@/lib/utils";
import getYoutubeVideoId from "@/utility/getYoutubeVideoId";
import type { BlogWithSimilarArticles, PropsWithClassName } from "@/types";

type Props = {
  data: BlogWithSimilarArticles;
} & PropsWithClassName;
const VideoArticle = ({ data, className }: Props) => {
  const videoId = getYoutubeVideoId(data.youtube_link as string);
  return (
    <article className={cn("relative py-8", className)}>
      <div className="absolute -z-1 top-0 left-0 w-full h-[14.375rem] sm:h-[18.75rem] md:h-[25rem] lg:h-[31.25rem]">
        <Image
          src={data.image_large}
          alt={`Banner image for ${data.title}`}
          fill
          className="w-full  object-cover select-none"
          priority
        />
        <div className="absolute inset-0 bg-dark-blue-400 backdrop-blur-sm" />
      </div>
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Category category={data.category} />
          <DateLabel date={data.publish} isWhite />

          <ShareBlog
            blogId={data.id}
            title={data.title}
            isDesktop={false}
            className="text-white"
          />
        </div>

        <Title className="text-white text-center mt-4">{data.title}</Title>

        {videoId && (
          <YouTubeEmbed
            videoid={videoId}
            style="border-radius: 1.5rem; width: 100%; aspect-ratio: 16/9; margin: 2rem auto 0; max-width: 100%;"
          />
        )}

        <div
          className="detail-content mt-6 md:mt-8"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />

        <Toolbar
          category={data.category}
          publish={data.publish}
          id={data.id}
          title={data.title}
          className="mt-6 lg:mt-8"
        />

        <Tags tags={data.tags} className="mt-6 lg:mt-8" />

        {data.products.length > 0 && (
          <Products products={data.products} className="mt-6 lg:mt-8" />
        )}

        {data.similar_articles.length > 0 && (
          <SimilarArticles
            blogs={data.similar_articles}
            className="mt-6 lg:mt-8"
          />
        )}
      </div>
    </article>
  );
};

export default VideoArticle;
