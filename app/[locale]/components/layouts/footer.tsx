"use client";

import { useTranslations } from "next-intl";
import FacebookIcon from "../svg/footer/facebookIcon";
import IgIcon from "../svg/footer/IgIcon";
import XIcon from "../svg/footer/XIcon";
import Link from "next/link";
import ErxesLogo from "./erxes-logo";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const t = useTranslations();
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
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200">
      <motion.div
        initial="initial"
        animate={inView ? "enter" : ""}
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Contact Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <motion.h1
              variants={animation}
              custom={0}
              className="text-xs font-medium opacity-60 leading-[13px] uppercase text-[#383A42]"
            >
              {t("Холбогдох")}
            </motion.h1>
            <motion.h2
              variants={animation}
              custom={1}
              className="text-xl font-normal tracking-[0.4px] text-[#383A42]"
            >
              11 - 327585
            </motion.h2>
          </div>
          <div className="flex flex-col gap-2">
            <motion.h1
              variants={animation}
              custom={2}
              className="text-xs font-medium leading-[13px] opacity-60 uppercase text-gray-600"
            >
              {t("Иейл:")}
            </motion.h1>
            <motion.p
              variants={animation}
              custom={3}
              className="text-sm font-normal tracking-[0.4px] text-[#383A42]"
            >
              registry.mn@undp.org
            </motion.p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <motion.h1
              variants={animation}
              custom={4}
              className="text-xs font-medium leading-[13px] uppercase opacity-60 text-[#383A42]"
            >
              {t("Хаяг:")}
            </motion.h1>
            <motion.p
              variants={animation}
              custom={5}
              className="text-sm font-normal tracking-[0.4px]  text-[#383A42]"
            >
              {t("НҮБын")}
            </motion.p>
          </div>
          <div className="flex flex-col gap-2">
            <motion.h1
              variants={animation}
              custom={6}
              className="text-xs leading-[13px] font-medium opacity-60 tracking-[0.4px] uppercase text-[#383A42]"
            >
              {t("Ажиллаххуваарь")}
            </motion.h1>
            <motion.p
              variants={animation}
              custom={7}
              className="text-sm font-normal tracking-[0.4px] text-[#383A42] leading-relaxed"
            >
              {t("Дава0")}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 sm:gap-8">
          <div className="flex gap-4">
            <Link
              href="https://x.com/UNDPMongolia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UNDP Mongolia on X"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <XIcon />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/undp.mongolia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UNDP Mongolia on Facebook"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <FacebookIcon />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/undpmongolia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UNDP Mongolia on Instagram"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <IgIcon />
              </div>
            </Link>
          </div>
          <Button
            className="text-black hover:no-underline font-normal px-0 py-1 h-7 flex items-center"
            variant="link"
            asChild
          >
            <Link
              href="https://erxes.mn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Powered by Erxes"
            >
              Powered by
              <ErxesLogo fill="#000" className="ml-1 h-7 w-14" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
