"use client";

import { PropsWithChildren, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import {
  FacebookIcon,
  ShareIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Title as CustomTitle } from "@/components/custom";
import ArticleCard from "@/components/cards/ArticleCard";
import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/custom";

import { cn } from "@/lib/utils";
import useSeparateCategories from "@/hooks/useSeparateCategories";

import type { Blog, PropsWithClassName, RawProduct } from "@/types";

type Props = PropsWithChildren & PropsWithClassName;

export const Title = ({ children, className }: Props) => {
  return (
    <h1 className={cn("text-2xl md:text-4xl font-bold", className)}>
      {children}
    </h1>
  );
};

export const Category = ({
  category,
  className,
}: {
  category: string;
} & PropsWithClassName) => {
  const { categoryColor, categoryLabel, categoryLink } =
    useSeparateCategories(category);
  return (
    <Button
      href={`/category${categoryLink}`}
      className={cn("px-3 h-6", className)}
      color={categoryColor}
    >
      {categoryLabel}
    </Button>
  );
};

export const DateLabel = ({
  date,
  className,
  isWhite = false,
}: {
  date: string;
  isWhite?: boolean;
} & PropsWithClassName) => {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time
      className={cn(
        "text-sm",
        {
          "text-dark-blue-500": !isWhite,
          "text-white-main": isWhite,
        },
        className
      )}
    >
      {formattedDate}
    </time>
  );
};

export const Tags = ({
  tags,
  className,
}: {
  tags: string[];
} & PropsWithClassName) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags
        .map((tag) => tag.trim())
        .filter((tag) => tag.replace(/^#/, "").length > 0)
        .map((tag, index) => {
          const display = tag.startsWith("#") ? tag : `#${tag}`;
          return (
            <Link
              key={index}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="text-blue-main"
            >
              {display}
            </Link>
          );
        })}
    </div>
  );
};

export const Products = ({
  products,
  className,
}: {
  products: RawProduct[];
} & PropsWithClassName) => {
  const t = useTranslations();
  return (
    <div className={cn("space-y-4", className)}>
      <CustomTitle>{t("recommended_products")}</CustomTitle>
      <div
        className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4")}
      >
        {products.map((item) => (
          <ProductCard key={item.id} item={item} responsive />
        ))}
      </div>
    </div>
  );
};

export const SimilarArticles = ({
  blogs,
  className,
}: {
  blogs: Blog[];
} & PropsWithClassName) => {
  const t = useTranslations();
  return (
    <div className={cn("space-y-4", className)}>
      <CustomTitle>{t("similar_articles")}</CustomTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((item) => (
          <ArticleCard
            item={item}
            key={item.id}
            className="border border-dark-blue-200"
          />
        ))}
      </div>
    </div>
  );
};

type SocialItem = {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
};

export const ShareBlog = ({
  blogId,
  title,
  isDesktop,
  className,
}: {
  blogId: string | number;
  title: string;
  isDesktop: boolean;
} & PropsWithClassName) => {
  const locale = useLocale();
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const BASE_URL = `${process.env.NEXT_PUBLIC_ORIGIN_URL}/${locale}/blog/`;
  const urlEncoded = encodeURIComponent(`${BASE_URL}${blogId}`);
  const textEncoded = encodeURIComponent(title);

  const shareLink = `${BASE_URL}${blogId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const socialLinks: SocialItem[] = [
    {
      label: "Telegram",
      icon: TelegramIcon,
      onClick: () =>
        openInNewTab(
          `https://t.me/share/url?url=${urlEncoded}&text=${textEncoded}`
        ),
    },
    {
      label: "Facebook",
      icon: FacebookIcon,
      onClick: () =>
        openInNewTab(
          `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`
        ),
    },
    {
      label: "Twitter",
      icon: TwitterIcon,
      onClick: () =>
        openInNewTab(
          `https://x.com/intent/post?url=${urlEncoded}&text=${textEncoded}`
        ),
    },
    {
      label: copied ? t("copied") : t("copy"),
      icon: copied ? ClipboardCheckIcon : ClipboardIcon,
      onClick: handleCopy,
    },
  ];

  return (
    <>
      {isDesktop ? (
        <div
          className={cn(
            "max-lg:hidden min-w-40 flex flex-col items-end gap-4",
            className
          )}
        >
          <h6 className="text-2xl font-bold">{t("share")}</h6>

          <div className="flex flex-col items-end gap-2">
            {socialLinks.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="group overflow-hidden transition-all duration-500 ease-in-out max-w-[2.5rem] hover:max-w-[12rem] w-fit h-10 p-2 rounded-full border border-dark-blue-200 flex items-center gap-2 hover:bg-dark-blue-200 will-change-auto"
                title={item.label}
              >
                <item.icon className="size-6 shrink-0" />
                <span className="whitespace-nowrap font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("lg:hidden", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 hover:opacity-70">
                {t("share")}
                <ShareIcon className="size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-row gap-2 rounded-full border-dark-blue-200 p-2">
              {socialLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="size-10 flex-center rounded-full border border-dark-blue-200 hover:bg-dark-blue-200 active:bg-dark-blue-200 transition-all"
                  title={item.label}
                >
                  <item.icon className="size-5" />
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export const Toolbar = ({
  category,
  publish,
  id,
  title,
  className,
}: {
  category: string;
  publish: string;
  id: string | number;
  title: string;
} & PropsWithClassName) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Category category={category} />
        <DateLabel date={publish} />
      </div>

      <ShareBlog
        blogId={id}
        title={title}
        isDesktop={false}
        className="text-blue-main"
      />
    </div>
  );
};
