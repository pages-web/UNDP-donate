import Image from "next/image";
import { EmailIcon } from "../../components/svg/MailIcon";
import { WorldIcon } from "../../components/svg/WorldIcon";
import { ShareIcon } from "../../components/svg/ShareIcon";
import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <div className="bg-[rgb(241,105,38)] px-4 sm:px-10 md:px-20 lg:px-38 xl:px-60 2xl:px-80 py-6 lg:pt-9 lg:pb-5 flex flex-col gap-6 md:gap-10">
      <div className="flex flex-wrap lg:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div className="flex gap-2 items-center">
          <Image alt="" width={24} height={24} src={"/images/phone.png"} />
          <h1 className="text-white text-sm sm:text-base md:text-lg font-bold">
            7755 7071
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          <EmailIcon />
          <h1 className="text-white text-sm sm:text-base md:text-lg font-bold">
            info@educated.mn
          </h1>
        </div>

        <Link href={"https://educated.mn/"}>
          <div className="flex gap-2 items-center">
            <WorldIcon />
            <h1 className="text-white text-sm sm:text-base md:text-lg font-bold underline cursor-pointer">
              www.educated.mn
            </h1>
          </div>
        </Link>

        <div className="flex gap-2 items-center">
          <ShareIcon />
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              "https://educated.mn/"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="text-white text-sm sm:text-base md:text-lg font-bold underline cursor-pointer">
              Share to Facebook
            </h1>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <h1 className="text-white text-xs sm:text-sm font-medium">
          © Educated Enterprise 2024
        </h1>
      </div>
    </div>
  );
};

export default Footer;