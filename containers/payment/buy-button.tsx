import { Button } from "../../app/[locale]/components/ui/button";
import PaymentMethods from "./payment-methods-dialog";
import PaymentDetail from "./payment-detail-dialog";
import { useAtomValue, useSetAtom } from "jotai";
import {
  openDetailAtom,
  openMethodsAtom,
  selectedMethodAtom,
} from "../../store/payment.store";

import React from "react";
import { useTranslations } from "next-intl";
const BuyButton = () => {
  const setOpenMethods = useSetAtom(openMethodsAtom);
  const setOpenDetails = useSetAtom(openDetailAtom);
  const selectedMethod = useAtomValue(selectedMethodAtom);
  const t = useTranslations();
  const handlePay = () => {
    if (selectedMethod) return setOpenDetails(true);
    setOpenMethods(true);
  };

  return (
    <>
      <Button size="lg" className="md:h-12 md:px-8" onClick={handlePay}>
        {t("Төлбөртөлөх")}
      </Button>
      <PaymentMethods />
      <PaymentDetail />
    </>
  );
};

export default BuyButton;
