"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "../ui/image";

interface CommentProps {
  CommentMn: Array<{
    image: { url: string };
    title: string;
    content: string;
    summary: string;
  }>;
}

const Comments = ({ CommentMn }: CommentProps) => {
  const t = useTranslations();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex justify-center mt-10">
      {CommentMn && CommentMn.length > 2 && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={20}
          initialSlide={1}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 2, spaceBetween: 25 },
          }}
          className="w-full xl:max-w-[670px] 2xl:max-w-[850px] mx-auto"
        >
          {CommentMn.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col bg-white rounded-[25px] overflow-hidden px-6 py-8 border border-[#F1672D] shadow-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  alt={`Partner logo ${index + 1}`}
                  width={50}
                  height={50}
                  src={item.image?.url || "/images/default-image.jpg"}
                  className="object-cover rounded-full"
                />

                <h1 className="font-bold text-[17px] text-[#333] leading-5 sm:text-[14px] md:text-[16px] lg:text-[15px] break-words">
                  {item?.title}
                </h1>
              </div>

              <div className="rounded-[20px] p-4 border-4 border-[#F1672D] mb-4 leading-[22px] font-light text-base text-black">
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              </div>

              <p className="text-xs text-gray-500">{item.summary}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Comments;
