import { JSX } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

import Logo from "../Logo";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  PhoneIcon,
  TelegramIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../icons";
import { CircleButton } from "../custom";

import { cn } from "@/lib/utils";

import type { PropsWithClassName } from "@/types";

type Links = {
  title: string;
  children: {
    icon?: ({ className }: PropsWithClassName) => JSX.Element;
    label: string;
    href: string;
  }[];
}[];

const Footer = async ({ className }: PropsWithClassName) => {
  const t = await getTranslations();

  const links: Links = [
    {
      title: t("footer.contacts"),
      children: [
        {
          icon: PhoneIcon,
          label: "+998 71 200 03 93",
          href: "tel:+998 71 200 03 93",
        },
        {
          icon: EmailIcon,
          label: "info@planbabyclinic.com",
          href: "mailto:info@planbabyclinic.com",
        },
        {
          icon: LocationIcon,
          label: t("footer.address"),
          href: "https://yandex.com/maps/-/CDFONMKk",
        },
      ],
    },
    {
      title: t("footer.company"),
      children: [
        {
          label: t("footer.about"),
          href: "/about",
        },
        {
          label: "PlanBaby clinic",
          href: "https://planbabyclinic.com/",
        },
      ],
    },
    {
      title: t("footer.blog"),
      children: [
        {
          label: t("categories.preparation"),
          href: "/category/preparation",
        },
        {
          label: t("categories.planning"),
          href: "/category/planning",
        },
        {
          label: t("categories.pregnancy"),
          href: "/category/pregnancy",
        },
        {
          label: t("categories.nutrition"),
          href: "/category/nutrition",
        },
      ],
    },
    {
      title: t("footer.useful"),
      children: [
        {
          label: t("calculator"),
          href: "/tools/calculator",
        },
        {
          label: t("spermogram"),
          href: "/tools/spermogram",
        },
        {
          label: t("names"),
          href: "/tools/names",
        },
        {
          label: t("right_nutrition"),
          href: "/tag/правильное_питание",
        },
      ],
    },
  ];
  return (
    <footer
      className={cn("py-10 lg:py-20 bg-dark-blue-main text-white", className)}
    >
      <div className="container flex max-lg:flex-col gap-y-8 gap-x-16">
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Logo color="white" />
          </Link>

          <p className="text-xs text-white-400">{t("footer.copyright")}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex max-md:flex-col md:justify-between gap-x-10 gap-y-8">
            {links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex flex-col gap-4">
                <h6 className="text-lg font-bold">{link.title}</h6>

                <div className="flex flex-col gap-3">
                  {link.children.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex gap-2 items-center"
                      target={item.href.startsWith("/") ? undefined : "_blank"}
                    >
                      {item.icon && (
                        <item.icon className="text-pink-main size-5" />
                      )}
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {linkIndex === 0 && <SocialLinks />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocialLinks = ({ className }: PropsWithClassName) => {
  const socials = [
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/planbaby_uz/",
    },
    {
      icon: YouTubeIcon,
      href: "https://www.youtube.com/@planbabyuz",
    },
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/PlanBabyUz/",
    },
    {
      icon: TwitterIcon,
      href: "https://twitter.com/",
    },
    {
      icon: TelegramIcon,
      href: "https://t.me/planbaby_doraline_bot",
    },
  ];
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      {socials.map((item, index) => (
        <CircleButton
          href={item.href}
          target="_blank"
          key={index}
          color="white-transparent"
          size="md"
        >
          <item.icon className="size-5 text-white" />
        </CircleButton>
      ))}
    </div>
  );
};
