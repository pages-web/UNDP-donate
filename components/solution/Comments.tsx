import Image from "next/image";

const data = [
  {
    avatar: "/images/women.png",
    title: (
      <span>
        "Хөтөлбөрт хамрагдсан
        <span className="text-[#F1672D] px-1">сурагчийн </span>
        сэтгэгдэл:"
      </span>
    ),
    description: (
      <span className="text-black">
        Энтерпрайз хөтөлбөрийн <span className="font-bold px-1">онцлог</span> нь
        <span className="font-bold px-1">
          лекц сонсоод түүнийгээ бичиж тэмдэглэх биш
        </span>
        илүү интерактив, өөрсдөө практик дээр ажиллаж төсөл боловсруулж
        өрсөлдсөн нь маш их таалагдсан.Төсөл боловсруулж сурахын тулд асуудлаа
        хэрхэн тодорхойлох, тухайн асуудалдаа хэрхэн оновчтой шийдэл
        боловсруулах талаар суралцсан.
      </span>
    ),
    summary: (
      <span className="text-gray-800">
        <span className="font-bold px-1">"Дархан-Уул аймгийн</span> Монгол Оюу
        сургуулийн 12-2 ангийн сурагч Оюунсувд",
      </span>
    ),

    icon: "/images/a.png",
  },
  {
    avatar: "/images/women2.png",
    title: (
      <span>
        "Хөтөлбөрийг авсан ЕБС-ийн ангийн
        <span className="text-[#F1672D] px-1">багшийн</span> сэтгэгдэл:"
      </span>
    ),
    description: (
      <span className="text-black">
        Энэ хөтөлбөрөөр дамжуулан манай сурагчид өөрсдөд тулгамдаж буй
        <span className="font-bold px-1">
          асуудлыг тодорхойлон түүнийгээ шийдвэрлэх арга замыг багаараа хамтран
          эрэлхийлж, хайж, хэрэгжүүлж ажиллалаа.
        </span>
        Үүгээр дамжуулан манай сурагчид өөрийгөө илэрхийлэх, багаар ажиллах
        зэрэг ур чадваруудад маш богино хугацаанд өндөр ахицтай суралцаж чадсанд
        баяртай байна.
      </span>
    ),
    summary: (
      <span className="text-gray-800">
        <span className="font-bold px-1">
          "Хэнтий аймгийн Жаргалтхаан сумын
        </span>
        ЕБС сургуулийн Монгол хэл, Уран зохиолын багш Сумъяа"
      </span>
    ),
    icon: "/images/a.png",
  },
  {
    avatar: "/images/women3.png",
    title: (
      <span>
        "Хөтөлбөрт хамрагдсан
        <span className="text-[#F1672D] px-1">сурагчийн</span> сэтгэгдэл:"
      </span>
    ),
    description: (
      <span className="text-black">
        Хүүхдүүд бид
        <span className="font-bold px-1"> зөөлөн ур чадваруудад суралцан </span>
        өөрсдийн илэрхийлж чадахгүй байгаа үг хэллэгээ бусдад асуудалгүй
        илэрхийлж чаддаг болсон. Мөн ирээдүйд өөрсдийн ажиллах мэргэжилд
        зайлшгүй хэрэг болох
        <span className="font-bold px-1">
          багаар хамтран ажиллах, бусадтай эелдэг харилцах
        </span>
        чадваруудад суралцлаа.
      </span>
    ),
    summary: (
      <span className="text-gray-800">
        <span className="font-bold px-1">
          "Хэнтий аймгийн Жаргалтхаан сумын
        </span>{" "}
        ЕБС сургуулийн 9-р ангийн сурагч Номиндарь"
      </span>
    ),
    icon: "/images/a.png",
  },
];

const Comments = () => {
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
