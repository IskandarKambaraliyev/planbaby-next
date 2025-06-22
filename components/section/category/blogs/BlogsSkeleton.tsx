import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";

const BlogsSkeleton = ({ className }: PropsWithClassName) => {
  return (
    <div
      className={cn(
        "container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[14rem] rounded-2xl md:rounded-3xl"
        />
      ))}
    </div>
  );
};

export default BlogsSkeleton;
