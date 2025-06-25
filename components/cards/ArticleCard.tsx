import React, { forwardRef } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { Blog, PropsWithClassName } from "@/types";
import { proxyImage } from "@/lib/proxyImage";

type Props = {
  item: Blog;
  textClassName?: string;
} & PropsWithClassName;

const ArticleCard = forwardRef<HTMLAnchorElement, Props>(
  ({ item, className, textClassName }, ref) => {
    return (
      <Link
        href={`/blog/${item.id}`}
        className={cn(
          "group relative flex flex-col rounded-3xl w-full aspect-[3/2] overflow-hidden border border-dark-blue-200",
          className
        )}
        ref={ref}
      >
        <img
          src={proxyImage(item.image_large)}
          alt={`Article image of ${item.title}`}
          width={200}
          height={300}
          className="absolute inset-0 size-full object-cover group-hover:scale-105 transition ease-in-out"
        />

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="absolute inset-x-0 bottom-0 h-[35%] md:h-[50%] backdrop-blur-sm mask-gradient-to-top pointer-events-none"
            key={index}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none bg-gradient-to-b from-transparent to-black/50" />

        <h3
          className={cn(
            "absolute bottom-4 inset-x-4 line-clamp-1 font-semibold text-white",
            textClassName
          )}
        >
          {item.title}
        </h3>
      </Link>
    );
  }
);

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
