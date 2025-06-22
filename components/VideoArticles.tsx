"use client";

import { useTranslations } from "next-intl";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import VideoArticleCard from "@/components/cards/VideoArticleCard";
import { Title } from "@/components/custom";

import type { Blog } from "@/types";

type Props = {
  data: Blog[];
};
const VideoArticles = ({ data }: Props) => {
  const t = useTranslations();
  return (
    <div className="container space-y-8 text-white">
      <Title className="text-white">{t("videoArticles")}</Title>

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".tools-swiper-button-next",
          prevEl: ".tools-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
        }}
        className="white-bullets"
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={`${index} - ${item.id}`}
            className="!w-[9rem] md:!w-[12rem] aspect-[9/16] flex"
          >
            <VideoArticleCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoArticles;
