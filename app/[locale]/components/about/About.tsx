"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import AnimatedCounter from "../common/AnimatedCounter";
import { useTotalAmount } from "@/sdk/queries/order";
import AboutIcon from "../svg/AbuoutIcon";
import Modal from "../modal/Modal";

const About = ({ aboutMn, aboutEn }: any) => {
  const locale = useLocale();
  const articleShow = locale === "en" ? aboutEn : aboutMn;
  const { sda } = useTotalAmount();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const t = useTranslations();

  useEffect(() => {
    if (sda && sda.amounts && sda.amounts[0]) {
      setTotalAmount(sda.amounts[0].totalAmount);
    }
  }, [sda]);

  return (
    <div className="flex flex-col items-start gap-10 self-stretch  p-6 md:p-8 rounded-3xl bg-[#fff]">
      <div className="flex flex-col gap-3 self-stretch items-start">
        <h1 className="text-[#FFCE46]  text-[14px] font-normal leading-none uppercase">
          About Project
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex p-3 items-center gap-2.5 rounded-[12px] bg-[#3165AC]">
            <AboutIcon />
          </div>
          <h1 className="text-black  text-[20px] sm:text-[24px] font-semibold leading-none">
            {articleShow[0]?.title}
          </h1>
        </div>

        <div
          className="text-black  text-sm sm:text-base font-medium leading-normal self-stretch text-start"
          dangerouslySetInnerHTML={{
            __html: articleShow[0]?.content || "",
          }}
        />
      </div>
      <div className="flex flex-col gap-2.5 items-start">
        <div className="xl:grid xl:grid-cols-2 lg:gap-6 lg:w-full 2xl:w-[1300px] xl:w-[1100px] :grid-cols-1">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-[rgba(0,0,0,0.8)] font-[SF Pro Display] text-[16px] font-normal leading-normal">
              {t("Цугласанүн")}
            </h1>
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
          </div>
          <div className="flex flex-col items-start gap-3 mt-5 lg:mt-0">
            <h1 className="text-[rgba(0,0,0,0.8)] font-[SF Pro Display] text-[16px] font-normal leading-normal">
              {t("Зорилтотүн")}
            </h1>
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
          </div>
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default About;
