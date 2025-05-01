"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "../ui/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const phrases = [
    t("Орчныайжрах"),
    t("Угаартахулгүй"),
    t("Цэвэррчин"),
    t("Цахилга"),
    t("Хүлэмжиуурах"),
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const textAnimation = {
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

  const dotAnimation = {
    initial: { scale: 1 },
    active: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  if (!carousel || carousel.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 p-6 rounded-3xl">
        {t("No content available")}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6 p-6 md:p-8 items-start bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="relative w-full aspect-[1/1] sm:aspect-[3/1] overflow-hidden rounded-[24px]">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{
                  scale: activeIndex === index ? 1 : 1.1,
                  opacity: activeIndex === index ? 1 : 0.8,
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative h-full w-full overflow-hidden rounded-[20px]"
              >
                <Image
                  src={item.image1}
                  alt={`Carousel image ${index + 1}`}
                  quality={100}
                  priority={index === 0}
                  layout="fi"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50" />

                <div className="absolute bottom-4 right-4 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                  {index + 1} / {data.length}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {data.map((_, index) => (
            <motion.div
              key={index}
              variants={dotAnimation}
              initial="initial"
              animate={activeIndex === index ? "active" : "initial"}
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="flex flex-col items-start gap-4 overflow-hidden w-full"
      >
        <motion.div
          variants={textAnimation}
          initial="initial"
          animate={inView ? "enter" : ""}
          custom={0}
          className="overflow-hidden"
        >
          <motion.h1
            className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-tight"
            variants={textAnimation}
            initial="initial"
            animate={inView ? "enter" : ""}
            custom={0}
          >
            {t("Сэргээгд")}
          </motion.h1>
        </motion.div>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-xs sm:text-base space-y-2 w-full"
        >
          {phrases.map((phrase, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="flex items-center gap-3 overflow-visible"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                  delay: index * 0.1 + 0.5,
                }}
                className="flex items-center justify-center"
              >
                <span className="w-[6px] h-[6px] bg-black rounded-full inline-block" />
              </motion.div>

              <motion.div className="overflow-hidden">
                <motion.p className="my-0 font-normal">{phrase}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Carousel;
