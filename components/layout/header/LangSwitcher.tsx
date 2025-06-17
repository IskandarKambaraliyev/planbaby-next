'use client';

import { CircleButton } from "@/components/custom";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { PropsWithClassName } from "@/types";
import { useLocale } from "next-intl";
// eslint-disable-next-line no-restricted-imports
import { useRouter } from "next/navigation";

const LangSwitcher = ({ className }: PropsWithClassName) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLocale = () => {
    const lang = locale === "uz" ? "ru" : "uz";
    router.push(`/${lang}${pathname}`);
  };
  return (
    <CircleButton
      className={cn("", className)}
      onClick={handleChangeLocale}
      aria-label={`Switch language to ${locale === "uz" ? "Russian" : "Uzbek"}`}
    >
      {locale === "uz" ? "Ru" : "Uz"}
    </CircleButton>
  );
};
export default LangSwitcher;