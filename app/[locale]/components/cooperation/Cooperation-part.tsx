import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
const CooperationPart = () => {
  const t = useTranslations();
  const data = [
    {
      icon1: "/images/cooperation1.png",
      icon2: "/images/cooperation2.png",
      icon3: "/images/cooperation3.png",
      icon4: "/images/cooperation4.png",
      icon5: "/images/cooperation5.png",
      title: (
        <span>
          {t("Санхүүжилт")}
          <span className="text-[#F1672D] px-1">{t("баломж")} </span>
        </span>
      ),
      description1: (
        <span>
          {t("Сошиалхуудсуудаараа")}
          <span className="text-[#F1672D] px-1">{t("ТАЛАРХЛЫНПОСТ")}</span>{" "}
        </span>
      ),
      description2: (
        <span>
          {t("Хөтөлбөрийгтухай")}
          <span className="text-[#F1672D] px-1">{t("ТОДОРХОЙЛОЛТ")}</span>
        </span>
      ),
      description3: (
        <span>
          {t("Байгууллагын")}
          <span className="text-[#F1672D] px-1">{t("ТОГТВОАЙЛАНД")}</span>
          {t("нан")}
        </span>
      ),
      description4: (
        <span>
          <span className="text-[#F1672D] px-1">{t("HIGHLIGHTВИДЕО")} </span>
          {t("сэтгэгдэ")}
        </span>
      ),
    },
    {
      icon1: "/images/cooperation6.png",
      icon2: "/images/cooperation7.png",
      icon3: "/images/cooperation8.png",
      icon4: "/images/cooperation9.png",
      icon5: "/images/cooperation10.png",
      title: (
        <span>
          {t("Дэмжлэг")}
          <span className="text-[#F1672D] px-1">{t("баболомж")}</span>
        </span>
      ),
      description1: (
        <span>
          {t("Хөтөлбөрий")}
          <span className="text-[#F1672D] px-1">{t("ТУРШЛАГРГАЛТ")}</span>
        </span>
      ),
      description2: (
        <span>
          {t("Хөтөлбөриад")}
          <span className="text-[#F1672D] px-1"> {t("МЕНТОР")} </span>
        </span>
      ),
      description3: <span> {t("Хүүхдүүдийнжиллах")}</span>,
      description4: (
        <span>
          {t("Хөтөлбөд")}
          <span className="text-[#F1672D] px-1">{t("ШҮҮГЧЭЭР")} </span>
          {t("оролцох")}
        </span>
      ),
    },
  ];
  return (
    <div className="flex flex-wrap gap-3 justify-between">
      {data.map((e, index) => (
        <div
          key={index}
          className=" w-full max-w-[420px] bg-white rounded-[25px] p-6 shadow-lg border border-orange-200"
        >
          <div className="flex items-center gap-4 mb-5">
            <Image
              alt=""
              width={50}
              height={50}
              src={e.icon1}
              className="object-cover"
            />
            <h1 className="font-bold text-xl text-black">{e.title}</h1>
          </div>

          <div className="rounded-[20px] p-5 bg-orange-50 border border-orange-200 flex flex-col gap-4 shadow-inner">
            {[e.icon2, e.icon3, e.icon4, e.icon5].map((icon, i) => (
              <div key={i} className="flex items-start gap-3">
                <Image
                  alt=""
                  width={28}
                  height={28}
                  src={icon}
                  className="rounded-md shadow-sm"
                />
                <p className="text-gray-700 text-sm font-semibold">
                  {e[`description${i + 1}` as keyof typeof e]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CooperationPart;
