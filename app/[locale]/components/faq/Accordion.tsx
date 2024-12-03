"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Төрлийг тодорхойлох
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
    <div className="flex flex-col items-start gap-3">
      {ArticleShow.map((item: FAQItem, index: number) => (
        <div
          key={index}
          className={`flex max-w-[874px] flex-col items-start bg-white border-b border-[rgba(238,238,238,0.93)] w-full`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex py-4 px-3 self-stretch items-start gap-10 text-[#333333] font-medium text-base sm:text-lg md:text-xl"
          >
            {item.title}
            <span className="ml-auto w-6 h-6">
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
              className="px-3 pb-4 self-stretch text-[#000000] opacity-[0.8] text-sm sm:text-base md:text-lg leading-snug"
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
