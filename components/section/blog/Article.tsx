import type { BlogWithSimilarArticles, PropsWithClassName } from "@/types";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Products,
  ShareBlog,
  SimilarArticles,
  Tags,
  Title,
  Toolbar,
} from "./Detail";
import Image from "next/image";

type Props = {
  data: BlogWithSimilarArticles;
} & PropsWithClassName;
const Article = ({ data, className }: Props) => {
  return (
    <article className={cn("container flex items-start gap-4 py-8", className)}>
      <div className="flex-1">
        <Toolbar
          category={data.category}
          publish={data.publish}
          id={data.id}
          title={data.title}
        />

        <Title className="mt-4">{data.title}</Title>

        <div
          className="detail-content mt-4"
          dangerouslySetInnerHTML={{
            __html: data.short_content,
          }}
        />

        <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden select-none mt-4">
          <Image
            src={data.image_large}
            alt={`Banner image for - ${data.title}`}
            fill
            className="inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-lg" />
          <Image
            src={data.image_large}
            alt={`Blog image`}
            width={1040}
            height={693}
            className="relative w-full h-full object-contain"
          />
        </div>

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

      <ShareBlog blogId={data.id} title={data.title} isDesktop />
    </article>
  );
};

export default Article;
