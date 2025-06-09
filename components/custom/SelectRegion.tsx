"use client";

import { cn } from "@/lib/utils";
import { Region, RegionKey } from "@/types";
import { useTranslations } from "next-intl";
import { DownIcon, LocationIcon } from "../icons";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "motion/react";
import { dropdownTransition, dropdownVariants } from "@/variants";

type Props = {
  value: string;
  className?: string;
  color?: "white" | "blue";
  onValueChange?: (value: RegionKey) => void;
};

const SelectRegion = ({
  value,
  className,
  color = "white",
  onValueChange,
}: Props) => {
  const t = useTranslations("regions");
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const regions: Region[] = [
    {
      key: "tash",
      label: t("tashkent"),
    },
    {
      key: "and",
      label: t("andijan"),
    },
    {
      key: "bukh",
      label: t("bukhara"),
    },
    {
      key: "jiz",
      label: t("jizzakh"),
    },
    {
      key: "kashk",
      label: t("kashkadarya"),
    },
    {
      key: "nav",
      label: t("navoi"),
    },
    {
      key: "nam",
      label: t("namangan"),
    },
    {
      key: "sam",
      label: t("samarkand"),
    },
    {
      key: "surkh",
      label: t("surkhandarya"),
    },
    {
      key: "sir",
      label: t("syrdarya"),
    },
    {
      key: "tash_reg",
      label: t("tashkent_region"),
    },
    {
      key: "fer",
      label: t("fergana"),
    },
    {
      key: "khor",
      label: t("khorezm"),
    },
    {
      key: "kar",
      label: t("karakalpakstan"),
    },
    {
      key: "other",
      label: t("other"),
    },
  ];

  useClickOutside(wrapperRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  return (
    <div className={cn("relative w-full", className)} ref={wrapperRef}>
      <button
        type="button"
        className={cn(
          "relative w-full h-14 rounded-full flex items-center gap-2 cursor-pointer border-2 px-4 transition",
          {
            "bg-white": color === "white",
            "bg-blue-100": color === "blue",
            "border-blue-main": isOpen,
            "bg-transparent": isOpen && color === "blue",
            "border-transparent": !isOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <LocationIcon
          className={cn("shrink-0 size-6 transition", {
            "text-blue-main": isOpen,
            "text-dark-blue-400": !isOpen,
          })}
        />

        <div className="flex-1 flex flex-col text-left">
          <span className="text-xs text-blue-main line-clamp-1">
            {t("select")}
          </span>
          <span className="text-sm text-foreground line-clamp-1">
            {regions.find((region) => region.key === value)?.label}
          </span>
        </div>

        <DownIcon
          className={cn("shrink-0 size-6 transition", {
            "rotate-180 text-blue-main": isOpen,
            "rotate-0 text-dark-blue-400": !isOpen,
          })}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={dropdownTransition}
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute z-2 top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2 w-full px-1 py-4 rounded-[1.75rem] bg-white shadow-400 border border-dark-blue-200"
          >
            <div className="flex flex-col w-full max-h-[40vh] h-fit overflow-y-auto custom-scrollbar">
              {regions.map((region) => (
                <button
                  key={region.key}
                  type="button"
                  onClick={() => {
                    onValueChange?.(region.key);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "py-2 px-4 text-left cursor-pointer text-base hover:text-blue-main transition",
                    {
                      "text-blue-main": value === region.key,
                    }
                  )}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectRegion;
