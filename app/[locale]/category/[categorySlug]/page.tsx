import { Suspense } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import {
  Hero,
  Pinned,
  VideoBlogs,
  BlogsSection,
  BlogsSkeleton,
} from "@/components/section/category";
import { ToolsSection } from "@/components/tools/Section";
import { ToolsSkeleton } from "@/components/skeleton";

import { categories } from "@/schemas";
import type { BlogCategory } from "@/types";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    locale: string;
    categorySlug: BlogCategory;
  }>;
}) {
  const { categorySlug } = await params;

  if (categories.includes(categorySlug) === false) {
    notFound();
  }

  return (
    <>
      <Hero category={categorySlug} />

      {/* Tools */}
      <Suspense fallback={<ToolsSkeleton />}>
        <ToolsSection />
      </Suspense>

      {/* Pinned Articles */}
      <Suspense fallback={<div>Loading Pinned Articles...</div>}>
        <Pinned category={categorySlug} />
      </Suspense>

      {/* First Blogs Section */}
      <Suspense fallback={<BlogsSkeleton className="mb-20" />}>
        <BlogsSection
          category={categorySlug}
          isFirstSection
          className="mb-20"
        />
      </Suspense>

      {/* Video Articles */}
      <Suspense>
        <VideoBlogs category={categorySlug} className="mb-20" />
      </Suspense>

      {/* Second Blogs Section */}
      <Suspense fallback={<BlogsSkeleton className="mt-4 mb-20" />}>
        <BlogsSection category={categorySlug} className="mt-4 mb-20" />
      </Suspense>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
    categorySlug: BlogCategory;
  }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const t = await getTranslations();

  if (categories.includes(categorySlug) === false) {
    return {};
  }

  return {
    title: t(`categories.${categorySlug}`),
    description: t(`categories.${categorySlug}Description`),
    openGraph: {
      title: t(`categories.${categorySlug}`),
      description: t(`categories.${categorySlug}Description`),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      categorySlug: category,
    }))
  );
}
