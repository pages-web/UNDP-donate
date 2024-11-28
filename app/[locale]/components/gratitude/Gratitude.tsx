"use client";

import React from "react";
import { useTranslations } from "next-intl";
import MainLogo from "../svg/gratitude/MainLogo";
import { useParams } from "next/navigation";
const Gratitude = ({ gratitudeMn, gratitudeEn }: any) => {
  const { locale } = useParams();
  const ArticleShow = locale === "en" ? gratitudeEn : gratitudeMn;
  return (
    <div className="flex p-[42px] flex-col items-center justify-center gap-[18px] self-stretch rounded-3xl bg-[#fff]">
      <MainLogo />
      <h1 className="text-2xl text-[#000000] font-medium leading-normal">
        {ArticleShow[0]?.title}
      </h1>

      <div
        className="text-center text-[18px] font-normal text-[#000] font-sfpro max-w-[958px]"
        dangerouslySetInnerHTML={{
          __html: ArticleShow[0]?.content || "",
        }}
      />
    </div>
  );
};
export default Gratitude;
