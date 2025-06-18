import StoredSection from "@/components/section/cart/StoredSection";
import StoreSection from "@/components/section/home/store/Section";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <>
      <StoredSection />

      <section className="py-20">
        <Suspense fallback={<div>Loading Store...</div>}>
          <StoreSection />
        </Suspense>
      </section>
    </>
  );
}
