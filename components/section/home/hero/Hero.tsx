import { getTranslations } from "next-intl/server";

import HeroAnimation from "./HeroAnimation";
import HeroImage from "./HeroImage";
import HeroBtn from "./HeroBtn";

import type { HappyFamiliesApi } from "@/types";

const Hero = async ({ data }: { data: HappyFamiliesApi | null }) => {
  const t = await getTranslations();

  const count = data?.results[0].results_count || 0;

  const title = t("homePage.hero.title", {
    span: `<span class="text-pink-main">${t("homePage.hero.span")}</span>`,
  });

  return (
    <section
      className="-mt-18 md:-mt-22 w-full relative pt-28 lg:pt-40"
      style={{
        background: "var(--color-linear)",
      }}
    >
      <div className="container flex max-lg:flex-col gap-4">
        <div className="flex flex-col gap-8">
          <HeroAnimation count={count} />

          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="max-lg:text-center font-bold text-[2.25rem] leading-[2.625rem] lg:text-[3.5rem] lg:leading-[3.75rem] text-blue-main"
          />

          <HeroBtn />
        </div>

        <div className="mt-4">
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
