/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { SlidersApi } from "@/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { CircleButton } from "@/components/custom";
import { LeftIcon, RightIcon } from "@/components/icons";

type Props = { data: SlidersApi["results"] };

const Slider = ({ data }: Props) => {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      swiperRef.current?.update();
    }, 100);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative container">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".slider-swiper-next",
          prevEl: ".slider-swiper-prev",
        }}
        observer={true}
        observeParents={true}
        spaceBetween={32}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="blue-bullets select-none"
      >
        {data.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <a href={item.link} className="w-full">
              {/* TODO: change to Image component */}
              <img
                src={item.image_large}
                alt={`Slider-${index}`}
                width={1261}
                height={388}
                className="object-cover w-full h-full max-lg:hidden rounded-3xl"
                // priority
              />
              <img
                src={item.image_medium}
                alt={`Slider-${index}`}
                width={728}
                height={310}
                // priority
                className="object-cover w-full h-full lg:hidden rounded-2xl md:rounded-3xl"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <CircleButton
        className="slider-swiper-prev max-lg:!hidden absolute z-1 inset-center-y -left-6"
        color="white"
      >
        <LeftIcon />
      </CircleButton>
      <CircleButton
        className="slider-swiper-next max-lg:!hidden absolute z-1 inset-center-y -right-6"
        color="white"
      >
        <RightIcon />
      </CircleButton>
    </div>
  );
};

export default Slider;
