"use client";

import { useTranslations } from "next-intl";

import { CircleButton, Title } from "@/components/custom";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/components/icons";

import { proxyImage } from "@/lib/proxyImage";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";

import type { CartProduct, PropsWithClassName } from "@/types";

const StoredProducts = ({ className }: PropsWithClassName) => {
  const t = useTranslations();

  const products = useCartStore((state) => state.products);
  return (
    <div className={cn("space-y-4", className)}>
      <Title>{t("cartPage.title")}</Title>

      <div className="flex flex-col divide-y divide-dark-blue-200">
        {products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default StoredProducts;

const ProductCard = ({ item }: { item: CartProduct }) => {
  const t = useTranslations();

  const getProduct = useCartStore((state) => state.getProductSummary);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const addProduct = useCartStore((state) => state.increaseProduct);
  const clearProduct = useCartStore((state) => state.clearProduct);
  const product = getProduct(item.id);

  if (!product) return null;

  const hasDiscount = product.total_old_price !== product.total_price;

  return (
    <div className="flex items-center gap-2 md:gap-4 py-4">
      {/* Image wrapper */}
      <div className="size-[6rem] md:size-[7rem] rounded-lg overflow-hidden">
        <img
          src={proxyImage(item.image)}
          alt={`Product image for - ${item.title}`}
          width={112}
          height={112}
          className="size-full object-cover"
        />
      </div>

      {/* info wrapper */}
      <div className="flex-1 flex flex-col md:flex-row gap-x-4 gap-y-2">
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-sm md:text-base font-bold line-clamp-2">
            {item.title}
          </h3>
          <div
            className="line-clamp-2 text-xs md:text-sm"
            dangerouslySetInnerHTML={{
              __html: item.short_description,
            }}
          />
        </div>

        {/* Quantity controls */}
        <div className="max-md:order-1 flex flex-wrap items-center md:flex-col gap-x-2 gap-y-1">
          <div className="flex">
            <button
              type="button"
              onClick={() => removeProduct(item.id)}
              className={cn(
                "h-10 md:h-12 aspect-square flex-center rounded-l-full bg-blue-100 hover:bg-blue-300 transition"
              )}
              aria-label={`${t("removeOneFromCart")} ${item.title}`}
            >
              <MinusIcon />
            </button>

            <div
              className={cn("h-10 md:h-12 min-w-10 bg-blue-100 flex-center")}
              role="status"
              aria-live="polite"
              aria-label={`${t("quantity")}: ${product?.count}`}
            >
              {product?.count}
            </div>

            <button
              type="button"
              onClick={() => addProduct(item.id)}
              className={cn(
                "h-10 md:h-12 aspect-square flex-center rounded-r-full bg-blue-100 hover:bg-blue-300 transition"
              )}
              aria-label={`${t("addOneToCart")} ${item.title}`}
            >
              <PlusIcon />
            </button>
          </div>

          <span className="text-sm md:text-base text-dark-blue-500">
            {t("cartPage.currencyItem", {
              price: product.current_price,
            })}
          </span>
        </div>

        {/* Prices */}
        <div className="flex flex-wrap items-center md:flex-col md:items-end md:min-w-[9rem] gap-x-2">
          <span
            className={cn("font-bold text-sm md:text-base", {
              "text-pink-main": hasDiscount,
              "text-foreground": !hasDiscount,
            })}
          >
            {product.total_price} {t("currency")}
          </span>

          {hasDiscount && (
            <span className="text-xs md:text-sm text-dark-blue-400 line-through">
              {product.total_old_price} {t("currency")}
            </span>
          )}
        </div>
      </div>

      {/* clear button */}
      <CircleButton onClick={() => clearProduct(item.id)}>
        <DeleteIcon />
      </CircleButton>
    </div>
  );
};
