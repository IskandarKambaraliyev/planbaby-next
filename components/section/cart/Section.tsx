"use client";

import { AnimatePresence, motion } from "motion/react";
import StoredProducts from "./StoredProducts";
import ApplyForm from "./ApplyForm";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyCart from "./EmptyCart";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { fadeVariants } from "@/variants";

import type { PropsWithClassName } from "@/types";

const StoredSection = ({ className }: PropsWithClassName) => {
  const hydrated = useCartStore((state) => state.hydrated);
  const products = useCartStore((state) => state.products);

  return (
    <>
      {hydrated ? (
        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            <motion.section
              key="stored-products"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "container relative flex max-lg:flex-col items-start gap-4 py-8",
                className
              )}
            >
              <StoredProducts className="flex-1" />

              <ApplyForm />
            </motion.section>
          ) : (
            <EmptyCart />
          )}
        </AnimatePresence>
      ) : (
        <Skeleton className="container h-80 rounded-3xl my-8" />
      )}
    </>
  );
};

export default StoredSection;
