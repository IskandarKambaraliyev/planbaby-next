"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/custom";

import { useConsultationModal } from "@/stores/consultationModal";

const HeroBtn = () => {
  const t = useTranslations();
  const open = useConsultationModal((state) => state.open);
  return (
    <Button className="max-lg:mx-auto" linkIcon onClick={open}>
      {t("homePage.hero.btn")}
    </Button>
  );
};

export default HeroBtn;
