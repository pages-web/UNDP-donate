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
        duration: 0.6,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.6,
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

      // Animate out current content
      await Promise.all([
        imageControls.start({
          opacity: 0,
          scale: 1.1,
          transition: { duration: 0.4 },
        }),
        textControls.start({
          opacity: 0,
          y: -20,
          transition: { duration: 0.4 },
        }),
      ]);

      // Update index
      setImageIndex((prevIndex) => nextImageIndex(prevIndex, bannerMn.length));

      // Animate in new content
      await Promise.all([
        imageControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, delay: 0.2 },
        }),
        textControls.start({
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
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
          className="flex flex-col justify-center items-center gap-4 py-[20px] px-4 rounded-[24px] bg-[#3165AC] w-full h-[674px] relative overflow-hidden"
        >
          <motion.div
            variants={itemVariants}
            className="flex p-2.5 rounded-[80px] bg-[#FFCE46] justify-center items-center"
          >
            <h1 className="text-[#3165AC] text-center font-sfpro text-[18px] font-medium leading-none">
              #GoSolar
            </h1>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 items-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[#FFF] text-center font-roboto text-[50px] font-bold leading-none"
            >
              Нараар халаагдсан бол
            </motion.h1>

            <motion.h1
              variants={itemVariants}
              className="text-[#FFF] text-center font-roboto text-[18px] font-medium leading-normal"
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
                className="bg-white rounded-[100px] py-[11px] px-[21px] flex items-center justify-center hover:bg-white/90 transition-colors"
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
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center self-stretch h-[674px] w-full gap-2.5 rounded-3xl px-2.5 relative overflow-hidden"
        >
          <motion.div
            key={`image-${imageIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              sizes="100vw"
              src={bannerMn[imageIndex].image.url}
              quality={100}
              priority
              alt="Background Banner"
              className="object-cover rounded-3xl w-full h-full"
            />
          </motion.div>

          <motion.div
            animate={textControls}
            className="flex flex-col py-3 px-4 gap-[18px] items-center absolute bg-[rgba(0,_0,_0,_0.30)] rounded-3xl bottom-10"
          >
            <div
              className="text-white text-center font-[SF Pro Display] text-base max-w-[603px]"
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
                  "rounded-[100px] py-[11px] px-[21px] flex items-center justify-center transition-colors",
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
