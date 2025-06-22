"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Button, Title } from "@/components/custom";
import { NotFoundIcon } from "@/components/icons";

import devLog from "@/utility/devLog";

const NotFoundPage = ({ error }: { error: Error & { digest?: string } }) => {
  const t = useTranslations();
  useEffect(() => {
    devLog("Not Found Page:", error);
  }, [error]);

  return (
    <div className="container py-20 flex flex-col items-center gap-8">
      <NotFoundIcon />

      <div className="space-y-4 text-center">
        <Title className="text-pink-main">{t("errorPage.title")}</Title>
        <p>{t("errorPage.description")}</p>
      </div>

      <Button color="blue" href="/">
        {t("errorPage.btn")}
      </Button>
    </div>
  );
};

export default NotFoundPage;
