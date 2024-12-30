"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  { image1: "/image1.jpg" },
  { image1: "/image2.jpg" },
  { image1: "/image3.jpg" },
  { image1: "/image4.jpg" },
  { image1: "/image5.jpg" },
];

const Carousel: React.FC<CarouselProps> = ({ carousel }) => {
  const t = useTranslations();

  const phrases = [
    t("Орчныайжрах"),
    t("Угаартахулгүй"),
    t("Цэвэррчин"),
    t("Цахилга"),
    t("Хүлэмжиуурах"),
  ];

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: i * 0.075,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  if (!carousel || carousel.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 p-6 rounded-3xl">
        {t("No content available")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 items-start bg-white rounded-3xl shadow-lg">
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
                src={item.image1}
                alt={`Carousel image ${index + 1}`}
                quality={100}
                priority={index === 0} // Prioritize the first image
                sizes="(max-width: 640px) 100vw, 50vw" // Responsive image sizing
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        ref={ref}
        className="flex flex-col items-start gap-2 overflow-hidden"
      >
        <motion.h1
          className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-tight overflow-hidden"
          custom={0}
          variants={animation}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {t("Сэргээгд")}
        </motion.h1>

        <div className="text-xs sm:text-base">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="flex overflow-hidden items-center gap-2"
            >
              <motion.span
                variants={animation}
                initial="initial"
                animate={inView ? "enter" : ""}
                className="w-[6px] h-[6px] bg-black rounded-full inline-block"
              ></motion.span>
              <motion.p
                className="my-0 font-normal"
                custom={index}
                variants={animation}
                initial="initial"
                animate={inView ? "enter" : ""}
              >
                {phrase}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
