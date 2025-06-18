"use client";

import { useCartStore } from "@/stores/cart";
import StoredProducts from "./StoredProducts";
import ApplyForm from "./ApplyForm";
import { PropsWithClassName } from "@/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const StoredSection = ({ className }: PropsWithClassName) => {
  const hydrated = useCartStore((state) => state.hydrated);

  return (
    <>
      {hydrated ? (
        <section
          className={cn(
            "container relative flex max-lg:flex-col items-start gap-4 py-8",
            className
          )}
        >
          <StoredProducts className="flex-1" />

          <ApplyForm />
        </section>
      ) : (
        <Skeleton className="container h-80 rounded-3xl my-8" />
      )}
    </>
  );
};

export default StoredSection;
