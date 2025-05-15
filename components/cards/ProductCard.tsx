/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RawProduct } from "@/types";
import { Button, CircleButton } from "../custom";
import { CartPlusIcon, DeleteIcon, MinusIcon, PlusIcon } from "../icons";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utility/formatPrice";

type Props = {
  item: RawProduct;
};

const ProductCard = ({ item }: Props) => {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  const { getProductSummary, addProduct, removeProduct, clearProduct } =
    useCartStore();
  const productSummary = getProductSummary(item.id);
  const isInCart = Boolean(productSummary);

  const { price, discount_price } = item;
  const hasDiscount = Boolean(discount_price);
  const finalPrice = discount_price || price;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="group/card relative overflow-hidden hover:shadow-400 rounded-[2rem] transition">
      <Link href={`/products/${item.id}`} className="p-2 flex flex-col gap-2">
        <img
          src={item.image}
          alt={item.name}
          width={300}
          height={300}
          className="w-full aspect-square rounded-[1.5rem]"
        />

        <div className="flex-1 flex flex-col gap-1">
          <h4 className="line-clamp-1 font-bold text-lg md:text-2xl group-hover/card:text-blue-main transition">
            {item.name}
          </h4>

          <div
            className="line-clamp-2 text-sm"
            dangerouslySetInnerHTML={{ __html: item.short_description }}
          />

          <div>
            <span
              className={cn("text-base font-bold", {
                "text-pink-main": hasDiscount,
                "text-foreground": !hasDiscount,
              })}
            >
              {formatPrice(finalPrice)} {t("currency")}
            </span>

            {hasDiscount && (
              <span className="text-sm text-dark-blue-400 line-through ml-2">
                {formatPrice(price)} {t("currency")}
              </span>
            )}
          </div>

          <div className="w-full h-14" />
        </div>
      </Link>

      <div className="absolute left-2 bottom-2 w-[calc(100%-1rem)] h-14">
        {/* Add to Cart Button */}
        <div
          className={cn("w-full absolute transition duration-300", {
            "-translate-x-[calc(100%+1rem)]": isInCart,
            "translate-x-0": !isInCart,
          })}
        >
          <Button
            className="w-full"
            outlined
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addProduct(item);
            }}
          >
            <CartPlusIcon />
            <span>{t("addCart")}</span>
          </Button>
        </div>

        {/* Quantity Changer */}
        <div
          className={cn(
            "w-full absolute transition duration-300 flex items-center justify-between gap-2",
            {
              "translate-x-0": isInCart,
              "translate-x-[calc(100%+1rem)]": !isInCart,
            }
          )}
        >
          <div className="flex">
            <button
              onClick={() => removeProduct(item.id)}
              type="button"
              className="h-14 aspect-square bg-blue-100 flex-center rounded-l-full hover:bg-blue-300 transition"
            >
              <MinusIcon />
            </button>
            <div className="h-14 min-w-14 bg-blue-100 px-4 flex-center">
              {productSummary?.count}
            </div>
            <button
              onClick={() => addProduct(item)}
              type="button"
              className="h-14 aspect-square bg-blue-100 flex-center rounded-r-full hover:bg-blue-300 transition"
            >
              <PlusIcon />
            </button>
          </div>

          <CircleButton onClick={() => clearProduct(item.id)}>
            <DeleteIcon />
          </CircleButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
