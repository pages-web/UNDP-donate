"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SolarIcon from "../svg/header/SolarIcon";
import PaqIcon from "../svg/header/PaqIcon";
import LanguageIcon from "../svg/header/LanguageIcon";
import Modal from "../modal/Modal";
import PhoneIcon from "../svg/header/PhoneIcon";
import Image from "../ui/image";

interface NavbarTopProps {
  logo?: string;
}

const NavbarTop: React.FC<NavbarTopProps> = () => {
  const t = useTranslations("");
  const { locale } = useParams();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "mn" ? "en" : "mn";
    router.push(`/${newLocale}`);
  }, [locale, router]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="">
      <div className="bg-[#f6f6f6] md:p-8 p-6 flex justify-between items-center rounded-3xl max-h-[70px] relative">
        <div className="flex flex-col items-center justify-center">
          <Image
            width={100}
            quality={100}
            height={100}
            priority
            className="w-full object-cover"
            src="/UNDP.png"
            alt="UNDP Logo"
          />
        </div>

        {!isDesktop && (
          <div
            className="flex items-center gap-2 cursor-pointer"
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
        )}

        {isDesktop ? (
          <div className="flex justify-center items-center gap-5 text-[#000000B2]">
            <a
              className="flex gap-2 p-2.5 justify-center items-center rounded-[100px] "
              href="#about"
              onClick={() => setIsMenuOpen(false)} // Close the menu
            >
              <SolarIcon />
              <h1 className="cursor-pointer transition-colors">
                {t("Төслийнтухай")}
              </h1>
            </a>
            <a
              className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] "
              href="#faq"
              onClick={() => setIsMenuOpen(false)} // Close the menu
            >
              <PaqIcon />
              <h1 className="cursor-pointer transition-colors">
                {t("Түгээмэласуулт")}
              </h1>
            </a>
            <a
              href="#contact"
              className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] "
              onClick={() => setIsMenuOpen(false)} // Close the menu
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
        ) : (
          <div
            className={`transition-all duration-500 ease-in-out ${
              isMenuOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
            } absolute top-[80px] md:top-[80px] right-0 w-full z-[9999] bg-[#f6f6f6] p-4 rounded-3xl`}
          >
            <a
              className="flex gap-2 p-2.5 justify-center items-center rounded-[100px] mb-3"
              href="#about"
              onClick={() => setIsMenuOpen(false)} // Close the menu
            >
              <SolarIcon />
              <h1 className="cursor-pointer transition-colors">
                {t("Төслийнтухай")}
              </h1>
            </a>
            <a
              className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] mb-3"
              href="#faq"
              onClick={() => setIsMenuOpen(false)} // Close the menu
            >
              <PaqIcon />
              <h1 className="cursor-pointer transition-colors">
                {t("Түгээмэласуулт")}
              </h1>
            </a>
            <a
              href="#contact"
              className="flex gap-2.5 p-2.5 justify-center items-center rounded-[100px] mb-3"
              onClick={() => setIsMenuOpen(false)} // Close the menu
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
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarTop;
