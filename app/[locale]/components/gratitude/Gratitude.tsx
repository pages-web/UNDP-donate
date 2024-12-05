"use client";

import React from "react";
import { useTranslations } from "next-intl";
import MainLogo from "../svg/gratitude/MainLogo";
import { useParams } from "next/navigation";

const Gratitude = ({ gratitudeMn, gratitudeEn }: any) => {
  const { locale } = useParams();
  const ArticleShow = locale === "en" ? gratitudeEn : gratitudeMn;

  return (
    <div className="flex p-6 sm:p-8 md:p-10 lg:p-12 flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 self-stretch rounded-3xl bg-[#fff]">
      <MainLogo />
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#000000] font-medium leading-normal">
        {ArticleShow[0]?.title}
      </h1>

      <div
        className="text-center text-sm sm:text-base md:text-lg font-normal text-[#000] font-sfpro max-w-full sm:max-w-[958px] px-4 sm:px-6 md:px-8"
        dangerouslySetInnerHTML={{
          __html: ArticleShow[0]?.content || "",
        }}
      />
    </div>
  );
};

export default Gratitude;
