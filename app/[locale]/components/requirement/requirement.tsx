"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Image from "../ui/image";
import { useParams } from "next/navigation";
import React from "react";
const Requirement = ({ articles, heregtseeEn }: any) => {
  const t = useTranslations("");
  const { locale } = useParams();
  const articlesToShow = locale === "en" ? heregtseeEn : articles;
  return (
    <div className="flex flex-col items-center">
      <Button className="text-white mb-6 lg:mb-10 text-lg lg:text-xl bg-[rgb(55,58,60)] font-semibold rounded-[15px] px-20 lg:px-32 py-4 lg:py-6 hover:bg-[rgb(55,58,60)]">
        {t("Хэрэгцээ")}
      </Button>

      <div className="flex flex-col items-center">
        <div
          dangerouslySetInnerHTML={{
            __html: articlesToShow[1]?.content,
          }}
          className="font-normal text-center text-gray-900 text-sm leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-lg [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
        />
        <div className="flex sm:flex-row items-center gap-1 sm:gap-2 md:gap-4 lg:gap-2 text-black border-2 sm:border-[3px] border-[#F1672D] p-2 sm:p-2 md:p-2 lg:p-2 mt-5">
          <p className="text-[10px] sm:text-base md:text-sm lg:text-base font-semibold text-center sm:text-left">
            {t("Монголзалуучуудын")}
            <span className="block">{t("ажилгүйдлийнтүвшин")}</span>
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            17%
          </h1>
          <Image
            alt="World Icon"
            width={40}
            height={40}
            src="/images/world.png"
            className="w-6 h-6 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10"
          />
          <Image
            className="rotate-[-90deg] w-6 h-6 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 object-contain"
            alt="Top Arrow"
            width={40}
            height={40}
            src="/images/topArrow.png"
          />
          <p className="text-[10px] sm:text-base md:text-sm lg:text-base font-semibold text-center sm:text-left">
            {t("Дэлхийн")}
            <span className="block">{t("дунджаасөндөр")} </span>
          </p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: articlesToShow[0]?.content || "",
          }}
          className="font-normal text-center text-gray-900 text-base leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-2xl [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
        />
      </div>
    </div>
  );
};
export default Requirement;
