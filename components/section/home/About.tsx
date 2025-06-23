import { Button } from "@/components/custom";
import { getTranslations } from "next-intl/server";
import { proxyImage } from "@/lib/proxyImage";

const About = async () => {
  const t = await getTranslations("home.about");
  return (
    <div className="container bg-blue-main rounded-3xl p-5 md:p-10 !pb-0 md:!pr-0 flex max-md:flex-col">
      <div className="flex-1 max-md:text-center text-white pb-5 md:pb-10">
        <h2 className="text-[2rem] leading-[2.5rem] md:text-[2.25rem] md:leading-[2.625rem] font-bold">
          {t("title")}
        </h2>

        <p
          dangerouslySetInnerHTML={{
            __html: t("description"),
          }}
          className="mt-4 mb-8 text-base md:text-lg line-clamp-6"
        />

        <Button href="/about" color="white" linkIcon className="max-md:w-full">
          {t("btn")}
        </Button>
      </div>
      <div className="w-full md:w-3/5 flex items-end md:-ml-12">
        <div className="relative w-full aspect-[706/386]">
          <img
            src={proxyImage("/about-image-min.svg")}
            alt="About Image"
            className="object-contain w-full rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
