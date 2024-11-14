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
import React from "react";
const Carousel = async ({ articles }: { articles: any[] }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-2xl 2xl:max-w-4xl mx-auto mt-32 relative">
      {articles[1]?.content && (
        <Swiper
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
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
          {articles.map((articles, index) => (
            <SwiperSlide key={index}>
              <Image
                alt={`Carousel Image ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full"
                src={articles.image?.url || "/images/default-image.jpg"}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next text-xl font-bold text-white bg-black p-2 rounded-full hover:bg-gray-700 transition-colors sm:p-1 sm:text-base"></div>
          <div className="swiper-button-prev text-xl font-bold text-white bg-black p-2 rounded-full hover:bg-gray-700 transition-colors sm:p-1 sm:text-base"></div>
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
