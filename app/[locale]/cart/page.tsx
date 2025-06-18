import ApplyForm from "@/components/section/cart/ApplyForm";
import StoredProducts from "@/components/section/cart/StoredProducts";
import StoreSection from "@/components/section/home/store/Section";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <>
      <section className="container relative flex max-lg:flex-col items-start gap-4 py-8">
        <StoredProducts className="flex-1" />

        <ApplyForm />
      </section>

      <section className="py-20">
        <Suspense fallback={<div>Loading Store...</div>}>
          <StoreSection />
        </Suspense>
      </section>
    </>
  );
}
