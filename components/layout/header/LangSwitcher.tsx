"use client";

import { useLocale } from "next-intl";
// eslint-disable-next-line no-restricted-imports
import { useRouter } from "next/navigation";

import { CircleButton } from "@/components/custom";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

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
  return (
    <CircleButton
      className={cn("", className)}
      onClick={handleChangeLocale}
      title={`Switch language to ${locale === "uz" ? "Russian" : "Uzbek"}`}
      aria-label={`Switch language to ${locale === "uz" ? "Russian" : "Uzbek"}`}
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
