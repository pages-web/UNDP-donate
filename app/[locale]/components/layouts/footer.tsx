import { useTranslations } from "next-intl";
import FacebookIcon from "../svg/footer/facebookIcon";
import IgIcon from "../svg/footer/IgIcon";
import XIcon from "../svg/footer/XIcon";
import Link from "next/link";
import ErxesLogo from "./erxes-logo";
import { Button } from "../ui/button";

const Footer = () => {
  const t = useTranslations();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xs font-medium leading-[13px] uppercase text-gray-600">
              {t("Холбогдох")}
            </h1>
            <h2 className="text-xl font-medium text-gray-900">11 - 327585</h2>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xs font-medium leading-[13px] uppercase text-gray-600">
              {t("Иейл:")}
            </h1>
            <p className="text-sm text-gray-800">registry.mn@undp.org</p>
          </div>
        </div>

        {/* Address and Schedule Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xs font-medium leading-[13px] uppercase text-gray-600">
              {t("Хаяг:")}
            </h1>
            <p className="text-sm text-gray-800">{t("НҮБын")}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xs font-medium leading-[13px] uppercase text-gray-600">
              {t("Ажиллаххуваарь")}
            </h1>
            <p className="text-sm text-gray-800 leading-relaxed">
              {t("Дава0")}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 sm:gap-8">
          <div className="flex gap-4">
            <Link
              href="https://x.com/UNDPMongolia"
              aria-label="Visit UNDP Mongolia on X"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <XIcon />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/undp.mongolia"
              aria-label="Visit UNDP Mongolia on Facebook"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <FacebookIcon />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/undpmongolia/"
              aria-label="Visit UNDP Mongolia on Instagram"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3165AC] rounded-full transition-transform hover:scale-110">
                <IgIcon />
              </div>
            </Link>
          </div>
          <Button
            className="text-black hover:no-underline font-normal px-0 py-1 h-7 flex items-center"
            variant="link"
            asChild
          >
            <Link href="https://erxes.mn/" aria-label="Powered by Erxes">
              Powered by
              <ErxesLogo fill="#000" className="ml-1 h-7 w-14" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
