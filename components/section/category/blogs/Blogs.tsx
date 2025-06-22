"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import ArticleCard from "@/components/cards/ArticleCard";

import devLog from "@/utility/devLog";
import { cn } from "@/lib/utils";

import type { Blog, PropsWithClassName } from "@/types";

const BATCH_SIZE = 8;

const Blogs = ({ data, className }: { data: Blog[] } & PropsWithClassName) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && visibleCount < data.length) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, data.length));
      devLog("Loading more blogs:", visibleCount + BATCH_SIZE);
    }
  }, [inView, visibleCount, data.length]);

  const visibleBlogs = data.slice(0, visibleCount);
  return (
    <section
      className={cn(
        "container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {visibleBlogs.map((item, index) => (
        <ArticleCard
          item={item}
          key={item.id}
          ref={index === visibleBlogs.length - 1 ? ref : undefined}
        />
      ))}
    </section>
  );
};

export default Blogs;
