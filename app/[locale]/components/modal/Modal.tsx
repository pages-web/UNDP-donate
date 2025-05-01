import React from "react";
import { Button } from "../../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../../components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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

      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>-</DialogTitle>
        </VisuallyHidden>
        <TsahimWrapper />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
