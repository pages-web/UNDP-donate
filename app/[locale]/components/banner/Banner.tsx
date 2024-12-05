"use client";

import Image from "../ui/image";
import classNames from "classnames";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

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

      setImageIndex((prevIndex) => nextImageIndex(prevIndex, bannerMn.length));

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
      {showBannerContent ? (
        <motion.div
          key="banner-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col justify-center items-center gap-3 sm:gap-4 py-4 sm:py-6 px-4 sm:px-6 md:px-8 rounded-3xl md:rounded-[24px] bg-[#3165AC] w-full aspect-[14/10] sm:aspect-[14/10] md:aspect-[16/7] max-h-[700px] overflow-hidden"
        >
          <motion.div
            variants={itemVariants}
            className="flex p-2 sm:p-2.5 md:p-3 rounded-[50px] sm:rounded-[80px] bg-[#FFCE46] justify-center items-center"
          >
            <h1 className="text-[#3165AC] text-center font-sfpro text-[14px] sm:text-[16px] md:text-[20px] font-medium leading-none">
              #GoSolar
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:gap-4 md:gap-6 items-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[#FFF] text-center font-roboto text-[24px] sm:text-[30px] md:text-[40px] lg:text-[45px] xl:text-[50px] font-bold leading-none"
            >
              Нараар халаадагсан бол
            </motion.h1>

            <motion.h1
              variants={itemVariants}
              className="text-[#FFF] text-center font-roboto text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium leading-normal"
            >
              {t("aaaaa")
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </motion.h1>

            <motion.div variants={itemVariants}>
              <Button
                onClick={handleContentToggle}
                className="bg-white rounded-[50px] sm:rounded-[100px] py-[6px] sm:py-[8px] md:py-[10px] px-[12px] sm:px-[16px] md:px-[20px] flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                {t("Хандивөгцгөөе")}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="banner-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center self-stretch w-full aspect-[14/10] sm:aspect-[14/6] md:aspect-[16/7] gap-2 sm:gap-2.5 rounded-2xl sm:rounded-3xl px-2 sm:px-2.5 relative overflow-hidden"
        >
          <motion.div
            key={`image-${imageIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              sizes="100vw"
              src={bannerMn[imageIndex].image.url}
              quality={100}
              priority
              alt="Background Banner"
              className="rounded-2xl sm:rounded-3xl object-cover md:object-center"
            />
          </motion.div>

          <motion.div
            animate={textControls}
            className="flex flex-col py-2 px-3 sm:py-3 sm:px-4 gap-1.5 sm:gap-2 lg:gap-[18px] items-center absolute bg-[rgba(0,_0,_0,_0.30)] rounded-2xl sm:rounded-3xl bottom-1 sm:bottom-2 md:bottom-6 lg:bottom-10 max-w-[90%]"
          >
            <div
              className="text-white text-center font-[SF Pro Display] text-[10px] sm:text-[12px] md:text-xs lg:text-sm xl:text-base max-w-[603px]"
              dangerouslySetInnerHTML={{
                __html:
                  bannerMn[imageIndex]?.content ||
                  "<p>No content available</p>",
              }}
            />

            {imageIndex !== 5 && (
              <Button
                onClick={handleImageTransition}
                disabled={isTransitioning}
                className={classNames(
                  "rounded-[50px] sm:rounded-[100px] px-2 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm lg:text-base flex items-center justify-center transition-colors",
                  isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/90",
                  imageIndex === 1
                    ? "bg-[#3165AC] text-white hover:bg-[#3165AC]"
                    : "bg-white text-black"
                )}
              >
                {isTransitioning
                  ? "Loading..."
                  : t(imageIndex === 1 ? "Donate more" : "Start Donate")}
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;
