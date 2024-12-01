import { useTranslations } from "next-intl";

import Image from "../ui/image";

const Description = ({ additionalexplanationmn }: any) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6 p-6 items-center bg-white  rounded-3xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          {additionalexplanationmn[0]?.title}
        </h1>
      </div>
      <div className="relative w-full max-h-[486px] aspect-square overflow-hidden rounded-[24px]">
        <Image
          sizes="100vw"
          src={additionalexplanationmn[0]?.image?.url}
          quality={100}
          priority
          className="w-full"
          alt={`Carousel image ${additionalexplanationmn + 1}`}
        />
      </div>
    </div>
  );
};

export default Description;
