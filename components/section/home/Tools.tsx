"use client";

import { ToolChild } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ToolCard from "@/components/cards/ToolCard";

type Props = {
  data: ToolChild[];
};
const Tools = ({ data }: Props) => {
  return (
    <div className="container relative">
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
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="!w-[11rem] !h-[unset] flex">
            <ToolCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Tools;
