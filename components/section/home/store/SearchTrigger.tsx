"use client";

import { Input } from "@/components/custom";
import { SearchIcon } from "@/components/icons";
import { useModalStore } from "@/stores/modal";
import { useTranslations } from "next-intl";

const SearchTrigger = () => {
  const t = useTranslations();

  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className="relative max-md:w-2/3">
      <Input
        color="blue"
        startIcon={<SearchIcon />}
        label={t("modal.search.product")}
        readOnly
        tabIndex={0}
      />

      <button
        className="absolute inset-0 rounded-full"
        onClick={() => openModal("products")}
        aria-label={t("modal.search.product")}
      />
    </div>
  );
};

export default SearchTrigger;
