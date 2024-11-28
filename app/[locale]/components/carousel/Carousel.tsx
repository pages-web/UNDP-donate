"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // To detect hover state

  // Change slide on interval, unless the carousel is hovered
  useEffect(() => {
    if (!carousel || carousel.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) =>
          prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [carousel, isHovered]);

  // Function to handle manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carousel.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 items-start rounded-3xl bg-white min-h-screen">
      <div
        className="relative w-full aspect-square md:aspect-[27/9] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {carousel.map(
            (item, index) =>
              index === currentIndex && (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute w-full h-full"
                >
                  <Image
                    sizes="100vw"
                    src={item.image?.url || "/images/default-image.jpg"}
                    quality={100}
                    priority
                    className="w-full h-full object-cover rounded-[24px]"
                    alt={`Carousel Image ${index + 1}`}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-start gap-3">
        <h1 className="text-xl font-semibold text-gray-800">{t("Сэргээгд")}</h1>
        <div className="text-gray-700">
          <ul className="list-disc pl-6 space-y-[2px]">
            <li>{t("Орчныайжрах")}</li>
            <li>{t("Угаартахулгүй")}</li>
            <li>{t("Цэвэррчин")}</li>
            <li>{t("Цахилга")}</li>
            <li>{t("Хүлэмжиуурах")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
