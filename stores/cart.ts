import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct, RawProduct } from "@/types";
import { formatPrice } from "@/utility/formatPrice";

type CartState = {
  hydrated: boolean;
  products: CartProduct[];
  all_count: number;
  all_price: string;
  all_oldPrice: string;
  setHasHydrated: (state: boolean) => void;
  addProduct: (product: RawProduct) => void;
  removeProduct: (productId: number) => void;
  increaseProduct: (productId: number) => void;
  clearProduct: (productId: number) => void;
  getProductSummary: (productId: number) =>
    | {
        old_price: string | null;
        current_price: string;
        count: number;
        total_price: string;
        total_old_price: string;
      }
    | undefined;
  clearAll: () => void;
};

const parsePrice = (value: string | undefined | null): number => {
  if (!value) return 0;
  return parseFloat(value.toString().replace(/\s/g, ""));
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      products: [],
      all_count: 0,
      all_price: "0",
      all_oldPrice: "0",

      setHasHydrated: (state) => {
        set({
          hydrated: state,
        });
      },

      addProduct: (product: RawProduct) => {
        set((state) => {
          const existingIndex = state.products.findIndex(
            (p) => p.id === product.id
          );
          const updatedProducts = [...state.products];

          if (existingIndex !== -1) {
            const existing = updatedProducts[existingIndex];
            existing.count += 1;
            const total = existing.count * parsePrice(existing.current_price);
            existing.total_price = formatPrice(total);

            const oldUnit = existing.old_price
              ? parsePrice(existing.old_price)
              : parsePrice(existing.current_price);
            existing.total_old_price = formatPrice(existing.count * oldUnit);
          } else {
            const hasDiscount = !!product.discount_price;
            const current_price = hasDiscount
              ? product.discount_price!
              : product.price;
            const old_price = hasDiscount ? formatPrice(product.price) : null;

            const oldUnit = hasDiscount
              ? parsePrice(product.price)
              : parsePrice(current_price);

            const newCartProduct: CartProduct = {
              id: product.id,
              languages: product.languages,
              title: product.name,
              short_description: product.short_description,
              description: product.description,
              old_price,
              current_price: formatPrice(current_price),
              bestseller: product.bestseller,
              image: product.image,
              count: 1,
              total_price: formatPrice(parsePrice(current_price)),
              total_old_price: formatPrice(oldUnit),
            };

            updatedProducts.push(newCartProduct);
          }

          const all_count = updatedProducts.reduce(
            (sum, p) => sum + p.count,
            0
          );
          const all_price_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_price),
            0
          );
          const all_oldPrice_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_old_price),
            0
          );

          return {
            products: updatedProducts,
            all_count,
            all_price: formatPrice(all_price_total),
            all_oldPrice: formatPrice(all_oldPrice_total),
          };
        });
      },

      increaseProduct: (productId: number) => {
        set((state) => {
          const productIndex = state.products.findIndex(
            (p) => p.id === productId
          );
          if (productIndex === -1) return {};

          const updatedProducts = [...state.products];
          const product = updatedProducts[productIndex];

          product.count += 1;
          product.total_price = formatPrice(
            product.count * parsePrice(product.current_price)
          );

          const oldUnit = product.old_price
            ? parsePrice(product.old_price)
            : parsePrice(product.current_price);
          product.total_old_price = formatPrice(product.count * oldUnit);

          const all_count = updatedProducts.reduce(
            (sum, p) => sum + p.count,
            0
          );
          const all_price_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_price),
            0
          );
          const all_oldPrice_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_old_price),
            0
          );

          return {
            products: updatedProducts,
            all_count,
            all_price: formatPrice(all_price_total),
            all_oldPrice: formatPrice(all_oldPrice_total),
          };
        });
      },

      removeProduct: (productId: number) => {
        set((state) => {
          const productIndex = state.products.findIndex(
            (p) => p.id === productId
          );
          if (productIndex === -1) return {};

          const updatedProducts = [...state.products];
          const product = updatedProducts[productIndex];

          if (product.count > 1) {
            product.count -= 1;
            product.total_price = formatPrice(
              product.count * parsePrice(product.current_price)
            );

            const oldUnit = product.old_price
              ? parsePrice(product.old_price)
              : parsePrice(product.current_price);
            product.total_old_price = formatPrice(product.count * oldUnit);
          } else {
            updatedProducts.splice(productIndex, 1);
          }

          const all_count = updatedProducts.reduce(
            (sum, p) => sum + p.count,
            0
          );
          const all_price_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_price),
            0
          );
          const all_oldPrice_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_old_price),
            0
          );

          return {
            products: updatedProducts,
            all_count,
            all_price: formatPrice(all_price_total),
            all_oldPrice: formatPrice(all_oldPrice_total),
          };
        });
      },

      clearProduct: (productId: number) => {
        set((state) => {
          const updatedProducts = state.products.filter(
            (p) => p.id !== productId
          );

          const all_count = updatedProducts.reduce(
            (sum, p) => sum + p.count,
            0
          );
          const all_price_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_price),
            0
          );
          const all_oldPrice_total = updatedProducts.reduce(
            (sum, p) => sum + parsePrice(p.total_old_price),
            0
          );

          return {
            products: updatedProducts,
            all_count,
            all_price: formatPrice(all_price_total),
            all_oldPrice: formatPrice(all_oldPrice_total),
          };
        });
      },

      getProductSummary: (productId) => {
        const product = get().products.find((p) => p.id === productId);
        if (!product) return undefined;

        return {
          old_price: product.old_price,
          current_price: product.current_price,
          count: product.count,
          total_price: product.total_price,
          total_old_price: product.total_old_price,
        };
      },

      clearAll: () => {
        set(() => ({
          products: [],
          all_count: 0,
          all_price: "0",
          all_oldPrice: "0",
        }));
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
