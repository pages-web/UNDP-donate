import { useTranslations } from "next-intl";
import FacebookIcon from "../svg/footer/facebookIcon";
import IgIcon from "../svg/footer/IgIcon";
import XIcon from "../svg/footer/XIcon";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();
  return (
    <div className="md:p-8 p-6 rounded-3xl bg-[#fff] border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-60">
              {t("Холбогдох")}
            </h1>
            <h1 className="text-xl font-medium tracking-[-0.4px] uppercase text-[#383A42] font-inter">
              11 - 327585
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-60">
              {t("Иейл:")}
            </h1>
            <h1 className="text-sm font-normal tracking-[0.4px] text-[#383A42] font-inter">
              registry.mn@undp.org
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-60">
              {t("Хаяг:")}
            </h1>
            <h1 className="text-sm font-normal tracking-[-0.4px] text-[#383A42] font-inter">
              {t("НҮБын")}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[10px] font-medium leading-[13px] tracking-[0.4px] uppercase text-[#383A42] font-inter opacity-60">
              {t("Ажиллаххуваарь")}
            </h1>
            <h1 className="text-sm font-normal leading-[120%] tracking-[-0.28px] text-[#383A42] font-inter">
              {t("Дава0")}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-4">
            <Link href="https://x.com/UNDPMongolia">
              <div className="flex w-10 h-10 sm:w-12 sm:h-12 justify-center items-center rounded-full bg-[#3165AC] transition-all hover:scale-110">
                <XIcon />
              </div>
            </Link>
            <Link href="https://www.facebook.com/undp.mongolia">
              <div className="flex w-10 h-10 sm:w-12 sm:h-12 justify-center items-center rounded-full bg-[#3165AC] transition-all hover:scale-110">
                <FacebookIcon />
              </div>
            </Link>
            <Link href="https://www.instagram.com/undpmongolia/">
              <div className="flex w-10 h-10 sm:w-12 sm:h-12 justify-center items-center rounded-full bg-[#3165AC] transition-all hover:scale-110">
                <IgIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
