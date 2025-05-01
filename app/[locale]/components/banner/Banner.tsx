"use client";

import Image from "../ui/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import React, { useState } from "react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = ({ bannerMn }: { bannerMn: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!Array.isArray(bannerMn) || bannerMn.length === 0) {
    return (
      <div className="flex items-center justify-center h-[674px] w-full bg-gray-200 rounded-3xl">
        <p className="text-gray-500">No banner data available</p>
      </div>
    );
  }

  const imageVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full aspect-[14/10] sm:aspect-[14/6] md:aspect-[16/7] rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        {bannerMn.map((banner, index) => (
          <SwiperSlide
            className="relative flex items-center justify-center overflow-hidden"
            key={index}
          >
            <motion.div
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Image
                sizes="100vw"
                src={banner.image.url}
                quality={100}
                priority
                alt={banner.title || "Banner image"}
                className="object-cover w-full h-full rounded-2xl sm:rounded-3xl"
                layout="fill"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70 rounded-2xl sm:rounded-3xl" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white z-20"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
        {activeIndex + 1} / {bannerMn.length}
      </div>
    </div>
  );
};

export default Banner;
