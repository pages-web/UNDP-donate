"use client"; // Mark this as a client component

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SolarIcon from "../svg/header/SolarIcon";
import PaqIcon from "../svg/header/PaqIcon";
import LanguageIcon from "../svg/header/LanguageIcon";
import Modal from "../modal/Modal";
import PhoneIcon from "../svg/header/PhoneIcon";

interface NavbarTopProps {
  logo?: string;
}

const Psda: React.FC = () => {
  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isFirstVisit = localStorage.getItem("visited");

      if (!isFirstVisit && locale !== "mn") {
        localStorage.setItem("visited", "true");
        router.replace("/mn");
      }
    }
  }, [locale, router]);

  return null;
};

const NavbarTop: React.FC<NavbarTopProps> = () => {
  const t = useTranslations("");
  const { locale } = useParams();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "mn" ? "en" : "mn";
    router.push(`/${newLocale}`);
  }, [locale, router]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Psda />
      <div className="bg-[#f6f6f6] p-2.5 flex justify-between items-center rounded-3xl max-h-[70px] relative">
        <div className="flex flex-col items-start text-[#3165AC] p-0">
          <h1 className="text-[#3165AC] lg:text-base xl:text-[24px] text-[14px] md:text-[24px] font-medium m-0">
            If only i could go solar
          </h1>
          <span className=" lg:text-base text-[11px] md:text-lg font-normal m-0">
            #GoSolar ☀️
          </span>
        </div>

        <div
          className="lg:hidden flex items-center gap-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <svg
            className="sm:w-[30px] sm:h-[30px] w-[24px] h-[24px]"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="hidden lg:flex justify-center items-center gap-5 text-[#000000B2]">
          <a
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px]"
            href="#about"
          >
            <SolarIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Төслийнтухай")}
            </h1>
          </a>
          <a
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px]"
            href="#faq"
          >
            <PaqIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Түгээмэласуулт")}
            </h1>
          </a>
          <a
            href="#contact"
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px]"
          >
            <PhoneIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Холбогдох")}
            </h1>
          </a>
          <div
            onClick={toggleLanguage}
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] cursor-pointer"
          >
            <LanguageIcon />
            <h1 className="cursor-pointer transition-colors">
              {locale === "mn" ? "EN" : "MN"}
            </h1>
          </div>
          <Modal />
        </div>

        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
          } absolute top-[70px] md:top-[80px] right-0 w-full z-[9999] bg-[#f6f6f6] p-4 rounded-3xl`}
        >
          <a
            className="flex gap-2 p-2.5 justify-center items-center rounded-[100px] mb-3"
            href="#about"
          >
            <SolarIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Төслийнтухай")}
            </h1>
          </a>
          <a
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] mb-3"
            href="#faq"
          >
            <PaqIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Түгээмэласуулт")}
            </h1>
          </a>
          <a className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] mb-3">
            <PhoneIcon />
            <h1 className="cursor-pointer transition-colors">
              {t("Холбогдох")}
            </h1>
          </a>
          <div
            onClick={toggleLanguage}
            className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] cursor-pointer"
          >
            <LanguageIcon />
            <h1 className="cursor-pointer transition-colors">
              {locale === "mn" ? "EN" : "MN"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
