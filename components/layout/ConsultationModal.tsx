"use client";

import { useEffect, useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

import { useForm } from "react-hook-form";

import { AnimatePresence, motion } from "motion/react";
import { Loader2Icon } from "lucide-react";
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
import { Button, Input, RegionSelect } from "../custom";
import { ErrorIcon, PhoneIcon, SuccesIcon, UserIcon } from "../icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import devLog from "@/utility/devLog";
import { useConsultationModal } from "@/stores/consultationModal";
import { useRegionStore } from "@/stores/region";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ConsultationModal = () => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

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

  const pathname = usePathname();
  const locale = useLocale();

  const isOpen = useConsultationModal((state) => state.isOpen);
  const open = useConsultationModal((state) => state.open);
  const close = useConsultationModal((state) => state.close);
  const step = useConsultationModal((state) => state.step);
  const setStep = useConsultationModal((state) => state.setStep);

  const region = useRegionStore((state) => state.region);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const body = {
        ...values,
        region: region,
      };

      const res = await fetch(`/api/${locale}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        devLog(data.error);
        setStep("error");
      } else {
        setStep("success");
        devLog("Consultation request submitted successfully:", data);
        form.reset();
      }
    } catch (error) {
      setStep("error");
      devLog("Error during consultation form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const privacyText = t("apply.privacyText", {
    link: `<a href="/${locale}/privacy-policy" target="_blank" class="text-blue-main hover:underline">${t(
      "apply.privacyLink"
    )}</a>`,
  });

  if (typeof window === "undefined") return null;

  return (
    <Dialog open={isOpen} onOpenChange={(value) => (value ? open() : close())}>
      <DialogContent className="p-5 md:p-8 rounded-3xl">
        <AnimatePresence mode="wait">
          {step === "error" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="error"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <ErrorIcon className="mx-auto" />
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
                  {t("apply.error.title")}
                </DialogTitle>
                <DialogDescription className="text-center text-dark-blue-400">
                  {t("apply.error.description")}
                </DialogDescription>
              </DialogHeader>

              <Button
                color="blue"
                type="button"
                onClick={() => setStep("form")}
                className="w-full"
              >
                {t("apply.error.btn")}
              </Button>

              <Bottom />
            </motion.div>
          ) : step === "success" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="success"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <SuccesIcon className="mx-auto" />
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
                  {t("apply.success.title")}
                </DialogTitle>
                <DialogDescription className="text-center text-dark-blue-400">
                  {t("apply.success.description")}
                </DialogDescription>
              </DialogHeader>

              <Button
                color="blue"
                type="button"
                onClick={close}
                className="w-full"
              >
                {t("apply.success.btn")}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="form"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
                  {t("apply.title")}
                </DialogTitle>
                <DialogDescription className="text-center text-dark-blue-400">
                  {t("apply.description")}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <RegionSelect color="blue" />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label={t("common.yourName")}
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
                            label={t("common.yourPhone")}
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
                    className="text-sm text-dark-blue-400"
                    dangerouslySetInnerHTML={{ __html: privacyText }}
                  />
                </form>

                <Bottom />
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;

const Bottom = () => {
  const t = useTranslations();
  return (
    <>
      <div className="w-full h-[1px] bg-dark-blue-200" />

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-dark-blue-400 text-sm max-[380px]:text-xs">
          {t("apply.orCall")}
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
    </>
  );
};
