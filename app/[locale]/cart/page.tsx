import StoredSection from "@/components/section/cart/Section";
import StoreSection from "@/components/section/home/store/Section";
import { StoreSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <>
      <StoredSection />

      <section className="py-20">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection />
        </Suspense>
      </section>
    </>
  );
}
