"use client";

import React from "react";
import AccordionDemo from "./Accordion";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Faq = ({ faqMn, faqEn }: any) => {
  const t = useTranslations();

  // Ensure the hook is used correctly
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });

  const animation = {
    initial: { y: "100%", opacity: 0 },
    enter: (i: number) => ({
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div className="flex flex-col px-4 md:px-6 py-6 md:py-[42px] gap-[50px] self-stretch justify-center items-center rounded-3xl bg-[#fff]">
      <motion.div
        initial="initial"
        animate={inView ? "enter" : ""}
        ref={ref}
        className="flex flex-col justify-center items-center gap-[15px]"
      >
        <motion.h1
          className="text-[#FFCE46] text-[14px] sm:text-[16px] lg:text-[18px] font-normal uppercase font-sfpro"
          custom={0}
          variants={animation}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {t("Questions")}
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-[15px] md:gap-[20px]">
          <motion.div
            className="flex p-3 items-center gap-2.5 rounded-[12px] bg-[#3165AC]"
            custom={1}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M13.625 16.875C13.625 17.0975 13.559 17.315 13.4354 17.5C13.3118 17.685 13.1361 17.8292 12.9305 17.9144C12.725 17.9995 12.4988 18.0218 12.2805 17.9784C12.0623 17.935 11.8618 17.8278 11.7045 17.6705C11.5472 17.5132 11.44 17.3127 11.3966 17.0945C11.3532 16.8762 11.3755 16.65 11.4606 16.4445C11.5458 16.2389 11.69 16.0632 11.875 15.9396C12.06 15.816 12.2775 15.75 12.5 15.75C12.7984 15.75 13.0845 15.8685 13.2955 16.0795C13.5065 16.2905 13.625 16.5766 13.625 16.875ZM12.5 6.75C10.4319 6.75 8.75 8.26406 8.75 10.125V10.5C8.75 10.6989 8.82902 10.8897 8.96967 11.0303C9.11033 11.171 9.30109 11.25 9.5 11.25C9.69892 11.25 9.88968 11.171 10.0303 11.0303C10.171 10.8897 10.25 10.6989 10.25 10.5V10.125C10.25 9.09375 11.2597 8.25 12.5 8.25C13.7403 8.25 14.75 9.09375 14.75 10.125C14.75 11.1562 13.7403 12 12.5 12C12.3011 12 12.1103 12.079 11.9697 12.2197C11.829 12.3603 11.75 12.5511 11.75 12.75V13.5C11.75 13.6989 11.829 13.8897 11.9697 14.0303C12.1103 14.171 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.171 13.0303 14.0303C13.171 13.8897 13.25 13.6989 13.25 13.5V13.4325C14.96 13.1184 16.25 11.7544 16.25 10.125C16.25 8.26406 14.5681 6.75 12.5 6.75ZM22.25 12C22.25 13.9284 21.6782 15.8134 20.6068 17.4168C19.5355 19.0202 18.0127 20.2699 16.2312 21.0078C14.4496 21.7458 12.4892 21.9389 10.5979 21.5627C8.70656 21.1865 6.96928 20.2579 5.60571 18.8943C4.24215 17.5307 3.31355 15.7934 2.93735 13.9021C2.56114 12.0108 2.75422 10.0504 3.49218 8.26884C4.23013 6.48726 5.47982 4.96451 7.08319 3.89317C8.68657 2.82183 10.5716 2.25 12.5 2.25C15.085 2.25273 17.5634 3.28084 19.3913 5.10872C21.2192 6.93661 22.2473 9.41498 22.25 12ZM20.75 12C20.75 10.3683 20.2661 8.77325 19.3596 7.41655C18.4531 6.05984 17.1646 5.00242 15.6571 4.37799C14.1497 3.75357 12.4909 3.59019 10.8905 3.90852C9.29017 4.22685 7.82016 5.01259 6.66637 6.16637C5.51259 7.32015 4.72685 8.79016 4.40853 10.3905C4.0902 11.9908 4.25358 13.6496 4.878 15.1571C5.50242 16.6646 6.55984 17.9531 7.91655 18.8596C9.27326 19.7661 10.8683 20.25 12.5 20.25C14.6873 20.2475 16.7843 19.3775 18.3309 17.8309C19.8775 16.2843 20.7475 14.1873 20.75 12Z"
                fill="white"
              />
            </svg>
          </motion.div>
          <motion.h1
            className="text-[#000] text-[20px] sm:text-[22px] lg:text-[32px] font-medium font-sfpro text-center"
            custom={2}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
          >
            {t("Түгээриулт")}
          </motion.h1>
        </div>
      </motion.div>
      <AccordionDemo faqMn={faqMn} faqEn={faqEn} />
      <motion.p
        className="text-[rgba(0,0,0,0.7)] text-[14px] sm:text-[17px] font-medium font-sfpro text-center"
        custom={3}
        variants={animation}
        initial="initial"
        animate={inView ? "enter" : ""}
      >
        Visit our
        <span className="text-[#000] text-[14px] sm:text-[17px] font-medium decoration-solid font-sfpro px-1">
          Help Center
        </span>
        for more Information.
      </motion.p>
    </motion.div>
  );
};

export default Faq;
