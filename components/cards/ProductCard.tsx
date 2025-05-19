/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PropsWithClassName, RawProduct } from "@/types";
import { Button, CircleButton } from "../custom";
import { CartPlusIcon, DeleteIcon, MinusIcon, PlusIcon } from "../icons";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utility/formatPrice";

type Props = {
  item: RawProduct;
  size?: "sm" | "lg";
};

const ProductCard = ({
  item,
  size = "lg",
  className,
}: Props & PropsWithClassName) => {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  const { getProductSummary, addProduct, removeProduct, clearProduct } =
    useCartStore();
  const productSummary = getProductSummary(item.id);
  const isInCart = Boolean(productSummary);

  const { price, discount_price, image, name, short_description, id } = item;
  const finalPrice = discount_price || price;
  const hasDiscount = !!discount_price;

  const heightSize = size === "sm" ? "h-10" : "h-14";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-[2rem] transition hover:shadow-400",
        className
      )}
    >
      {/* Product Info Section */}
      <Link href={`/products/${id}`} className="flex-1 p-2 flex flex-col gap-2">
        <img
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full aspect-square rounded-[1.5rem]"
        />

        <div className="flex-1 flex flex-col gap-1">
          <h4
            className={cn(
              "line-clamp-1 text-lg md:text-2xl font-bold transition group-hover/card:text-blue-main",
              {
                "!text-base": size === "sm",
              }
            )}
          >
            {name}
          </h4>

          <div
            className={cn("line-clamp-2 text-sm", {
              "!text-xs": size === "sm",
            })}
            dangerouslySetInnerHTML={{ __html: short_description }}
          />

          <div className="flex flex-wrap gap-x-2">
            <span
              className={cn("text-base font-bold", {
                "text-pink-main": hasDiscount,
                "text-foreground": !hasDiscount,
              })}
            >
              {formatPrice(finalPrice)} {t("currency")}
            </span>

            {hasDiscount && (
              <span className="text-sm text-dark-blue-400 line-through">
                {formatPrice(price)} {t("currency")}
              </span>
            )}
          </div>

          {/* Spacer to reserve space for cart buttons */}
          <div className={cn("w-full", heightSize)} />
        </div>
      </Link>

      {/* Cart Buttons Section */}
      <div
        className={cn(
          "absolute left-2 bottom-2 w-[calc(100%-1rem)]",
          heightSize
        )}
      >
        {/* Add to Cart Button */}
        <div
          className={cn("absolute w-full transition duration-300", {
            "-translate-x-[calc(100%+1rem)]": isInCart,
            "translate-x-0": !isInCart,
          })}
        >
          <Button
            className="w-full"
            outlined
            size={size === "sm" ? "sm" : "xl"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addProduct(item);
            }}
          >
            <CartPlusIcon className="shrink-0" />
            <span className="truncate">{t("addCart")}</span>
          </Button>
        </div>

        {/* Quantity Changer */}
        <div
          className={cn(
            "absolute w-full transition duration-300 flex items-center justify-between gap-2",
            {
              "translate-x-0": isInCart,
              "translate-x-[calc(100%+1rem)]": !isInCart,
            }
          )}
        >
          <div className="flex">
            <button
              type="button"
              onClick={() => removeProduct(id)}
              className={cn(
                "aspect-square flex-center rounded-l-full bg-blue-100 hover:bg-blue-300 transition",
                heightSize
              )}
            >
              <MinusIcon />
            </button>

            <div
              className={cn(
                "min-w-14 px-4 bg-blue-100 flex-center",
                heightSize
              )}
            >
              {productSummary?.count}
            </div>

            <button
              type="button"
              onClick={() => addProduct(item)}
              className={cn(
                "aspect-square flex-center rounded-r-full bg-blue-100 hover:bg-blue-300 transition",
                heightSize
              )}
            >
              <PlusIcon />
            </button>
          </div>

          <CircleButton
            size={size === "sm" ? "md" : undefined}
            onClick={() => clearProduct(id)}
          >
            <DeleteIcon />
          </CircleButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
