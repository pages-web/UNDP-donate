import { handleMethodAtom } from "@/store/payment.store";
import { useAtomValue } from "jotai";
import { usePaymentConfig } from "@/sdk/queries/payment";
import useCreateInvoice from "@/sdk/hooks/payment";
import { IPayment } from "@/types/payment.types";
import { Loading } from "../../app/[locale]/components/ui/loading";
import { useEffect } from "react";
import QrDetail from "./qr-detail";
import PhoneDetail from "./phone-detail";
import { gql, useSubscription } from "@apollo/client";
import { useDonate } from "../donate/donate";

const QR_PAYMENTS = ["qpay", "monpay", "pocket", "qpayQuickqr"];
const PHONE_PAYMENTS = ["socialpay", "storepay"];

const PaymentDetail = () => {
  const selectedMethod = useAtomValue(handleMethodAtom);
  const { name, payments, erxesAppToken, loading } = usePaymentConfig();
  const { refetch } = useDonate();

  const {
    handleCreateInvoice,
    loading: loadingAction,
    reset,
    data,
    invoiceData,
  } = useCreateInvoice({
    posName: name || "",
    appToken: erxesAppToken || "",
  });

  const { errorDescription, status, response, _id } = data || {};
  console.log(response, "a");

  useSubscription(
    gql`
      subscription invoiceUpdated($invoiceId: String!) {
        invoiceUpdated(_id: $invoiceId)
      }
    `,
    {
      variables: { invoiceId: _id },
      skip: !_id,
      onData(options) {
        const { invoiceUpdated } = options.data.data || {};
        if (invoiceUpdated?.status === "paid") {
          refetch();
        }
      },
    }
  );

  const kind = payments?.find((p: IPayment) => p._id === selectedMethod)?.kind;

  const isQr = QR_PAYMENTS.includes(kind || "");
  const isPhone = PHONE_PAYMENTS.includes(kind || "");

  useEffect(() => {
    if (selectedMethod) {
      reset();
    }
    if (isQr) {
      handleCreateInvoice();
    }
  }, [selectedMethod]);

  if (loading) return null;

  if (loading || !kind) return null;

  return (
    <>
      {isQr &&
        (loadingAction ? (
          <Loading className="pb-24" />
        ) : (
          (!!response?.qrData ||
            (isQr && (errorDescription || response?.error))) && (
            <QrDetail
              errorDescription={errorDescription || response?.error}
              status={status}
              qrCode={response?.qrData}
              urls={response?.urls}
              id={invoiceData?.invoiceCreate._id}
            />
          )
        ))}
      {isPhone && (
        <PhoneDetail
          kind={kind}
          loading={loading}
          handleCreate={handleCreateInvoice}
          data={data}
          errorDescription={errorDescription}
        />
      )}
    </>
  );
};

// id
// :
// "058002c0-9066-45c9-9791-b6938ad39a3b"
// payload
// :
// {data: {invoiceUpdated: {_id: "auP-XYnisvmz9Tk6RqFTu", status: "paid"}}}
// data
// :
// {invoiceUpdated: {_id: "auP-XYnisvmz9Tk6RqFTu", status: "paid"}}
// invoiceUpdated
// :
// {_id: "auP-XYnisvmz9Tk6RqFTu", status: "paid"}
// status
// :
// "paid"
// _id
// :
// "auP-XYnisvmz9Tk6RqFTu"
// type
// :
// "next"

export default PaymentDetail;
