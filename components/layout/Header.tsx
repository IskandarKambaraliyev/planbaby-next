"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
// eslint-disable-next-line no-restricted-imports
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";

import Logo from "../Logo";
import {
  DownIcon,
  NutritionIcon,
  PhoneIcon,
  PlanningIcon,
  PregnancyIcon,
  PreparationIcon,
  SearchIcon,
} from "../icons";
import { Button, CircleButton } from "../custom";
import CartCounter from "../CartCounter";

import { useModalStore } from "@/stores/modal";
import { cn } from "@/lib/utils";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownTransition, dropdownVariants } from "@/variants";

import type { PropsWithClassName } from "@/types";

const Header = ({ className }: PropsWithClassName) => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const openModal = useModalStore((state) => state.openModal);

  const [isScrolled, setIsScrolled] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    {
      href: "/",
      label: t("home"),
    },
    {
      href: "/about",
      label: t("about"),
    },
    {
      href: "/blog",
      label: t("blog"),
    },
    {
      href: "/contact",
      label: t("contact"),
    },
    {
      href: "/store",
      label: t("store"),
    },
  ];
  return (
    <header
      className={cn(
        "fixed z-5 top-0 left-0 w-full py-3 transition",
        {
          "bg-white/60 backdrop-blur-sm": isScrolled,
          "bg-transparent": !isScrolled,
        },
        className
      )}
    >
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="max-lg:hidden flex items-center">
            {navLinks.map((link, index) => {
              if (link.href !== "/blog") {
                return (
                  <Link
                    href={link.href}
                    key={`${link.href}-${index}`}
                    className={cn("px-4 py-2 rounded-full text-lg transition", {
                      "bg-blue-200 text-blue-main": pathname === link.href,
                      "bg-transparent text-foreground hover:bg-blue-100 active:bg-blue-200":
                        pathname !== link.href,
                    })}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return <BlogCategories key={`${link.href}-${index}`} />;
              }
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <CircleButton
            href="/cart"
            className="max-lg:!hidden"
            aria-label={t("cart")}
          >
            <CartCounter />
          </CircleButton>

          <LangSwitcher />

          <CircleButton
            onClick={() => openModal("both")}
            aria-label={t("search")}
          >
            <SearchIcon />
          </CircleButton>

          <Button
            href="tel:+998712000807"
            color="blue"
            outlined
            className="max-md:!hidden"
            data-testid="call-link"
            aria-label={t("phone", {
              number: "+998 71 200-08-07",
            })}
          >
            <PhoneIcon />
            <span>+998 71 200-08-07</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

const BlogCategories = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      key: "preparation",
      href: "/category/preparation",
      icon: PreparationIcon,
      bgColor: "bg-yellow-200",
      hoverColor: "hover:bg-yellow-200",
    },
    {
      key: "planning",
      href: "/category/planning",
      icon: PlanningIcon,
      bgColor: "bg-blue-200",
      hoverColor: "hover:bg-blue-200",
    },
    {
      key: "pregnancy",
      href: "/category/pregnancy",
      icon: PregnancyIcon,
      bgColor: "bg-green-200",
      hoverColor: "hover:bg-green-200",
    },
    {
      key: "nutrition",
      href: "/category/nutrition",
      icon: NutritionIcon,
      bgColor: "bg-pink-200",
      hoverColor: "hover:bg-pink-200",
    },
  ] as const;

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className={cn(
          "px-4 py-2 rounded-full text-lg transition cursor-pointer flex-center gap-1.5",
          {
            "bg-blue-200 text-blue-main": isOpen,
            "bg-transparent hover:bg-blue-100 active:bg-blue-200": !isOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="blog-categories-menu"
        id="blog-categories-button"
      >
        <span>{t("nav.blog")}</span>
        <DownIcon
          className={cn("size-6 transition", {
            "rotate-180": isOpen,
            "rotate-0": !isOpen,
          })}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="blog-categories-menu"
            role="menu"
            aria-labelledby="blog-categories-button"
            transition={dropdownTransition}
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute z-1 top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2 flex flex-col bg-white shadow-400 p-2 rounded-[1.75rem] border border-dark-blue-100"
          >
            {categories.map((category) => {
              return (
                <Link
                  key={category.key}
                  href={category.href}
                  className={cn(
                    "flex items-center gap-2 p-2 pr-4 rounded-full transition",
                    category.hoverColor
                  )}
                  role="menuitem"
                  tabIndex={-1}
                >
                  <div
                    className={cn(
                      "shrink-0 size-8 rounded-full flex-center",
                      category.bgColor
                    )}
                  >
                    <category.icon className="size-4.5" aria-hidden="true" />
                  </div>

                  <span className="w-max text-lg">
                    {t(`categories.${category.key}`)}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LangSwitcher = ({ className }: PropsWithClassName) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLocale = () => {
    const lang = locale === "uz" ? "ru" : "uz";
    router.push(`/${lang}${pathname}`);
  };
  return (
    <CircleButton
      className={cn("", className)}
      onClick={handleChangeLocale}
      aria-label={`Switch language to ${locale === "uz" ? "Russian" : "Uzbek"}`}
    >
      {locale === "uz" ? "Ru" : "Uz"}
    </CircleButton>
  );
};
