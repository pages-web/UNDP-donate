"use client";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import Image from "../ui/image";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ articles }: { articles: any[] }) => {
  const swiperRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-2xl 2xl:max-w-4xl mx-auto mt-32 relative">
      {articles[1]?.content && (
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
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
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 25 },
          }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <Image
                alt={`Carousel Image ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full"
                src={article.image?.url || "/images/default-image.jpg"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-3 rounded-full bg-white hover:bg-gray-200 transition duration-300"
        onClick={() => swiperRef.current?.swiper.slideNext()} // Custom next button
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-[#F1672D]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l7-7-7-7M5 19l7-7-7-7"
          />
        </svg>
      </div>

      <div
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-3 rounded-full bg-white hover:bg-gray-200 transition duration-300"
        onClick={() => swiperRef.current?.swiper.slidePrev()} // Custom previous button
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-[#F1672D]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l-7 7 7 7M19 5l-7 7 7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Carousel;
