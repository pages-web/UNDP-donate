import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
const Comments = () => {
  const t = useTranslations();
  const data = [
    {
      avatar: "/images/women.png",
      title: (
        <span>
          {t("Хөтөлбөртхамрагдсан")}
          <span className="text-[#F1672D] px-1">{t("сурагчийн")} </span>
          {t("сэтгэгдэл")}
        </span>
      ),
      description: (
        <span className="text-black">
          {t("Энтерпрайзхөтөлбөрийн")}
          <span className="font-bold px-1">{t("онцлог")}</span> {t("нь")}
          <span className="font-bold px-1">
            {t("лекцсонсоодтүүнийгээбичижтэмдэглэхбиш")}
          </span>
          {t("aa")}
        </span>
      ),
      summary: (
        <span className="text-gray-800">
          <span className="font-bold px-1">{t("ДарханУулаймгийн")}</span>
          {t("МонголОюусургуулийн2ангийнсурагчОюунсувд")}
        </span>
      ),

      icon: "/images/a.png",
    },
    {
      avatar: "/images/women2.png",
      title: (
        <span>
          {t("ХөтөлбөрийгавсанЕБСийнангийн")}
          <span className="text-[#F1672D] px-1">{t("багшийн")}</span>
          {t("сэтгэгдэл")}
        </span>
      ),
      description: (
        <span className="text-black">
          {t("Энэхөтөлбөрөөрдамжууланманайсурагчидөөрсдөдтулгамдажбуй")}
          <span className="font-bold px-1">{t("a")}</span>
          {t("aaa")}
        </span>
      ),
      summary: (
        <span className="text-gray-800">
          <span className="font-bold px-1">
            {t("ХэнтийаймгийнЖаргалтхаансумын")}
          </span>
          {t("ЕБбагшСумъяа")}
        </span>
      ),
      icon: "/images/a.png",
    },
    {
      avatar: "/images/women3.png",
      title: (
        <span>
          {t("Хөтөлбөртхамрагдсан")}
          <span className="text-[#F1672D] px-1">{t("сурагчийн")}</span>
          {t("сэтгэгдэл")}
        </span>
      ),
      description: (
        <span className="text-black">
          {t("Хүүхдүүдбид")}
          <span className="font-bold px-1">{t("зөөлөсуралцан")}</span>
          {t("aaaa")}
          <span className="font-bold px-1">{t("багааррилцах")}</span>
          {t("чадваруудадуралцлаа")}
        </span>
      ),
      summary: (
        <span className="text-gray-800">
          <span className="font-bold px-1">{t("Хэнтийсумын")}</span>
          {t("БСоминдарь")}
        </span>
      ),
      icon: "/images/a.png",
    },
  ];
  return (
    <div className="flex flex-wrap gap-3 justify-start p-4">
      {data.map((e, index) => {
        return (
          <div
            key={index}
            className="flex flex-col w-full sm:w-[418px] bg-white shadow-lg rounded-[25px] p-6 border border-[#F1672D] hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                alt=""
                width={50}
                height={50}
                src={e.avatar}
                className="object-cover rounded-full"
              />
              <h1 className="font-bold text-[17px] text-[#333] leading-5">
                {e.title}
              </h1>
            </div>

            <div className="rounded-[25px] p-4 border-4 border-[#F1672D] mb-4 font-light">
              <p>{e.description}</p>
            </div>

            <p className="text-sm text-gray-500">{e.summary}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
