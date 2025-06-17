import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { Blog, PropsWithClassName } from "@/types";

type Props = {
  item: Blog;
} & PropsWithClassName;
const ArticleCard = ({ item, className }: Props) => {
  return (
    <Link
      href={`/blog/${item.id}`}
      className={cn(
        "group flex flex-col gap-2 p-2 rounded-2xl md:rounded-3xl lg:rounded-4xl",
        className
      )}
    >
      <div className="overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl">
        <Image
          src={item.image_large}
          alt={`Blog image for - ${item.title}`}
          width={190}
          height={107}
          className="object-cover w-full aspect-video transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="line-clamp-3 text-base font-bold group-hover:text-blue-main transition">
        {item.title}
      </span>
    </Link>
  );
};

export default ArticleCard;
