import { Link } from "@/i18n/navigation";

import useSeparateCategories from "@/hooks/useSeparateCategories";
import { cn } from "@/lib/utils";

import type { Blog, PropsWithClassName } from "@/types";
import { proxyImage } from "@/lib/proxyImage";

type Props = {
  data: Blog[];
  categoryBadge: boolean;
};
const TopArticles = ({ data, categoryBadge }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card item={data[0]} categoryBadge={categoryBadge} className="" isFirst />

      {data.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 max-md:divide-y divide-dark-blue-200">
          {data.slice(1).map((item) => (
            <Card key={item.id} item={item} categoryBadge={categoryBadge} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopArticles;

type CardProps = {
  item: Blog;
  categoryBadge: boolean;
  isFirst?: boolean;
} & PropsWithClassName;
const Card = ({ className, item, categoryBadge, isFirst }: CardProps) => {
  return (
    <Link
      href={`/blog/${item.id}`}
      className={cn(
        "group relative overflow-hidden",
        {
          "rounded-[1.25rem]": isFirst,
          "md:rounded-[1.25rem]": !isFirst,
          "": categoryBadge,
        },
        className
      )}
    >
      <div
        className={cn("relative w-full ", {
          "max-lg:aspect-video h-full": isFirst,
          "max-md:hidden aspect-video": !isFirst,
        })}
      >
        <img
          src={proxyImage(item.image_large)}
          alt={`Blog image of - ${item.title}`}
          width={300}
          height={200}
          className="size-full object-cover group-hover:scale-105 transition ease-in-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/60" />

        <CategoryBadge
          category={item.category}
          className="absolute top-0 left-0 rounded-br-2xl"
        />
      </div>
      <div
        className={cn("flex flex-col gap-2 bottom-0 left-0 w-full", {
          "absolute p-3 md:p-5": isFirst,
          "relative py-4 md:absolute md:p-3": !isFirst,
        })}
      >
        <h5
          className={cn("text-lg font-bold line-clamp-2", {
            "md:text-3xl text-white": isFirst,
            "text-foreground md:text-white group-hover:max-md:text-blue-main transition":
              !isFirst,
          })}
        >
          {item.title}
        </h5>

        {!isFirst && (
          <CategoryBadge
            category={item.category}
            className="rounded-full md:hidden"
          />
        )}
      </div>
    </Link>
  );
};

type CategoryBadgeProps = {
  category: string;
} & PropsWithClassName;
const CategoryBadge = ({ className, category }: CategoryBadgeProps) => {
  const { categoryColor, categoryLabel } = useSeparateCategories(category);
  return (
    <div
      className={cn(
        "py-1 px-3 text-white w-fit max-w-max text-xs font-medium",
        {
          "bg-yellow-main": categoryColor === "yellow",
          "bg-blue-main": categoryColor === "blue",
          "bg-green-main": categoryColor === "green",
          "bg-pink-main": categoryColor === "pink",
        },
        className
      )}
    >
      {categoryLabel}
    </div>
  );
};
