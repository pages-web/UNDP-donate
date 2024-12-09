"use client";

import Image from "../ui/image";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "swiper/css";

const Banner = ({ bannerMn }: { bannerMn: any[] }) => {
  const t = useTranslations();
  const [imageIndex, setImageIndex] = useState(0);
  const [showBannerContent, setShowBannerContent] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageControls = useAnimation();
  const textControls = useAnimation();

  const nextImageIndex = (currentIndex: number, length: number) =>
    (currentIndex + 1) % length;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delayChildren: 0.15,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  const isValidData =
    Array.isArray(bannerMn) &&
    bannerMn.length > 0 &&
    bannerMn[imageIndex]?.image?.url &&
    bannerMn[imageIndex]?.content;

  const handleImageTransition = useCallback(async () => {
    if (isValidData && !isTransitioning) {
      setIsTransitioning(true);

      // Hide the image and text
      await Promise.all([
        imageControls.start({
          opacity: 0,
          scale: 1.1,
          transition: { duration: 0.3 },
        }),
        textControls.start({
          opacity: 0,
          y: -20,
          transition: { duration: 0.3 },
        }),
      ]);

      // Update the image index to next
      setImageIndex((prevIndex) => nextImageIndex(prevIndex, bannerMn.length));

      // Show the new image and text
      await Promise.all([
        imageControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, delay: 0.1 },
        }),
        textControls.start({
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          },
        }),
      ]);

      setIsTransitioning(false);
    }
  }, [
    isValidData,
    isTransitioning,
    bannerMn.length,
    imageControls,
    textControls,
  ]);

  const handleContentToggle = useCallback(() => {
    if (isValidData) {
      setShowBannerContent(!showBannerContent);
    }
  }, [isValidData, showBannerContent]);

  useEffect(() => {
    return () => imageControls.stop();
  }, [imageControls]);

  if (!isValidData) {
    return (
      <div className="flex items-center justify-center h-[674px] w-full bg-gray-200 rounded-3xl">
        <p className="text-gray-500">No banner data available</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Swiper
        key="banner-swiper"
        autoplay={{ delay: 2500 }}
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        className="flex flex-col items-center justify-center self-stretch w-full inset-0 aspect-[14/10] sm:aspect-[14/6] md:aspect-[16/7] gap-2 sm:gap-2.5 rounded-2xl sm:rounded-3xl px-2 sm:px-2.5 relative overflow-hidden"
      >
        {bannerMn.map((banner, index) => (
          <SwiperSlide
            className="flex flex-col items-center justify-center relative"
            key={index}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                sizes="100vw"
                src={banner.image.url}
                quality={100}
                priority
                alt="Background Banner"
                className="rounded-2xl sm:rounded-3xl object-cover md:object-center "
              />
            </motion.div>
            <div className="flex items-center justify-center ">
              <div className="flex flex-col py-2 px-3 sm:py-3 sm:px-4 gap-1.5 sm:gap-2 lg:gap-[18px] items-center justify-center absolute bg-[rgba(0,_0,_0,_0.30)] rounded-2xl sm:rounded-3xl bottom-2 sm:bottom-2 md:bottom-6 lg:bottom-10 ">
                <div
                  className="text-white text-center font-[SF Pro Display] text-[10px] sm:text-[12px] md:text-xs lg:text-sm xl:text-base max-w-[595px] "
                  dangerouslySetInnerHTML={{
                    __html: banner.content || "<p>No content available</p>",
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </AnimatePresence>
  );
};

export default Banner;
