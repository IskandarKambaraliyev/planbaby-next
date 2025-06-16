"use client";

import { Button, Title } from "@/components/custom";
import { NotFoundIcon } from "@/components/icons";
import devLog from "@/utility/devLog";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  const t = useTranslations();
  useEffect(() => {
    devLog("Error in Blog Detail Page:", error);
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

export default Error;
