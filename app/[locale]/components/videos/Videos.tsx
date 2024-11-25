"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "../ui/image";
import gsap from "gsap";

const Videos = ({ videosMn, videosEn }: any) => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }
    );
  }, []);

  const { locale } = useParams();
  const articlesToShow = locale === "en" ? videosEn : videosMn;

  const facebookLinks = [
    "https://www.facebook.com/reel/1063219675347479/?s=single_unit",
    "https://www.facebook.com/reel/890117096655136",
    "https://www.facebook.com/reel/869945092011150",
  ];

  const t = useTranslations();

  return (
    <div
      ref={containerRef}
      className="flex flex-col py-16 px-6 sm:px-10 md:px-10 lg:px-10 gap-10"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {t("Видеосэтгэгдэл")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesToShow.map((item: any, index: number) => (
          <a
            href={facebookLinks[index]}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="relative max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-80"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={item.image?.url || "/images/default-image.jpg"}
              width={300}
              height={400}
              className={`w-full h-[400px] object-cover transition-all duration-500 ease-in-out transform ${
                hoveredIndex === index
                  ? "scale-105 opacity-50"
                  : "scale-100 opacity-100"
              }`}
              alt={`Image ${index + 1}`}
            />

            <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2">
              <Image
                src={item.attachments[0]?.url}
                width={150}
                height={150}
                className="object-cover"
                alt={`Attachment ${index + 1}`}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end pb-6 p-4 transition-opacity duration-300 ease-in-out">
              <div className="text-center text-sm text-white font-medium bg-black bg-opacity-60 rounded-xl px-4 py-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.content || "No content available",
                  }}
                />
              </div>
              <div className="text-center text-sm text-white font-medium bg-[#F1672D] bg-opacity-60 rounded-xl px-4 py-2 ">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.summary || "No content available",
                  }}
                />
              </div>

              {hoveredIndex === index && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 bg-[#F1672D] text-white py-2 px-4 rounded-xl transition-all duration-300 ease-in-out">
                  <a
                    href={facebookLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("Reel үзэх")}
                  </a>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Videos;
