"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Define the type for FAQ items
interface FAQItem {
  title: string;
  content: string;
}

const AccordionDemo = ({
  faqMn,
  faqEn,
}: {
  faqMn: FAQItem[];
  faqEn: FAQItem[];
}) => {
  const { locale } = useParams();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ArticleShow = locale === "en" ? faqEn : faqMn;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-7">
      {ArticleShow.map((item: FAQItem, index: number) => (
        <div
          key={index}
          className={`flex sm:max-w-[874px] flex-col items-start bg-white border-b border-[rgba(238,238,238,0.93)] w-full`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex px-3 py-3 sm:py-4 sm:px-4 self-stretch items-start gap-4 sm:gap-6 md:gap-8 text-[#333333] font-semibold text-sm sm:text-lg md:text-xl"
          >
            <span className="text-[11px] sm:text-[18px] md:text-[20px]">
              {item.title}
            </span>
            <span className="ml-auto text-[20px]">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0,
              height: activeIndex === index ? "auto" : 0,
            }}
            transition={{
              opacity: {
                duration: 0.3,
                ease: [0.68, -0.55, 0.27, 1.55],
              },
              height: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-5 sm:px-5 sm:pb-6 md:px-6 md:pb-7 self-stretch text-[#000000] opacity-[0.8] text-xs sm:text-base md:text-lg leading-snug"
              dangerouslySetInnerHTML={{
                __html: item?.content || "",
              }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AccordionDemo;
