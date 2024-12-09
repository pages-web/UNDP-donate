"use client";

import Image from "../ui/image";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerOrganization = ({ partner }: { partner: any[] }) => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (partner && partner.length > 0) {
      setArticles(partner);
    }
  }, [partner]);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: Math.min(4, articles.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: Math.min(4, articles.length) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(3, articles.length) },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: Math.min(2, articles.length) },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-10 sm:p-[30px] p-[20px] md:p-[42px] rounded-3xl bg-[#fff] border border-gray-200 transition-all duration-500 ease-in-out">
      <div className="w-full mx-auto py-3 sm:py-8 lg:py-10">
        {articles.length > 0 ? (
          <Slider
            {...settings}
            className="flex items-center gap-6 sm:gap-8 md:gap-10"
          >
            {articles.map((article, index) => {
              const imageUrl =
                article.image?.url || "/images/default-image.jpg";
              return (
                <div
                  key={article._id || index}
                  className="px-[1px] sm:px-3 md:px-4 "
                >
                  <Image
                    src={imageUrl}
                    width={100}
                    height={100}
                    className="object-contain w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px] xl:w-[110px] xl:h-[110px] 2xl:w-[120px] 2xl:h-[120px] transition-all duration-300 ease-in-out"
                    alt={
                      article.name ||
                      `Logo of partner organization ${index + 1}`
                    }
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 text-lg font-semibold">
            No partner organizations available
          </p>
        )}
      </div>
    </div>
  );
};

export default PartnerOrganization;
