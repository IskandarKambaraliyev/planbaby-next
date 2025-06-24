"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
// eslint-disable-next-line no-restricted-imports
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Loader2Icon } from "lucide-react";
import { CircleButton } from "@/components/custom";

import { usePathname } from "@/i18n/navigation";

import type { PropsWithClassName } from "@/types";

const LangSwitcher = ({ className }: PropsWithClassName) => {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLocale = () => {
    setLoading(true);
    const lang = locale === "uz" ? "ru" : "uz";
    router.push(`/${lang}${pathname}`);
  };

  const title = locale === "ru" ? "O‘zbek tili" : "Русский язык";
  return (
    <CircleButton
      className={cn("", className)}
      onClick={handleChangeLocale}
      title={title}
      aria-label={title}
      disabled={loading}
    >
      {loading ? (
        <Loader2Icon className="size-6 animate-spin text-dark-blue-400" />
      ) : locale === "uz" ? (
        "Ru"
      ) : (
        "Uz"
      )}
    </CircleButton>
  );
};
export default LangSwitcher;
