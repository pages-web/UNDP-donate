"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "../ui/image";

interface IArticle {
  _id?: string;
  image?: {
    url?: string | null;
  } | null;
}

interface CarouselProps {
  carousel: IArticle[];
}

const Carousel: React.FC<CarouselProps> = ({ carousel }) => {
  const t = useTranslations();

  if (!carousel || carousel.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500">
        {t("No content available")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 items-start  bg-white min-h-screen rounded-3xl">
      <div className="relative w-full aspect-square md:aspect-[3/1] overflow-hidden rounded-[24px]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          className="h-full w-full "
        >
          {carousel.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <Image
                sizes="200vw"
                src={item.image?.url || "/images/default-image.jpg"}
                quality={100}
                priority
                className=""
                alt={`Carousel image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-xl font-semibold text-gray-800">{t("Сэргээгд")}</h1>
        <ul className="text-gray-700 list-disc pl-6 space-y-1">
          <li>{t("Орчныайжрах")}</li>
          <li>{t("Угаартахулгүй")}</li>
          <li>{t("Цэвэррчин")}</li>
          <li>{t("Цахилга")}</li>
          <li>{t("Хүлэмжиуурах")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
