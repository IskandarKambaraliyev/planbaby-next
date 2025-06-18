"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { HappyFamilyTextIcon } from "@/components/icons";
import { proxyImage } from "@/lib/proxyImage";

const images = [
  "/hero/family-img-1.png",
  "/hero/family-img-2.png",
  "/hero/family-img-3.png",
  "/hero/family-img-4.png",
];

interface Props {
  count: number;
}

const HeroAnimation = ({ count }: Props) => {
  const [value, setValue] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);

    setTimeout(() => {
      setValue(count);
    }, 100);
  }, [count]);

  if (!mounted) return null;

  return (
    <>
      <div className="max-md:flex-col max-lg:justify-center flex items-center gap-5">
        <div className="relative w-fit font-bold text-[4.375rem] leading-[4rem] md:text-[5.5rem] md:leading-[5rem] lg:text-[7.5rem] lg:leading-[5.625rem]">
          <span className="sr-only">{value.toLocaleString(locale)}</span>
          <p className="tabular-nums opacity-0">
            {Math.round(count).toLocaleString(locale)}
          </p>
          <AnimatedNumber
            springOptions={{ bounce: 0, duration: 1300 }}
            value={value}
            className="absolute top-0 left-0 text-blue-200"
            aria-hidden="true"
          />
          <AnimatedNumber
            springOptions={{ bounce: 0, duration: 1300 }}
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
                key={index}
                initial={{ opacity: 0, x: index + 1 * 16 }}
                animate={{ opacity: 1, x: index * -20 }}
                transition={{ duration: 0.35, delay: index * 0.25 }}
                src={proxyImage(image)}
                alt={`hero-image-${index}`}
                width={64}
                height={64}
                className="border-2 md:border-4 border-[#DAE8FB] rounded-full size-10 md:size-16"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.35, delay: 1 }}
            aria-hidden="true"
          >
            <HappyFamilyTextIcon
              locale={locale}
              className="w-auto h-4 md:h-6"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroAnimation;
