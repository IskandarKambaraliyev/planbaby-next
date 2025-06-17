"use client";

import { JSX, useState } from "react";
import { useTranslations } from "next-intl";
import { Sheet } from "react-modal-sheet";
import { Link, usePathname } from "@/i18n/navigation";

import {
  CartIcon,
  DocumentIcon,
  HomeIcon,
  NutritionIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
  StoreIcon,
} from "../icons";
import CartCounter from "../CartCounter";

import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";

const Navbar = ({ className }: PropsWithClassName) => {
  const t = useTranslations("nav");
  return (
    <nav
      className={cn(
        "lg:hidden fixed z-1 w-full bg-white h-20 bottom-0 left-0 rounded-t-3xl shadow-2xl border border-dark-blue-100 grid grid-cols-4 px-2 gap-2",
        className
      )}
    >
      <NavItem href="/" label={t("home")} icon={HomeIcon} />

      <NavItem href="/store" label={t("store")} icon={StoreIcon} />

      <BlogBtn label={t("blog")} icon={DocumentIcon} />

      <NavItem href="/cart" label={t("cart")} icon={CartIcon} count />
    </nav>
  );
};

export default Navbar;

type NavItemProps = {
  label: string;
  href: string;
  count?: boolean;
  icon: ({ className }: PropsWithClassName) => JSX.Element;
} & PropsWithClassName;

const NavItem = (props: NavItemProps) => {
  const pathname = usePathname();

  const active = pathname === props.href;
  return (
    <Link
      href={props.href}
      className={cn(
        "group flex-center flex-col gap-1 text-dark-blue-400 transition",
        {
          "text-blue-main": active,
        },
        props.className
      )}
    >
      <div
        className={cn("py-1 px-5 rounded-full transition", {
          "bg-transparent group-hover:bg-dark-blue-100": !active,
          "bg-blue-200": active,
        })}
      >
        {props.count ? <CartCounter /> : <props.icon className="size-6" />}
      </div>
      <span className="text-xs font-medium">{props.label}</span>
    </Link>
  );
};

type BlogBtnProps = {
  label: string;
  icon: ({ className }: PropsWithClassName) => JSX.Element;
};
const BlogBtn = (props: BlogBtnProps) => {
  const t = useTranslations("categories");
  const [isOpen, setOpen] = useState(false);

  const links = [
    {
      icon: PreparationIcon,
      label: t("preparation"),
      bgColor: "bg-yellow-200",
      href: "/category/preparation",
    },
    {
      icon: PlanningIcon,
      label: t("planning"),
      bgColor: "bg-blue-200",
      href: "/category/planning",
    },
    {
      icon: PregnancyIcon,
      label: t("pregnancy"),
      bgColor: "bg-green-200",
      href: "/category/pregnancy",
    },
    {
      icon: NutritionIcon,
      label: t("nutrition"),
      bgColor: "bg-pink-200",
      href: "/category/nutrition",
    },
  ];
  return (
    <>
      <button
        type="button"
        className={cn(
          "group flex-center flex-col gap-1 text-dark-blue-400 transition",
          {
            "text-blue-main": isOpen,
          }
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          className={cn("py-1 px-5 rounded-full transition", {
            "bg-transparent group-hover:bg-dark-blue-100": !isOpen,
            "bg-blue-200": isOpen,
          })}
        >
          {<props.icon className="size-6" />}
        </div>

        <span className="text-xs font-medium">{props.label}</span>
      </button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        detent="content-height"
      >
        <Sheet.Container className="!rounded-t-3xl !max-w-[30rem] !left-1/2 !-translate-x-1/2">
          <Sheet.Header />
          <Sheet.Content className="pb-6 -mt-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-2 py-3 px-5"
              >
                <div
                  className={cn(
                    "size-8 flex-center rounded-full",
                    link.bgColor
                  )}
                >
                  <link.icon className="size-3/5" />
                </div>
                <span className="text-lg">{link.label}</span>
              </Link>
            ))}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          className="!bg-dark-blue-400 backdrop-blur-sm"
          onTap={() => setOpen(false)}
        />
      </Sheet>
    </>
  );
};
