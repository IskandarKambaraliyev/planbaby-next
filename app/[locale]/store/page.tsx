import { Suspense } from "react";

import StoreSection from "@/components/section/home/store/Section";
import { StoreSkeleton } from "@/components/skeleton";

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
