"use client";

import Image from "../ui/image";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerOrganization = ({
  hamtragchBaiguullaga,
}: {
  hamtragchBaiguullaga: any[];
}) => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (hamtragchBaiguullaga && hamtragchBaiguullaga.length > 0) {
      setArticles(hamtragchBaiguullaga);
    }
  }, [hamtragchBaiguullaga]);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: Math.min(6, articles.length),
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
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(4, articles.length) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(5, articles.length) },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: Math.min(4, articles.length) },
      },
      {
        breakpoint: 360,
        settings: { slidesToShow: Math.min(6, articles.length) },
      },
    ],
  };

  return (
    <div className="max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]  xl:max-w-[550px] 2xl:max-w-[900px] mx-auto py-6 sm:py-8 lg:py-10 mt-10">
      {articles.length > 0 ? (
        <Slider
          {...settings}
          className="flex items-center gap-4 sm:gap-6 md:gap-8"
        >
          {articles.map((article, index) => (
            <div
              key={article._id || index}
              className="px-[1px] sm:px-3 md:px-4 transition-transform duration-500 ease-out transform hover:scale-105"
            >
              <Image
                src={article.image?.url || "/images/default-image.jpg"}
                width={50}
                height={50}
                className="object-contain sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] xl:w-[80px] xl:h-[80px] 2xl:w-[89px] 2xl:h-[89px] w-[50px] h-[50px]"
                alt={`Partner logo ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">
          No partner organizations available
        </p>
      )}
    </div>
  );
};

export default PartnerOrganization;
