import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getSlugPage } from "@/app/apiCalls";

import Content from "@/components/section/slug/Content";

import { routing } from "@/i18n/routing";
import htmlToPlainText from "@/utility/htmlToPlainText";

export default async function SlugPage({
  params,
}: {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}) {
  const { locale, slug } = await params;

  const { data, error } = await getSlugPage(locale, slug);

  if (error || !data) {
    notFound();
  }

  return (
    <>
      <section
        className="relative py-20"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
        }}
      >
        <div className="absolute inset-0 bg-[#005fdfe0] mix-blend-multiply" />

        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
          <div
            className="detail-content !text-white mt-6 md:mt-8"
            dangerouslySetInnerHTML={{ __html: data.short_content }}
          />
        </div>
      </section>

      <section className="container py-20">
        <Content data={data.content} />
      </section>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const { data, error } = await getSlugPage(locale, slug);

  if (error || !data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
    };
  } else {
    return {
      title: data.title,
      description: htmlToPlainText(data.short_content),
      openGraph: {
        title: data.title,
        description: htmlToPlainText(data.short_content),
        images: [
          {
            url: data.image,
            alt: data.title,
          },
        ],
      },
    };
  }
}

export function generateStaticParams() {
  const locales = routing.locales;
  const slugs = ["about", "privacy-policy"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}
