import { usePaymentConfig } from "@/sdk/queries/payment";
import { RadioGroup } from "../../app/[locale]/components/ui/radio-group";
import PaymentType from "./payment-type";
import { Loading } from "../../app/[locale]/components/ui/loading";
import { useAtom, useAtomValue } from "jotai";
import { handleMethodAtom } from "@/store/payment.store";
import { useDonate } from "../donate/donate";
import { useEffect } from "react";
import { selectedPriceAtom } from "@/store/donate.store";
const PaymentMethods = () => {
  const { loading, payments } = usePaymentConfig();
  const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);
  const { detail } = useDonate();

  useEffect(() => {
    if (payments.length === 1) {
      setSelectedPayment(payments[0]._id);
    }
  }, [loading, payments]);
  const selectedPrice = useAtomValue(selectedPriceAtom);
  return (
    <>
      <h2 className="">
        {selectedPrice && (
          <div className="text-primary text-[40px]  font-semibold font-sans">
            {selectedPrice}
          </div>
        )}
      </h2>
      {loading ? (
        <Loading className="" />
      ) : payments.length === 1 ? null : (
        <RadioGroup
          value={selectedPayment}
          onValueChange={(value) => setSelectedPayment(value)}
        >
          <div className="">
            <div className="">
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
