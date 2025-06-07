import { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Header, Footer, Navbar, StoreModal } from "@/components/layout";

import "../globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { getBlog, getProducts } from "../api";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const locale = await getLocale();

  return {
    title: t("home.title"),
    description: t("home.description"),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/`),
    alternates: {
      canonical: "/",
      languages: {
        uz: "/uz",
        ru: "/ru",
      },
    },
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      siteName: "Plan Baby",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
      locale: locale,
    },
    keywords: t("keywords"),
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          sizes: "16x16",
          url: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          url: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          sizes: "192x192",
          url: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          sizes: "512x512",
          url: "/android-chrome-512x512.png",
        },
      ],
    },
  };
}

const ttFonts = localFont({
  src: [
    {
      path: "../fonts/regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/regular-italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../fonts/medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../fonts/medium-italic.ttf",
      style: "italic",
      weight: "500",
    },
    {
      path: "../fonts/semibold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../fonts/semibold-italic.ttf",
      style: "italic",
      weight: "600",
    },
    {
      path: "../fonts/bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../fonts/bold-italic.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../fonts/extra-bold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../fonts/extra-bold-italic.ttf",
      style: "italic",
      weight: "800",
    },
    {
      path: "../fonts/black.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "../fonts/black-italic.ttf",
      style: "italic",
      weight: "900",
    },
  ],
  variable: "--tt-hoves",
  weight: "400 500 600 700 800 900",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const products = await getProducts(locale);
  const preparationBlogs = await getBlog(locale, 12, "preparing");
  const planningBlogs = await getBlog(locale, 12, "planning");
  const pregnancyBlogs = await getBlog(locale, 12, "pregnancy");
  const nutritionBlogs = await getBlog(locale, 12, "feeding");

  const modalData = {
    products: products.data?.results || [],
    preparation: preparationBlogs.data?.results || [],
    planning: planningBlogs.data?.results || [],
    pregnancy: pregnancyBlogs.data?.results || [],
    nutrition: nutritionBlogs.data?.results || [],
  };

  return (
    <html lang={locale}>
      <body className={`${ttFonts.variable}`}>
        <NextIntlClientProvider>
          <Header />

          <main className="mt-26">{children}</main>

          <Footer className="pb-40" />

          <Navbar />

          <StoreModal initialData={modalData} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
