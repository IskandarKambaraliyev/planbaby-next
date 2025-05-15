"use client";

import { useCartStore } from "@/stores/cart";
import { SlidingNumber } from "./ui/sliding-number";
import { CartIcon } from "./icons";

const CartCounter = () => {
  const count = useCartStore((state) => state.all_count);
  return (
    <div className="relative size-6">
      {count > 0 && (
        <div className="absolute min-w-4 p-1 -top-[0.375rem] -right-[0.375rem] flex-center bg-pink-main text-white text-[0.5rem] leading-none rounded-full">
          <SlidingNumber value={count} />
        </div>
      )}

      <CartIcon />
    </div>
  );
};

export default CartCounter;
