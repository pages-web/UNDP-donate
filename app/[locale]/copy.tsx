"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
const Copy = () => {
  const t = useTranslations();
  return (
    <>
      <div className="space-y-1">
        <Label> {t("Данснугаар")} </Label>
        <div className="relative">
          <Input
            className="px-12 font-bold disabled:opacity-80"
            value="517 6606 219"
            disabled
          />
          <CopyToClipboard
            text="5176606219"
            onCopy={() => toast.success("Данс хуулагдлаа.")}
          >
            <Button
              variant="outline"
              className="absolute right-0 top-0 h-10 w-10 text-black"
              size="icon"
            >
              <CopyIcon className="h-5 w-5" />
            </Button>
          </CopyToClipboard>
          <img
            src="/images/haanbank.png"
            height={40}
            width={40}
            className="absolute top-[1px] left-[1px] bottom-[1px] h-[38px] w-[38px] z-10 rounded text-black"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label> {t("Данснынэр")} </Label>
        <div className="relative">
          <Input
            className="px-12 font-bold disabled:opacity-80 "
            value={t("БоловсролынсанаачилгуудТББ")}
            disabled
          />
          <div className="absolute top-[1px] left-[1px] bottom-[1px] h-[38px] w-[38px] text-black z-10 rounded flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </div>
          <CopyToClipboard
            text={t("БоловсролынсанаачилгуудТББ")}
            onCopy={() => toast.success("Дансны эзэмшигчийн нэр хуулагдлаа.")}
          >
            <Button
              variant="outline"
              className="absolute right-0 top-0 h-10 w-10 text-black"
              size="icon"
            >
              <CopyIcon className="h-5 w-5" />
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
};

export default Copy;
