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
