"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Link, usePathname } from "@/i18n/navigation";

import Logo from "../../Logo";
import { PhoneIcon } from "../../icons";
import { Button, CircleButton } from "../../custom";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";
import { useTranslations } from "next-intl";

const CartCounter = dynamic(() => import("../../CartCounter"), {
  ssr: false,
  loading: () => <Skeleton className="size-12 rounded-full" />,
});

const BlogCategories = dynamic(() => import("./BlogCategories"), {
  ssr: false,
  loading: () => <Skeleton className="w-24 h-11 rounded-full" />,
});

const LangSwitcher = dynamic(() => import("./LangSwitcher"), {
  ssr: false,
  loading: () => <Skeleton className="size-12 rounded-full" />,
});

const SearchTrigger = dynamic(() => import("./SearchTrigger"), {
  ssr: false,
  loading: () => <Skeleton className="size-12 rounded-full" />,
});

const Header = ({ className }: PropsWithClassName) => {
  const t = useTranslations("nav");
  const pathname = usePathname();

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

          <SearchTrigger />

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
