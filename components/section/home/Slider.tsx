"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { CircleButton } from "@/components/custom";
import { LeftIcon, RightIcon } from "@/components/icons";

import type { Swiper as SwiperClass } from "swiper/types";
import type { Slider as SliderType } from "@/types";

type Props = { data: SliderType[] };

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
              <Image
                src={item.image_large}
                alt={`Slider-${index}`}
                width={1261}
                height={388}
                className="object-cover w-full h-full max-lg:hidden rounded-3xl"
                priority
              />
              <Image
                src={item.image_medium}
                alt={`Slider-${index}`}
                width={728}
                height={310}
                priority
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
