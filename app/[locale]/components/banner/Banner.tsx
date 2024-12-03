"use client";

import Image from "../ui/image";
import classNames from "classnames";
import React, { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const Banner = ({ bannerMn }: { bannerMn: any[] }) => {
  const t = useTranslations();
  const [imageIndex, setImageIndex] = useState(0);
  const [showBannerContent, setShowBannerContent] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const nextImageIndex = (currentIndex: number, length: number) =>
    (currentIndex + 1) % length;
  const contentVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const isValidData =
    bannerMn &&
    bannerMn.length > 0 &&
    bannerMn[imageIndex]?.image?.url &&
    bannerMn[imageIndex]?.content;

  const handleImageTransition = useCallback(() => {
    if (isValidData && !isTransitioning) {
      setTimeout(() => {
        setImageIndex((prevIndex) =>
          nextImageIndex(prevIndex, bannerMn.length)
        );
        setIsTransitioning(false);
      }, 500);
    }
  }, [isValidData, isTransitioning, bannerMn.length]);

  const handleContentToggle = useCallback(() => {
    if (isValidData) {
      setShowBannerContent(!showBannerContent);
    }
  }, [isValidData, showBannerContent]);

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
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col justify-center items-center gap-4 py-[20px] px-4 rounded-[24px] bg-[#3165AC] w-full h-[674px] relative"
        >
          <motion.div
            variants={contentVariants}
            className="flex p-2.5 rounded-[80px] bg-[#FFCE46] justify-center items-center"
          >
            <h1 className="text-[#3165AC] text-center font-sfpro text-[18px] font-medium leading-none">
              #GoSolar
            </h1>
          </motion.div>
          <motion.div
            variants={contentVariants}
            className="flex flex-col gap-6 items-center"
          >
            <h1 className="text-[#FFF] text-center font-roboto text-[50px] font-bold leading-none">
              Нараар халаагдсан бол
            </h1>

            <h1 className="text-[#FFF] text-center font-roboto text-[18px] font-medium leading-normal">
              {t("aaaaa")
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </h1>

            <motion.div variants={buttonVariants}>
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
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center justify-center self-stretch h-[674px] w-full gap-2.5 rounded-3xl px-2.5 relative"
        >
          <Image
            key={imageIndex}
            sizes="100vw"
            src={bannerMn[imageIndex].image.url}
            quality={100}
            priority
            alt="Background Banner"
            className="object-cover rounded-3xl w-full h-full"
          />
          <motion.div
            variants={{
              initial: { opacity: 0, y: 30, scale: 0.95 },
              animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  staggerChildren: 0.2,
                },
              },
              exit: {
                opacity: 0,
                y: -30,
                scale: 1.05,
                transition: { duration: 0.6, ease: "easeIn" },
              },
            }}
            className="flex flex-col py-3 px-4 gap-[18px] items-center absolute bg-[rgba(0,_0,_0,_0.30)] rounded-3xl bottom-10"
          >
            <motion.h1
              key={imageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.6, ease: "easeIn" },
              }}
              className="text-white text-center font-[SF Pro Display] text-base max-w-[603px]"
              dangerouslySetInnerHTML={{ __html: bannerMn[imageIndex].content }}
            />
            {imageIndex !== 5 && (
              <motion.div
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                  exit: {
                    opacity: 0,
                    scale: 1.1,
                    transition: { duration: 0.5, ease: "easeIn" },
                  },
                }}
              >
                <Button
                  onClick={handleImageTransition}
                  disabled={isTransitioning}
                  className={classNames(
                    "rounded-[100px] py-[11px] px-[21px] flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-50",
                    {
                      "bg-[#3165AC] text-white hover:bg-[3165AC] ":
                        imageIndex === 1,
                      "bg-white text-black": imageIndex !== 1,
                    }
                  )}
                >
                  {isTransitioning
                    ? "Loading..."
                    : imageIndex === 1
                    ? "Donate more"
                    : "Start Donate"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;
