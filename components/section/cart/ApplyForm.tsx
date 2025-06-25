"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button, Input, RegionSelect } from "@/components/custom";
import {
  ErrorIcon,
  PhoneIcon,
  SuccesIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useRegionStore } from "@/stores/region";

import type { PropsWithClassName } from "@/types";
import devLog from "@/utility/devLog";
import { AnimatePresence, motion } from "motion/react";
import { fadeVariants } from "@/variants";
import { useRouter } from "@/i18n/navigation";

const ApplyForm = ({ className }: PropsWithClassName) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [timer, setTimer] = useState<number>(5);

  const formSchema = z.object({
    fullname: z
      .string()
      .min(3, { message: t("error.shortName") })
      .max(50),
    phone: z
      .string()
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\+998\d{9}$/.test(val), {
        message: t("error.invalidPhone"),
      }),
  });

  const region = useRegionStore((state) => state.region);

  const count = useCartStore((state) => state.all_count);
  const totalPrice = useCartStore((state) => state.all_price);
  const totalOldPrice = useCartStore((state) => state.all_oldPrice);
  const products = useCartStore((state) => state.products);
  const clearProducts = useCartStore((state) => state.clearAll);

  const hasDiscount = totalOldPrice !== totalPrice;

  const privacyText = t("apply.privacyText", {
    link: `<a href="/${locale}/privacy-policy" target="_blank" class="text-blue-main hover:underline">${t(
      "apply.privacyLink"
    )}</a>`,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "+998",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch(`/api/${locale}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          region,
          products: products.map((p) => ({
            id: p.id,
            price: p.current_price,
            quantity: p.count,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        devLog(data.error);
        setStatus("error");
      } else {
        setStatus("success");
        devLog("Cart request submitted successfully:", data);

        setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
    } catch (error) {
      setStatus("error");
      devLog("Error during cart request form submission:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "success" && timer <= 0) {
      router.push("/");
      form.reset();
      clearProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, timer]);
  return (
    <div
      className={cn(
        "relative lg:sticky lg:top-30 lg:w-80 w-full bg-blue-200 p-4 rounded-3xl overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col max-lg:items-center">
        <span className="font-semibold">
          {t("common.totalProducts", {
            count,
          })}
        </span>

        <div className="flex flex-wrap items-center gap-x-2">
          <span
            className={cn("font-bold text-2xl will-change-contents", {
              "text-pink-main": hasDiscount,
              "text-foreground": !hasDiscount,
            })}
          >
            {totalPrice} {t("common.currency")}
          </span>

          {hasDiscount && (
            <span
              className={cn(
                "text-dark-blue-400 line-through will-change-contents"
              )}
            >
              {totalOldPrice}
              {t("common.currency")}
            </span>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <RegionSelect color="white" />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    label={t("common.yourName")}
                    startIcon={<UserIcon />}
                    color="white"
                    autoComplete="name"
                    maxLength={50}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    label={t("common.yourPhone")}
                    startIcon={<PhoneIcon />}
                    color="white"
                    autoComplete="tel"
                    maxLength={17}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            color="blue"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" />
                {t("apply.submitting")}
              </>
            ) : (
              t("apply.submit")
            )}
          </Button>

          <p
            className="text-center text-sm text-dark-blue-400"
            dangerouslySetInnerHTML={{ __html: privacyText }}
          />
        </form>
      </Form>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 p-4 bg-[#EEF2FC] flex-center flex-col text-center"
          >
            {status == "error" ? (
              <>
                <button
                  type="button"
                  className="absolute top-4 right-4 size-8 rounded-full flex-center bg-white hover:bg-gray-50"
                  onClick={() => {
                    setStatus("idle");
                    form.reset();
                  }}
                >
                  <XIcon />
                </button>

                <ErrorIcon className="mx-auto" />
                <p className="text-2xl font-bold text-pink-main">
                  {t("apply.error.title")}
                </p>
                <p className="text-dark-blue-500">
                  {t("apply.error.description")}
                </p>
              </>
            ) : (
              <>
                <SuccesIcon className="mx-auto" />
                <p className="text-2xl font-bold text-green-main">
                  {t("apply.success.title")}
                </p>
                <p className="text-dark-blue-500">
                  {t("apply.success.description")}
                </p>
                <p className="text-dark-blue-500 mt-4">
                  {t("apply.success.timer", {
                    second: timer.toString(),
                  })}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplyForm;
