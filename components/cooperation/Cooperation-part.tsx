import Image from "next/image";

const data = [
  {
    icon1: "/images/cooperation1.png",
    icon2: "/images/cooperation2.png",
    icon3: "/images/cooperation3.png",
    icon4: "/images/cooperation4.png",
    icon5: "/images/cooperation5.png",
    title: (
      <span>
        "Санхүүжилт <span className="text-[#F1672D] px-1"> ба боломж"</span>
      </span>
    ),
    description1: (
      <span>
        "Сошиал хуудсуудаараа{" "}
        <span className="text-[#F1672D] px-1">ТАЛАРХЛЫН ПОСТ"</span>{" "}
      </span>
    ),
    description2: (
      <span>
        "Хөтөлбөрийг дэмжиж санхүүжүүлсэн тухай{" "}
        <span className="text-[#F1672D] px-1">ТОДОРХОЙЛОЛТ</span>
        (Англи, Монгол хэл дээр)"
      </span>
    ),
    description3: (
      <span>
        "Байгууллагын
        <span className="text-[#F1672D] px-1">ТОГТВОРТОЙ ХӨГЖЛИЙН ТАЙЛАНД</span>
        нь тусгах мэдээ мэдээлэл, тоон үзүүлэлт, тайлан"
      </span>
    ),
    description4: (
      <span>
        <span className="text-[#F1672D] px-1">"HIGHLIGHT ВИДЕО </span>{" "}
        сэтгэгдэл, video shoot ‘(400'000 ₮ -с дээш санхүүжилт)"
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
        "Дэмжлэг <span className="text-[#F1672D] px-1">ба боломж"</span>
      </span>
    ),
    description1: (
      <span>
        "Хөтөлбөрийн үеэр тохирох сэдвийн хүрээнд зочноор оролцож
        <span className="text-[#F1672D] px-1">ТУРШЛАГА ХУВААЛЦАХ, СУРГАЛТ</span>
        орох "
      </span>
    ),
    description2: (
      <span>
        "Хөтөлбөрийн хүрээнд хүүхдүүдийн санаачилсан төслийн багуудад
        <span className="text-[#F1672D] px-1">МЕНТОР </span> хийх"
      </span>
    ),
    description3: "Хүүхдүүдийн санаачилсан төсөл дээр ХАМТРАН ажиллах",
    description4: (
      <span>
        {" "}
        "Хөтөлбөрийн хаалтын үйл ажиллагаанд{" "}
        <span className="text-[#F1672D] px-1">ШҮҮГЧЭЭР </span> оролцох",
      </span>
    ),
  },
];

const CooperationPart = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-start">
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
