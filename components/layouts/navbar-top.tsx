"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface NavbarTopProps {
  logo: string | undefined;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ logo }) => {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("");
  const { locale } = useParams();

  const logoSrc = logo || "";

  useEffect(() => {
    setIsClient(true);

    if (locale === "en") {
      setIsEnglish(true);
    } else {
      setIsEnglish(false);
    }
  }, [locale]);

  const toggleLanguage = () => {
    const newLocale = isEnglish ? "mn" : "en";
    setIsEnglish(!isEnglish);

    if (isClient) {
      window.location.href = `/${newLocale}`;
    }
  };

  if (!isClient) return null;

  return (
    <header className="z-50 sticky w-full top-0">
      <div className="bg-[rgb(55,58,60)] px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4">
          <Image
            src={logoSrc}
            alt="Logo"
            width={200}
            height={80}
            className="object-cover w-20 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 lg:w-36 lg:h-14 xl:w-72 xl:h-14"
          />

          <div className="flex gap-3 sm:gap-6 md:gap-10 items-center text-white font-semibold text-[8px] sm:text-xs md:text-md lg:text-base xl:text-lg">
            <a href="#requirement">
              <h1 className="cursor-pointer hover:text-gray-300 transition-colors">
                {t("aboutProgram")}
              </h1>
            </a>

            <a href="#yourParticipation">
              <h1 className="cursor-pointer hover:text-gray-300 transition-colors">
                {t("yourParticipation")}
              </h1>
            </a>

            <a href="#cooperation">
              <h1 className="cursor-pointer hover:text-gray-300 transition-colors">
                {t("cooperation")}
              </h1>
            </a>
          </div>

          <div className="pr-0 sm:pr-6 md:pr-10 lg:pr-20">
            <Image
              alt="Language Icon"
              width={35}
              height={35}
              src={isEnglish ? "/images/mongolia.png" : "/images/english.png"}
              onClick={toggleLanguage}
              className="cursor-pointer object-cover w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarTop;
