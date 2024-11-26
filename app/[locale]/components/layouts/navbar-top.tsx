"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loading } from "../ui/loading";
import React from "react";

interface NavbarTopProps {
  logo?: string;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ logo }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations("");
  const { locale } = useParams(); // Fetching the current locale from params
  const router = useRouter();

  const logoSrc = logo || "";

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    setLoading(false);

    if (!locale) {
      router.replace("/mn");
    }
  }, [locale, router]);

  const toggleLanguage = useCallback(() => {
    setIsSwitching(true);
    setIsAnimating(true);

    const newLocale = locale === "mn" ? "en" : "mn";

    if (isClient) {
      setTimeout(() => {
        router.replace(`/${newLocale}`);
        setIsSwitching(false);
        setIsAnimating(false);
      }, 1500);
    }
  }, [locale, isClient, router]);

  if (!isClient) return null;

  return (
    <header className="z-50 sticky w-full top-0">
      <div className="bg-[rgb(55,58,60)] px-4 sm:px-8 lg:px-12">
        <div
          className={`flex justify-between items-center py-4 transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={logoSrc}
            alt="Logo"
            width={200}
            height={80}
            className="object-cover w-20 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 lg:w-36 lg:h-14 xl:w-72 xl:h-14"
          />
          <nav className="flex gap-2 sm:gap-6 md:gap-10 items-center text-white font-semibold text-[6px] sm:text-xs md:text-md lg:text-[15px] xl:text-[15px]">
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
          </nav>

          <div className="pr-0 sm:pr-6 md:pr-10 lg:pr-20">
            {isSwitching ? (
              <div className="flex justify-center items-center animate-pulse">
                <Loading />
              </div>
            ) : (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                <Image
                  alt="Language Icon"
                  width={35}
                  height={35}
                  src={
                    locale === "en"
                      ? "/images/mongolia.png"
                      : "/images/english.png"
                  }
                  onClick={toggleLanguage}
                  className="cursor-pointer object-cover w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarTop;
