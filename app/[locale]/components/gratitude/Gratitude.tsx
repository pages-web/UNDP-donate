"use client";
import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import MainLogo from "../svg/gratitude/MainLogo";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

const Gratitude = ({ gratitudeMn, gratitudeEn }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  const animation = {
    initial: { y: "100%", opacity: 0 },
    enter: (i: number) => ({
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: i * 0.1,
      },
    }),
  };
  const { locale } = useParams();
  const ArticleShow = locale === "en" ? gratitudeEn : gratitudeMn;

  return (
    <motion.div
      initial="initial"
      animate={inView ? "enter" : ""}
      ref={ref}
      className="flex p-6 sm:p-8 md:p-10 lg:p-12 flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 self-stretch rounded-3xl bg-[#fff]"
    >
      <MainLogo />
      <motion.h1
        variants={animation}
        className="text-xl sm:text-2xl md:text-3xl text-[#000000] font-medium leading-normal"
      >
        {ArticleShow[0]?.title}
      </motion.h1>

      <motion.div
        variants={animation}
        className="text-center text-sm sm:text-base md:text-lg font-normal text-[#000] font-sfpro max-w-full sm:max-w-[958px] px-4 sm:px-6 md:px-8"
        dangerouslySetInnerHTML={{
          __html: ArticleShow[0]?.content || "",
        }}
      />
    </motion.div>
  );
};

export default Gratitude;
