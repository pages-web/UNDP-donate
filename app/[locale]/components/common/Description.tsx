"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import Image from "../ui/image";

const Description = ({ summary }: any) => {
  const t = useTranslations();

  const animation = {
    initial: { y: "100%" },
    enter: {
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-8 p-6 md:p-8 items-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center gap-2 sm:gap-4 text-center">
        <div ref={ref} className="overflow-hidden">
          <motion.h1
            className="text-xl md:text-4xl font-semibold text-gray-800"
            initial="initial"
            animate={inView ? "enter" : ""}
            variants={animation}
          >
            {t("hello")}
          </motion.h1>
        </div>
      </div>
      <div className="relative w-full max-h-[486px] aspect-square overflow-hidden rounded-[24px] shadow-md">
        <Image
          sizes="100vw"
          src="/image4.jpg"
          quality={100}
          priority
          className="w-full h-full object-cover"
          alt={`Carousel image ${summary + 1}`}
        />
      </div>
    </div>
  );
};

export default Description;
