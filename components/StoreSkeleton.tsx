import { Skeleton } from "./ui/skeleton";

const StoreSkeleton = () => {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[25rem] rounded-3xl sm:rounded-4xl"
        />
      ))}
    </div>
  );
};

export default StoreSkeleton;
