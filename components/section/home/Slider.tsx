"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { CircleButton } from "@/components/custom";
import { LeftIcon, RightIcon } from "@/components/icons";

import { proxyImage } from "@/lib/proxyImage";

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
        observer
        observeParents
        spaceBetween={32}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="blue-bullets select-none"
      >
        {data.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <a href={item.link} className="block w-full">
              {/* Desktop Image */}
              <img
                src={proxyImage(item.image_large)}
                alt={`Slider ${index + 1}`}
                width={1261}
                height={388}
                className="hidden lg:block w-full h-full object-cover rounded-3xl"
              />

              {/* Mobile/Tablet Image */}
              <img
                src={proxyImage(item.image_medium)}
                alt={`Slider ${index + 1}`}
                width={728}
                height={310}
                className="block lg:hidden w-full h-full object-cover rounded-2xl md:rounded-3xl"
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
