"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "../ui/image";
import gsap from "gsap";

const Videos = ({
  videosMn,
  videosEn,
}: {
  videosMn: any[];
  videosEn: any[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Animation on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }
      );
    }
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
    <div ref={containerRef} className="flex flex-col py-16 px-6 sm:px-6 gap-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {t("Видеосэтгэгдэл")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesToShow.map((item, index) => (
          <div key={index}>
            <a
              href={facebookLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="relative max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-80"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={item.image?.url || "/images/default-image.jpg"}
                width={300}
                height={400}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`w-full h-auto object-cover transition-all duration-500 ease-in-out transform rounded-[15px] ${
                  hoveredIndex === index
                    ? "scale-100 opacity-50"
                    : "scale-100 opacity-100"
                }`}
                alt={`Image ${index + 1}`}
              />

              {hoveredIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#F1672D] text-white py-2 px-6 rounded-xl transition-all duration-300 ease-in-out">
                    <a
                      href={facebookLinks[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("Reel үзэх")}
                    </a>
                  </div>
                </div>
              )}
            </a>
            <div className="font-normal text-center text-gray-900 text-xs lg:text-xs lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-2xl [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug">
              {item?.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">No content available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
