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
  responsive?: boolean;
};

const ProductCard = ({
  item,
  responsive = true,
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

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-3xl sm:rounded-4xl transition hover:shadow-400",
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
          loading="lazy"
        />

        <div className="flex-1 flex flex-col gap-1">
          <h4
            className={cn(
              "line-clamp-1 font-bold transition group-hover/card:text-blue-main",
              {
                "text-sm sm:text-lg lg:text-2xl": responsive,
                "text-base": !responsive,
              }
            )}
          >
            {name}
          </h4>

          <div
            className={cn("line-clamp-2", {
              "text-xs sm:text-sm": responsive,
              "text-xs": !responsive,
            })}
            dangerouslySetInnerHTML={{ __html: short_description }}
          />

          <div className="flex flex-wrap items-center gap-x-2">
            <span
              className={cn("font-bold", {
                "text-pink-main": hasDiscount,
                "text-foreground": !hasDiscount,
                "text-sm sm:text-base": responsive,
                "text-sm": !responsive,
              })}
            >
              {formatPrice(finalPrice)} {t("currency")}
            </span>

            {hasDiscount && (
              <span
                className={cn("text-dark-blue-400 line-through", {
                  "text-xs sm:text-sm": responsive,
                  "text-xs": !responsive,
                })}
              >
                {formatPrice(price)} {t("currency")}
              </span>
            )}
          </div>

          {/* Spacer to reserve space for cart buttons */}
          <div
            className={cn("w-full", {
              "h-8 sm:h-10 lg:h-14": responsive,
              "h-10": !responsive,
            })}
          />
        </div>
      </Link>

      {/* Cart Buttons Section */}
      <div
        className={cn("absolute left-2 bottom-2 w-[calc(100%-1rem)]", {
          "h-8 sm:h-10 lg:h-14": responsive,
          "h-10": !responsive,
        })}
      >
        {/* Add to Cart Button */}
        <div
          className={cn("absolute w-full transition duration-300", {
            "-translate-x-[calc(100%+1rem)]": isInCart,
            "translate-x-0": !isInCart,
          })}
        >
          <Button
            className={cn("w-full", {
              "h-8 text-xs px-2 sm:h-10 sm:text-sm sm:px-4 lg:h-14 lg:text-base":
                responsive,
              "h-10 text-sm px-3": !responsive,
            })}
            outlined
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addProduct(item);
            }}
          >
            <CartPlusIcon
              className={cn("shrink-0 ", {
                "size-4 sm:size-5 lg:size-6": responsive,
                "size-5": !responsive,
              })}
            />
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
                {
                  "h-8 [&_svg]:size-5 sm:h-10 sm:[&_svg]:size-6 lg:h-14 ":
                    responsive,
                  "h-10 [&_svg]:size-6": !responsive,
                }
              )}
            >
              <MinusIcon />
            </button>

            <div
              className={cn("min-w-10 bg-blue-100 flex-center ", {
                "h-8 text-sm sm:h-10 sm:text-base lg:h-14": responsive,
                "h-10 text-sm": !responsive,
              })}
            >
              {productSummary?.count}
            </div>

            <button
              type="button"
              onClick={() => addProduct(item)}
              className={cn(
                "aspect-square flex-center rounded-r-full bg-blue-100 hover:bg-blue-300 transition",
                {
                  "h-8 [&_svg]:size-5 sm:h-10 sm:[&_svg]:size-6 lg:h-14 ":
                    responsive,
                  "h-10 [&_svg]:size-6": !responsive,
                }
              )}
            >
              <PlusIcon />
            </button>
          </div>

          <CircleButton
            onClick={() => clearProduct(id)}
            className={cn("shrink-0", {
              "size-8 [&_svg]:size-5 sm:size-10 sm:[&_svg]:size-6 lg:size-14":
                responsive,
              "size-10 [&_svg]:size-6": !responsive,
            })}
          >
            <DeleteIcon />
          </CircleButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
