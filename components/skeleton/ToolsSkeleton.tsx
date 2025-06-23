import { Skeleton } from "@/components/ui/skeleton";

const ToolsSkeleton = () => {
  return (
    <div className="container flex gap-5 overflow-x-hidden py-20">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-[11rem] h-[14rem] rounded-3xl shrink-0"
        />
      ))}
    </div>
  );
};

export default ToolsSkeleton;
