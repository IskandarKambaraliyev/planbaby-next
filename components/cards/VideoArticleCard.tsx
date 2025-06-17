/* eslint-disable @next/next/no-img-element */
"use client";

import { Link } from "@/i18n/navigation";
import { Blog } from "@/types";

type Props = {
  item: Blog;
};
const VideoArticleCard = ({ item }: Props) => {
  return (
    <Link
      href={`/blog/${item.id}`}
      className="relative block group size-full rounded-2xl md:rounded-3xl overflow-hidden"
    >
      <img
        src={`/api/proxy/icon?url=${item.image_large}`}
        alt={`Blog image for - ${item.title}`}
        width={192}
        height={342}
        className="size-full object-cover  group-hover:scale-105 transition duration-300 ease-in-out"
        loading="lazy"
      />

      <div className="absolute inset-center w-12 md:w-20 aspect-square bg-dark-blue-400 rounded-full backdrop-blur-[0.625rem] opacity-0 transition-opacity duration-300 ease-in-out flex-center group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2.3125rem"
          viewBox="0 0 32 37"
          fill="none"
          className="max-md:w-[1.1875rem] h-auto ml-[0.3125rem] md:ml-[0.625rem]"
        >
          <path
            d="M24.6921 22.5257L6.98349 32.6449C4.02057 34.338 0.333984 32.1985 0.333984 28.786V18.6668V8.5476C0.333984 5.13506 4.02057 2.99564 6.98349 4.68874L24.6921 14.8079C27.6779 16.5141 27.6779 20.8195 24.6921 22.5257Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </Link>
  );
};

export default VideoArticleCard;
