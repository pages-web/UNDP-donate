"use client";

import Image from "../ui/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import React from "react";
import { motion } from "framer-motion";
import "swiper/css";

const Banner = ({ bannerMn }: { bannerMn: any[] }) => {
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
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <Swiper
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      modules={[Autoplay]}
      slidesPerView={1}
      loop
      className="flex flex-col items-center justify-center w-full aspect-[14/10] sm:aspect-[14/6] md:aspect-[16/7] gap-2 sm:gap-2.5 rounded-2xl sm:rounded-3xl px-2 sm:px-2.5 relative overflow-hidden"
    >
      {bannerMn.map((banner, index) => (
        <SwiperSlide
          className="flex flex-col items-center justify-center relative"
          key={index}
        >
          <motion.div
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              sizes="100vw"
              src={banner.image.url}
              quality={100}
              priority
              alt="Background Banner"
              className="rounded-2xl sm:rounded-3xl object-cover md:object-center"
            />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
