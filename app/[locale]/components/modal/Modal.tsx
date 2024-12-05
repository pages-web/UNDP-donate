import React from "react";
import { Button } from "../../components/ui/button";
import Tsahim from "../titles/Tsahim";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useTranslations } from "use-intl";
import TsahimWrapper from "../titles/TsahimWrapper";

const Modal = () => {
  const t = useTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex px-[21px] py-2.5 justify-center items-center rounded-[100px] bg-[#3165AC] text-white"
          variant="outline"
        >
          {t("Хандивөгөх")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-[24px] bg-[#FFF]">
        <TsahimWrapper />
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
