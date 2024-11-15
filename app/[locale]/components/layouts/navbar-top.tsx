"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loading } from "../ui/loading"; // Importing the Loading component

interface NavbarTopProps {
  logo: string | undefined;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ logo }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true); // State for component loading
  const [isSwitching, setIsSwitching] = useState(false); // State for language switching
  const [isAnimating, setIsAnimating] = useState(false); // State for language icon animation
  const t = useTranslations("");
  const params = useParams();
  const router = useRouter();

  const logoSrc = logo || "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setLoading(false); // Set loading to false when the component is mounted
      // Set default locale to 'mn' if not set
      if (!params.locale) {
        router.replace("/en");
      }
    }
  }, [params.locale, router]);

  const toggleLanguage = useCallback(async () => {
    setIsSwitching(true); // Show loading spinner when language is switching
    setIsAnimating(true); // Start the animation
    const newLocale = params.locale === "en" ? "mn" : "en";
    if (isClient) {
      setTimeout(() => {
        router.replace(`/${newLocale}`);
        setIsSwitching(false); // Hide spinner after language switch
        setIsAnimating(false); // End the animation after the switch
      }, 500); // Reduced delay for smoother transition
    }
  }, [params.locale, isClient, router]);

  if (!isClient) return null;

  return (
    <header className="z-50 sticky w-full top-0">
      <div className="bg-[rgb(55,58,60)] px-4 sm:px-8 lg:px-12">
        <div
          className={`flex justify-between items-center py-4 transition-all duration-500 ${
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
                    params.locale === "en"
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
