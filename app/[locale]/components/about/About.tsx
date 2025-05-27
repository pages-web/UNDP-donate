"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import AnimatedCounter from "../common/AnimatedCounter";
import { useTotalAmount } from "@/sdk/queries/order";
import AboutIcon from "../svg/AbuoutIcon";
import Modal from "../modal/Modal";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = ({ aboutMn, aboutEn }: any) => {
  const locale = useLocale();
  const articleShow = locale === "mn" ? aboutMn : aboutEn;
  const { sda } = useTotalAmount();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const t = useTranslations();

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

  useEffect(() => {
    if (sda && sda.amounts && sda.amounts[0]) {
      const fakeAmount = 61480261;
      setTotalAmount(sda.amounts[0].totalAmount + fakeAmount);
    }
  }, [sda]);

  return (
    <motion.div
      className="flex flex-col items-start gap-10 self-stretch  p-6 md:p-8 rounded-3xl bg-[#fff]"
      ref={ref}
      initial="initial"
      animate={inView ? "enter" : ""}
    >
      <motion.div
        className="flex flex-col gap-3 self-stretch items-start"
        initial="initial"
        animate={inView ? "enter" : ""}
      >
        <motion.h1
          className="text-[#FFCE46] text-[14px] font-normal leading-none uppercase"
          custom={0}
          variants={animation}
        >
          About Project
        </motion.h1>
        <div className="flex items-center gap-3">
          <div className="flex p-3 items-center gap-2.5 rounded-[12px] bg-[#3165AC]">
            <AboutIcon />
          </div>
          <motion.h1
            className="text-black text-[20px] sm:text-[24px] font-semibold leading-none"
            custom={1}
            variants={animation}
          >
            {articleShow[0]?.title}
          </motion.h1>
        </div>

        <motion.div
          className="text-black text-sm sm:text-base font-medium leading-normal self-stretch text-start"
          custom={2}
          variants={animation}
          dangerouslySetInnerHTML={{
            __html: articleShow[0]?.content || "",
          }}
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-2.5 items-start"
        custom={3}
        variants={animation}
      >
        <div className="xl:grid xl:grid-cols-2 lg:gap-6 lg:w-full 2xl:w-[1300px] xl:w-[1100px] :grid-cols-1">
          <motion.div
            className="flex flex-col items-start gap-3"
            custom={4}
            variants={animation}
          >
            <motion.h1
              className="text-[rgba(0,0,0,0.8)] font-[SF Pro Display] text-[16px] font-normal leading-normal"
              custom={5}
              variants={animation}
            >
              {t("Цугласанүн")}
            </motion.h1>
            <div className="flex flex-col items-start flex-shrink-0">
              <div className="flex px-[4px] justify-end items-start flex-[1_0_0] self-stretch">
                {totalAmount ? (
                  <AnimatedCounter
                    stepValues={[0, totalAmount]}
                    duration={6}
                    prefix=""
                    suffix="₮"
                    color="#FFCE46"
                    fontSize="80px"
                  />
                ) : (
                  <span>Loading...</span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-start gap-3 mt-5 lg:mt-0"
            custom={6}
            variants={animation}
          >
            <motion.h1
              className="text-[rgba(0,0,0,0.8)] font-[SF Pro Display] text-[16px] font-normal leading-normal"
              custom={7}
              variants={animation}
            >
              {t("Зорилтотүн")}
            </motion.h1>
            <div className="flex flex-col items-start flex-shrink-0">
              <div className="flex px-[4px] justify-end items-start flex-[1_0_0] self-stretch">
                <AnimatedCounter
                  stepValues={[
                    0, 200000, 300000, 400000, 600000, 800000, 1100000,
                    170000000, 200000000,
                  ]}
                  duration={6}
                  prefix=""
                  suffix="₮"
                  color="#FFCE46"
                  fontSize="80px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* <Modal /> */}
    </motion.div>
  );
};

export default About;
