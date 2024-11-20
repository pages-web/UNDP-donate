"use client";

import { useTranslations } from "next-intl";
import Image from "../ui/image";
import React from "react";
const Banner = ({ bannerArticles }: any) => {
  const t = useTranslations("");
  return (
    <div className="relative w-full aspect-[14/6] md:aspect-[16/7] max-h-[700px]">
      <Image
        sizes="100vw"
        src={bannerArticles[2]?.image?.url}
        quality={100}
        priority
        alt="Background Banner"
        className="object-left md:object-center"
      />

      <Image
        src="/images/banner1.png"
        alt="Floating Image 1"
        width={100}
        height={100}
        className="absolute w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-[80px] lg:h-[80px] top-[10%] sm:top-[15%] md:top-[19%] lg:top-[25%] left-4 sm:left-8 md:left-24 lg:left-32 xl:left-40 2xl:left-36 object-cover"
      />

      <Image
        src="/images/banner2.png"
        alt="Floating Image 2"
        width={140}
        height={140}
        className="absolute top-[28%] w-7 h-4 sm:w-9 sm:h-4 md:w-20 md:h-10 lg:w-[75px] lg:h-[40px] xl:w-[100px] xl:h-[50px] 2xl:w-[120px] 2xl:h-[60px]  sm:top-[34%] md:top-[37%] lg:top-[47%] left-[23%] sm:left-[145px] md:left-[270px] lg:left-[390px] xl:left-[450px] 2xl:left-[475px] object-cover"
      />

      <div
        className="font-bold text-1xl sm:text-2xl md:text-[35px] lg:text-[55px] xl:text-[65px] 2xl:text-[80px] text-[rgb(63,126,68)] absolute top-[15%] sm:top-[22%] md:top-[25%] lg:top-[35%] left-6 sm:left-12 md:left-32 lg:left-40 xl:left-48 2xl:left-40"
        dangerouslySetInnerHTML={{
          __html: bannerArticles[1]?.content || "",
        }}
      />

      <div
        className="font-bold text-1xl sm:text-2xl md:text-[35px] lg:text-[55px] xl:text-[65px] 2xl:text-[80px] text-[rgb(241,105,38)] absolute top-[25%] sm:top-[30%] md:top-[37%] lg:top-[47%] left-6 sm:left-12 md:left-32 lg:left-40 xl:left-48 2xl:left-40"
        dangerouslySetInnerHTML={{
          __html: bannerArticles[0]?.content || "",
        }}
      />

      <h1 className="font-semibold text-[7px] sm:text-[10px] md:text-sm lg:text-base xl:text-1xl 2xl:text-1xl text-[rgb(63,126,68)] absolute top-[37%] sm:top-[40%] md:top-[50%] lg:top-[57%] left-6 sm:left-12 md:left-32 lg:left-40 xl:left-48 2xl:left-40">
        {t("bannerText")}
      </h1>
    </div>
  );
};

export default Banner;
