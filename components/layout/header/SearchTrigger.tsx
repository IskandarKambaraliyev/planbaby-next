"use client";

import { useTranslations } from "next-intl";

import { CircleButton } from "@/components/custom";
import { SearchIcon } from "@/components/icons";

import { useModalStore } from "@/stores/modal";

const SearchTrigger = () => {
  const t = useTranslations();

  const openModal = useModalStore((state) => state.openModal);
  return (
    <CircleButton
      onClick={() => openModal("both")}
      aria-label={t("header.search")}
      title={t("header.search")}
    >
      <SearchIcon />
    </CircleButton>
  );
};

export default SearchTrigger;
