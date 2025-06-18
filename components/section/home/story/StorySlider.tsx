"use client";

import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { useRegionStore } from "@/stores/region";

import type { FeedbackApi, Story } from "@/types";
import { proxyImage } from "@/lib/proxyImage";

type StorySliderProps = {
  data: FeedbackApi;
};

const StorySlider = ({ data }: StorySliderProps) => {
  const region = useRegionStore((state) => state.region);

  if (region === null) return null;

  const stories: Story[] = data[region] || [];

  return (
    <AnimatePresence>
      {stories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            className="blue-bullets select-none"
          >
            {stories.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`} className="!w-fit">
                <button
                  type="button"
                  className="size-20 md:size-32 lg:size-40 shrink-0 p-0.5 rounded-full border-2 border-blue-main"
                >
                  <div className="relative size-full rounded-full overflow-hidden">
                    <img
                      src={proxyImage(item.thumbnail)}
                      alt={`Story image - ${item.id}`}
                      width={160}
                      height={160}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StorySlider;
