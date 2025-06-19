import StoreSection from "@/components/section/home/store/Section";
import StoreSkeleton from "@/components/StoreSkeleton";
import { Suspense } from "react";

export default async function StorePage() {
  return (
    <>
      <section className="py-8">
        <Suspense fallback={<StoreSkeleton />}>
          <StoreSection limit={200} />
        </Suspense>
      </section>
    </>
  );
}
