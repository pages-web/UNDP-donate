"use client";

import { useTranslations } from "next-intl";
import Image from "../ui/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Banner = ({ bannerMn }: { bannerMn: any[] }) => {
  const t = useTranslations("");
  const [imageIndex, setImageIndex] = useState(0);
  const isValidData =
    bannerMn &&
    bannerMn.length > 0 &&
    bannerMn[imageIndex]?.image?.url &&
    bannerMn[imageIndex]?.content;

  const handleButtonClick = () => {
    if (isValidData) {
      setImageIndex((prevIndex) => (prevIndex + 1) % bannerMn.length);
    }
  };

  if (!isValidData) {
    return (
      <div className="flex items-center justify-center h-[674px] w-full bg-gray-200 rounded-3xl">
        <p className="text-gray-500">No banner data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center self-stretch h-[674px] w-full gap-2.5 rounded-3xl px-2.5 relative">
      <Image
        key={imageIndex}
        sizes="100vw"
        src={bannerMn[imageIndex].image.url}
        quality={100}
        priority
        alt="Background Banner"
        className="object-left md:object-center rounded-3xl w-full h-full"
      />
      <div className="flex flex-col py-3 px-4 gap-[18px] items-center absolute bg-[rgba(0,_0,_0,_0.30)] rounded-3xl bottom-10">
        <h1
          className="text-white text-center font-[SF Pro Display] text-base font-medium max-w-[603px]"
          dangerouslySetInnerHTML={{ __html: bannerMn[imageIndex].content }}
        />
        <Button
          onClick={handleButtonClick}
          className="bg-white rounded-[100px] py-[11px] px-[21px] flex items-center justify-center hover:bg-white"
        >
          Start donate
        </Button>
      </div>
    </div>
  );
};

export default Banner;
