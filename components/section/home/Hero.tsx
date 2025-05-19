"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { AnimatedNumber } from "../../ui/animated-number";
import { Button } from "../../custom";
import { HappyFamilyTextIcon } from "../../icons";
import HeroImage from "./Image";

import { type HappyFamiliesApi } from "@/types";

const HomeHero = ({ data }: { data: HappyFamiliesApi | null }) => {
  const t = useTranslations("home.banner");
  const locale = useLocale();
  const [value, setValue] = useState<number>(0);

  const count = data?.results[0].results_count || 0;

  useEffect(() => {
    setValue(count);
  }, [count]);

  const title = t("title", {
    span: `<span class="text-pink-main">${t("span")}</span>`,
  });

  const images = [
    "/hero/family-img-1.png",
    "/hero/family-img-2.png",
    "/hero/family-img-3.png",
    "/hero/family-img-4.png",
  ];
  return (
    <section
      className="-mt-26 w-full relative pt-30"
      style={{
        background: "var(--color-linear)",
      }}
    >
      <div className="container flex max-lg:flex-col gap-4">
        <div className="flex flex-col gap-8">
          {data !== null && (
            <div className="max-md:flex-col max-lg:justify-center flex items-center gap-5">
              <div className="relative w-fit font-bold text-[4.375rem] leading-[4rem] md:text-[5.5rem] md:leading-[5rem] lg:text-[7.5rem] lg:leading-[5.625rem]">
                <span className="sr-only">{value.toLocaleString(locale)}</span>
                <p className="tabular-nums opacity-0">
                  {Math.round(count as number).toLocaleString("ru-RU")}
                </p>
                <AnimatedNumber
                  springOptions={{
                    bounce: 0,
                    duration: 1300,
                  }}
                  value={value}
                  className="absolute top-0 left-0 text-blue-200"
                  aria-hidden="true"
                />
                <AnimatedNumber
                  springOptions={{
                    bounce: 0,
                    duration: 1300,
                  }}
                  value={value}
                  className="absolute -top-[0.1874rem] left-[0.1874rem] text-transparent"
                  style={{
                    WebkitTextStrokeWidth: "0.0625rem",
                    WebkitTextStrokeColor: "var(--color-blue-main",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="max-md:-mr-[4rem] flex flex-col gap-2">
                <div className="flex" role="group">
                  {images.map((image, index) => (
                    <motion.img
                      initial={{ opacity: 0, x: index + 1 * 16 }}
                      animate={{ opacity: 1, x: index * -20 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.25,
                      }}
                      src={image}
                      key={index}
                      alt={`hero-image-${index}`}
                      width={64}
                      height={64}
                      className="border-2 md:border-4 border-[#DAE8FB] rounded-full size-10 md:size-16"
                    />
                  ))}
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.35,
                    delay: 1,
                  }}
                  aria-hidden="true"
                >
                  <HappyFamilyTextIcon
                    locale={locale}
                    className="w-auto h-4 md:h-6"
                  />
                </motion.div>
              </div>
            </div>
          )}

          <h1
            dangerouslySetInnerHTML={{
              __html: title,
            }}
            className="max-lg:text-center font-bold text-[2.25rem] leading-[2.625rem] lg:text-[3.5rem] lg:leading-[3.75rem] text-blue-main"
          />

          <Button className="max-lg:mx-auto" linkIcon>
            {t("btn")}
          </Button>
        </div>

        <div className="mt-4">
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
