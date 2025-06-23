import { Skeleton } from "../ui/skeleton";

import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";

const SliderSkeleton = ({ className }: PropsWithClassName) => {
  return (
    <div className={cn("container", className)}>
      <Skeleton className="w-full aspect-[724/407] lg:aspect-[1261/388] rounded-2xl md:rounded-3xl" />
    </div>
  );
};

export default SliderSkeleton;
