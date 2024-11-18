import { usePaymentConfig } from "../../sdk/queries/payment";
import { RadioGroup } from "../../app/[locale]/components/ui/radio-group";
import PaymentType from "./payment-type";
import { Loading } from "../../app/[locale]/components/ui/loading";
import { useAtom } from "jotai";
import { handleMethodAtom } from "../../store/payment.store";
import { useDonate } from "../donate/donate";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import React from "react";
const PaymentMethods = () => {
  const { loading, payments } = usePaymentConfig();
  const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);
  const { detail } = useDonate();
  const t = useTranslations();
  useEffect(() => {
    if (payments.length === 1) {
      setSelectedPayment(payments[0]._id);
    }
  }, [loading, payments]);

  return (
    <>
      <h2 className="font-medium mb-4 flex justify-between items-center text-white">
        {t("Төлбө")}
        <span className="font-bold text-black">
          {detail?.totalAmount.toLocaleString()}₮
        </span>
      </h2>
      {loading ? (
        <Loading className="pt-32 pb-20" />
      ) : payments.length === 1 ? null : (
        <div></div>
      )}
    </>
  );
};

export default PaymentMethods;
