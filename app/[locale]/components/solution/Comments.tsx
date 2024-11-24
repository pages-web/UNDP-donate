import { Swiper as SwiperCore } from "swiper"; // Import Swiper core type
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useRef, useState } from "react";
import { EffectCoverflow, Navigation } from "swiper";
import Image from "../ui/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Comment {
  image: { url: string };
  title: string;
  content: string;
  summary: string;
}

interface CommentProps {
  CommentMn: Comment[];
  CommentEn: Comment[];
}

const Comments: React.FC<CommentProps> = ({ CommentMn, CommentEn }) => {
  const t = useTranslations();
  const swiperRef = useRef<SwiperCore | null>(null);
  CommentMn;
  const { locale } = useParams();
  const articleToShow = locale === "en" ? CommentEn : CommentMn;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const renderSlides = () =>
    articleToShow.map((item, index) => (
      <SwiperSlide
        key={index}
        className="flex flex-col bg-white rounded-[25px] overflow-hidden px-6 py-8 border border-[#F1672D] shadow-none"
      >
        <div className="flex items-center gap-3 mb-4">
          <Image
            alt={`Partner logo ${index + 1}`}
            width={50}
            height={50}
            src={item.image?.url || "/images/default-image.jpg"}
            className="object-cover rounded-full"
          />
          <h1 className="font-bold text-[17px] text-[#333] leading-5 sm:text-[14px] md:text-[16px] lg:text-[15px]">
            {item.title}
          </h1>
        </div>
        <div className="rounded-[20px] p-4 border-4 border-[#F1672D] mb-4 ">
          <div
            className="leading-[22px] font-normal text-base text-black"
            dangerouslySetInnerHTML={{ __html: item?.content }}
          />
        </div>
        <p className="text-xs text-gray-500">{item.summary}</p>
      </SwiperSlide>
    ));

  return (
    <div className="w-full flex justify-center mt-10 relative">
      {articleToShow.length > 0 && (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.5}
          spaceBetween={10}
          initialSlide={1}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Navigation]}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 2, spaceBetween: 25 },
          }}
          className="w-full xl:max-w-[670px] 2xl:max-w-[850px] mx-auto"
        >
          {renderSlides()}
        </Swiper>
      )}
      <NavigationButton
        direction="right"
        onClick={() => swiperRef.current?.slideNext()}
      />
      <NavigationButton
        direction="left"
        onClick={() => swiperRef.current?.slidePrev()}
      />
    </div>
  );
};

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
}) => (
  <div
    className={`absolute ${
      direction === "right" ? "right-5" : "left-5"
    } top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-3 rounded-full bg-white hover:bg-gray-200 transition duration-300 shadow-lg`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-8 h-8 text-[#F1672D]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={
          direction === "right"
            ? "M15 19l7-7-7-7M5 19l7-7-7-7"
            : "M9 5l-7 7 7 7M19 5l-7 7 7 7"
        }
      />
    </svg>
  </div>
);

export default Comments;
