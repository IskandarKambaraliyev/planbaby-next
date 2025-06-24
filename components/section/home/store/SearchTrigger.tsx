"use client";

import { Input } from "@/components/custom";
import { SearchIcon } from "@/components/icons";
import { useSearchModalStore } from "@/stores/searchModal";
import { useTranslations } from "next-intl";

const SearchTrigger = () => {
  const t = useTranslations();

  const openModal = useSearchModalStore((state) => state.openModal);
  return (
    <div className="relative max-md:w-2/3">
      <Input
        color="blue"
        startIcon={<SearchIcon />}
        label={t("common.searchProducts")}
        readOnly
        tabIndex={0}
      />

      <button
        className="absolute inset-0 rounded-full"
        onClick={() => openModal("products")}
        aria-label={t("common.searchProducts")}
      />
    </div>
  );
};

export default SearchTrigger;
