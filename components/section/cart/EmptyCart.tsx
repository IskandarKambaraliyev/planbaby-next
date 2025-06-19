import { useTranslations } from "next-intl";

import { motion } from "motion/react";
import { Button, Title } from "@/components/custom";
import { NotFoundIcon } from "@/components/icons";

import { fadeVariants } from "@/variants";

const EmptyCart = () => {
  const t = useTranslations();
  return (
    <motion.div
      key="empty-cart"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container flex flex-col items-center gap-8"
    >
      <NotFoundIcon />

      <div className="space-y-2 text-center">
        <Title className="text-pink-main">{t("cartPage.noItems")}</Title>
        <p>{t("cartPage.noItemsDescription")}</p>
      </div>

      <Button href="/" color="blue" linkIcon>
        {t("cartPage.goHome")}
      </Button>
    </motion.div>
  );
};

export default EmptyCart;
