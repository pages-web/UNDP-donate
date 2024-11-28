import { useTranslations } from "next-intl";
import FacebookIcon from "../svg/footer/facebookIcon";
import IgIcon from "../svg/footer/IgIcon";
import XIcon from "../svg/footer/XIcon";
import Link from "next/link";
const Footer = () => {
  const t = useTranslations();
  return (
    <div className="flex p-6 items-end gap-6 self-stretch rounded-3xl bg-[#fff] ">
      <div className="flex flex-col items-start gap-8 self-stretch text-[#383A42] flex-[1_0_0]">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-[0.6]">
            {t("Холбогдох")}
          </h1>
          <h1 className="text-xl font-medium tracking-[-0.4px] uppercase text-[#383A42] font-inter">
            11 - 327585
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-[0.6]">
            {t("Иейл:")}
          </h1>
          <h1 className="text-sm font-normal leading-[13px] tracking-[0.4px]  text-[#383A42] font-inter ">
            registry.mn@undp.org
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 self-stretch text-[#383A42] flex-[1_0_0]">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-[0.6]">
            {t("Хаяг:")}
          </h1>
          <h1 className="text-sm font-normal tracking-[-0.4px]  text-[#383A42] font-inter">
            {t("НҮБын")}
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-[0.6]">
            {t("Ажиллаххуваарь")}
          </h1>
          <h1 className="text-sm font-normal leading-[120%] tracking-[-0.28px]  text-[#383A42] font-inter ">
            {t("Дава0")}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-end self-stretch justify-between flex-[1_0_0]  text-[#383A42]"></div>
      <div className="flex items-end gap-2.5">
        <Link href={"https://x.com/UNDPMongolia"}>
          <div className="flex w-10 h-10 justify-center items-center rounded-[40px] bg-[#3165AC]">
            <XIcon />
          </div>
        </Link>

        <div className="flex flex-col items-start gap-2.5">
          <Link href={"https://www.facebook.com/undp.mongolia "}>
            <div className="flex w-10 h-10 justify-center items-center rounded-[40px] bg-[#3165AC]">
              <FacebookIcon />
            </div>
          </Link>
          <Link href={"https://www.instagram.com/undpmongolia/ "}>
            <div className="flex w-10 h-10 justify-center items-center rounded-[40px] bg-[#3165AC]">
              <IgIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
