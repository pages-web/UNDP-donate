import { usePaymentConfig } from "@/sdk/queries/payment";
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentType from "./payment-type";
import { Loading } from "@/components/ui/loading";
import { useAtom } from "jotai";
import { handleMethodAtom } from "@/store/payment.store";
import { useDonate } from "../donate/donate";
import { useEffect } from "react";

const PaymentMethods = () => {
  const { loading, payments } = usePaymentConfig();
  const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);
  const { detail } = useDonate();

  useEffect(() => {
    if (payments.length === 1) {
      setSelectedPayment(payments[0]._id);
    }
  }, [loading, payments]);

  return (
    <>
      <h2 className="font-medium text-foreground mb-4 flex justify-between items-center">
        Төлбөрийн төрлөө сонгоно уу{" "}
        <span className="font-bold">
          {detail?.totalAmount.toLocaleString()}₮
        </span>
      </h2>
      {loading ? (
        <Loading className="pt-32 pb-24" />
      ) : payments.length === 1 ? null : (
        <RadioGroup
          value={selectedPayment}
          onValueChange={(value) => setSelectedPayment(value)}
        >
          <div className="space-y-3">
            <div className="grid gap-4">
              {payments.map(({ kind, _id, name }) => (
                <PaymentType
                  selected={selectedPayment === kind}
                  kind={kind}
                  _id={_id}
                  name={name}
                />
              ))}
            </div>
          </div>
        </RadioGroup>
      )}
    </>
  );
};

export default PaymentMethods;
