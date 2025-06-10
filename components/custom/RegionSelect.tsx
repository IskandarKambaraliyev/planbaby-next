"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Region } from "@/types";
import { cn } from "@/lib/utils";
import { DownIcon, LocationIcon } from "../icons";
import { useRegionStore } from "@/stores/region";

type Props = {
  color?: "white" | "blue";
  className?: string;
};

const RegionSelect = ({ color = "white", className }: Props) => {
  const t = useTranslations("regions");
  const [open, setOpen] = useState(false);
  const region = useRegionStore((state) => state.region);
  const setRegion = useRegionStore((state) => state.setRegion);

  const REGION_LIST: Region[] = [
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
  ] as const;

  if (!region) return null;

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => setRegion(value as Region["key"])}
      defaultValue={region}
      value={region}
    >
      <SelectTrigger
        className={cn(
          "relative w-full !h-14 rounded-full flex items-center gap-2 cursor-pointer border-2 px-4 transition focus-visible:ring-blue-200 focus-visible:border-transparent",
          {
            "bg-white": color === "white",
            "bg-blue-100": color === "blue",
            "border-blue-main": open,
            "bg-transparent": open && color === "blue",
            "border-transparent": !open,
          },
          className
        )}
      >
        <LocationIcon
          className={cn("shrink-0 size-6 transition", {
            "text-blue-main": open,
            "text-dark-blue-400": !open,
          })}
        />

        <div className="flex-1 flex flex-col text-left">
          <span className="text-xs text-blue-main line-clamp-1">
            {t("select")}
          </span>
          <span className="text-sm text-foreground line-clamp-1">
            {REGION_LIST.find((reg) => reg.key === region)?.label}
          </span>
        </div>

        <DownIcon
          className={cn("shrink-0 size-6 transition", {
            "rotate-180 text-blue-main": open,
            "rotate-0 text-dark-blue-400": !open,
          })}
        />
      </SelectTrigger>
      <SelectContent className="rounded-[1.75rem] p-1">
        {REGION_LIST.map((item) => (
          <SelectItem
            key={item.key}
            value={item.key}
            className={cn("rounded-full", {
              "!text-blue-main !bg-blue-200": region === item.key,
            })}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionSelect;
