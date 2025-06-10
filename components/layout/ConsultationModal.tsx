"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "@/i18n/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useConsultationModal } from "@/stores/consultationModal";
import { Button, Input, RegionSelect } from "../custom";
import { PhoneIcon, UserIcon } from "../icons";
import { useLocale, useTranslations } from "next-intl";

const ConsultationModal = () => {
  const t = useTranslations("consultationModal");

  const formSchema = z.object({
    fullname: z
      .string()
      .min(3, { message: t("name_3") })
      .max(50),
    phone: z
      .string()
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\+998\d{9}$/.test(val), {
        message: t("invalid_phone"),
      }),
  });

  const pathname = usePathname();
  const locale = useLocale();

  const isOpen = useConsultationModal((state) => state.isOpen);
  const open = useConsultationModal((state) => state.open);
  const close = useConsultationModal((state) => state.close);

  const removeHash = useCallback(() => {
    history.replaceState(null, "", pathname);
  }, [pathname]);

  const checkHash = useCallback(() => {
    if (window.location.hash === "#consultation") {
      open();
    } else {
      close();
    }
  }, [open, close]);

  useEffect(() => {
    // Initial check:
    checkHash();

    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [checkHash]);

  useEffect(() => {
    if (!isOpen && window.location.hash === "#consultation") {
      removeHash();
    }
  }, [isOpen, removeHash]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "+998",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: API request qilishni shu yerga joylashtiring
  };

  const privacyText = t("privacy", {
    link: `<a href="/${locale}/privacy-policy" target="_blank" class="text-blue-500 hover:underline">${t(
      "link"
    )}</a>`,
  });

  if (typeof window === "undefined") return null;

  return (
    <Dialog open={isOpen} onOpenChange={(value) => (value ? open() : close())}>
      <DialogContent className="p-5 md:p-8 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-center text-dark-blue-400">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RegionSelect color="blue" />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label={t("name")}
                      startIcon={<UserIcon />}
                      color="blue"
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
                      label={t("phone")}
                      startIcon={<PhoneIcon />}
                      color="blue"
                      autoComplete="tel"
                      maxLength={17}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button color="blue" type="submit" className="w-full">
              {t("btn")}
            </Button>

            <p
              className="text-sm text-dark-blue-400"
              dangerouslySetInnerHTML={{ __html: privacyText }}
            />
          </form>

          <div className="w-full h-[1px] bg-dark-blue-200" />

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-dark-blue-400 text-sm max-[380px]:text-xs">
              {t("call_text")}
            </span>

            <Button
              className="flex-1 min-w-fit"
              href="tel:+998712000807"
              color="blue"
              outlined
              size="sm"
            >
              <PhoneIcon />
              <span>+998 71 200-08-07</span>
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
