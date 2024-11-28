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
    </div>
  );
};

export default Banner;
