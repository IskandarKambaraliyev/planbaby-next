"use client";

import { AnimatePresence, motion } from "motion/react";

import { useCartStore } from "@/stores/cart";
import { proxyImage } from "@/lib/proxyImage";
import { cn } from "@/lib/utils";

import type { PropsWithClassName, RawProduct } from "@/types";
import { fadeVariants } from "@/variants";
import { Button } from "@/components/custom";
import { CartPlusIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/utility/formatPrice";

type Props = {
  product: RawProduct;
} & PropsWithClassName;

export const Cart = ({
  product,
  className,
}: {
  product: RawProduct;
} & PropsWithClassName) => {
  const t = useTranslations();

  const { getProductSummary, addProduct, removeProduct, increaseProduct } =
    useCartStore();

  const hydreted = useCartStore((state) => state.hydrated);

  const productSummary = getProductSummary(product.id);
  const finalPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price;
  return (
    <AnimatePresence mode="wait">
      {hydreted ? (
        <motion.div
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="cart"
          className={cn("bg-blue-200 rounded-3xl p-5", className)}
        >
          <AnimatePresence mode="wait">
            {productSummary !== undefined ? (
              <motion.div
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key="isInCart"
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {t("common.totalCost")}:
                  </span>

                  {/* Total Price */}
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span
                      className={cn("font-bold text-2xl will-change-contents", {
                        "text-pink-main": hasDiscount,
                        "text-foreground": !hasDiscount,
                      })}
                    >
                      {productSummary.total_price} {t("common.currency")}
                    </span>

                    {hasDiscount && (
                      <span
                        className={cn(
                          "text-dark-blue-400 line-through will-change-contents"
                        )}
                      >
                        {productSummary.total_old_price}
                        {t("common.currency")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Changer */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className={cn(
                        "h-10 md:h-12 aspect-square flex-center rounded-l-full bg-white hover:bg-gray-50 transition"
                      )}
                    >
                      <MinusIcon />
                    </button>

                    <div
                      className={cn(
                        "h-10 md:h-12 min-w-10 bg-white flex-center will-change-contents"
                      )}
                      role="status"
                      aria-live="polite"
                    >
                      {productSummary.count}
                    </div>

                    <button
                      type="button"
                      onClick={() => increaseProduct(product.id)}
                      className={cn(
                        "h-10 md:h-12 aspect-square flex-center rounded-r-full bg-white hover:bg-gray-50 transition"
                      )}
                    >
                      <PlusIcon />
                    </button>
                  </div>

                  <span className="text-dark-blue-500">
                    {t("common.currencyItem", {
                      price: productSummary.current_price,
                    })}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key="isNotInCart"
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-wrap items-center gap-x-2">
                  <span
                    className={cn("font-bold text-2xl", {
                      "text-pink-main": hasDiscount,
                      "text-foreground": !hasDiscount,
                    })}
                  >
                    {formatPrice(finalPrice)} {t("common.currency")}
                  </span>

                  {hasDiscount && (
                    <span className={cn("text-dark-blue-400 line-through")}>
                      {formatPrice(product.price)} {t("common.currency")}
                    </span>
                  )}
                </div>

                <Button onClick={() => addProduct(product)}>
                  <CartPlusIcon className={cn("shrink-0 ")} />
                  <span className="truncate">{t("common.addToCart")}</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="loading"
        >
          Loading Cart
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProductInfo = ({ product, className }: Props) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {/* Image */}
      <img
        src={proxyImage(product.image)}
        alt={`Product image for - ${product.name}`}
        className="w-full aspect-square object-cover rounded-2xl md:rounded-3xl"
      />

      {/* Info */}
      <div className="space-y-4">
        <h1 className="font-bold text-2xl md:text-3xl">{product.name}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{
            __html: product.short_description,
          }}
        />
      </div>
    </div>
  );
};

export const ProductDetail = ({ product, className }: Props) => {
  const t = useTranslations();
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="font-bold text-2xl md:text-3xl">
        {t("productPage.description")}
      </h2>
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
    </div>
  );
};
