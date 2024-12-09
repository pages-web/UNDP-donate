"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "../ui/image";
import { useParams } from "next/navigation";

interface IArticle {
  _id?: string;
  image?: {
    url?: string | null;
  } | null;
}

interface ArticleContent {
  title?: string;
  content?: string;
}

interface CarouselProps {
  carousel: IArticle[];
  Сэргээгдэх: ArticleContent[];
  Positive: ArticleContent[];
}
const data = [
  {
    image1: "/image1.jpg",
  },
  {
    image1: "/image2.jpg",
  },
  {
    image1: "/image3.jpg",
  },
  {
    image1: "/image4.jpg",
  },
  {
    image1: "/image5.jpg",
  },
];
const Carousel: React.FC<CarouselProps> = ({ carousel }) => {
  const t = useTranslations();

  if (!carousel || carousel.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 p-6 rounded-3xl">
        {t("No content available")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 items-start bg-white rounded-3xl">
      <div className="relative w-full aspect-[1/1] sm:aspect-[3/1] overflow-hidden rounded-[24px]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          className="h-full w-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                sizes="100vw"
                src={item.image1}
                quality={100}
                priority
                className="w-full h-auto object-cover"
                alt={`Carousel image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-start gap-2">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-tight">
          {t("Сэргээгд")}
        </h1>
        <ul className="my-0  text-xs sm:text-base">
          <li className="my-0">{t("Орчныайжрах")}</li>
          <li className="my-0">{t("Угаартахулгүй")}</li>
          <li className="my-0">{t("Цэвэррчин")}</li>
          <li className="my-0">{t("Цахилга")}</li>
          <li className="my-0">{t("Хүлэмжиуурах")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
