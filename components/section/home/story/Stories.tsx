import { useTranslations } from "next-intl";

import { Title, RegionSelect } from "@/components/custom";
import StorySlider from "./StorySlider";
import StoryMap from "./StoryMap";

import { cn } from "@/lib/utils";

import type { FeedbackApi } from "@/types";

type StoriesProps = {
  data:
    | FeedbackApi
    | {
        error: string | null;
      };
};

const Stories = ({ data }: StoriesProps) => {
  const t = useTranslations();

  if ("error" in data && data.error) {
    return (
      <div className={cn("container flex flex-col gap-5 md:gap-8")}>
        <Title className="w-fit max-w-max">{t("homePage.stories.title")}</Title>
        <p className="text-pink-main">{data.error}</p>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-5 md:gap-8">
      <div className="flex max-lg:flex-col lg:items-center justify-between gap-4">
        <div className="flex max-sm:flex-col sm:items-center gap-4 w-full md:w-[35rem] lg:w-1/2">
          <Title className="w-fit max-w-max">
            {t("homePage.stories.title")}
          </Title>
          <RegionSelect color="white" className="flex-1" />
        </div>
        <p className="w-full lg:w-2/5 text-sm md:text-base text-dark-blue-400">
          {t("homePage.stories.description")}
        </p>
      </div>

      <StorySlider data={data as FeedbackApi} />

      <StoryMap className="max-md:hidden max-w-[45rem] w-full mx-auto" />
    </div>
  );
};

export default Stories;
