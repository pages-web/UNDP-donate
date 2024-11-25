import { type OperationVariables, useMutation } from "@apollo/client";
import { mutations } from "../graphql/payment";
import { useAtomValue } from "jotai";
import { selectedMethodAtom } from "../../store/payment.store";
import { onError } from "../../lib/utils";
import { useDonate } from "../../containers/donate/donate";
import { deliveryInfoAtom } from "../../store/donate.store";
import { configAtom } from "../../store/auth.store";

const useCreateInvoice = ({
  appToken,
  posName,
}: {
  appToken: string;
  posName: string;
}) => {
  const context = {
    headers: {
      "erxes-app-token": appToken,
    },
  };

  const deliveryInfo = useAtomValue(deliveryInfoAtom);
  const { paymentIds } = useAtomValue(configAtom) || {};
  const selectedPaymentId = useAtomValue(selectedMethodAtom);
  const { detail } = useDonate();
  const [
    addTransaction,
    { loading: addingTransaction, reset: resetTransaction, data },
  ] = useMutation(mutations.addTransaction);

  const [createInvoice, { reset, loading, data: invoiceData }] = useMutation(
    mutations.createInvoice,
    {
      context,
      onError,
      onCompleted({ invoiceCreate }) {
        addTransaction({
          variables: {
            invoiceId: invoiceCreate._id,
            paymentId: selectedPaymentId,
            amount: detail?.totalAmount,
          },
        });
      },
    }
  );

  const handleCreateInvoice = (variables?: OperationVariables) =>
    createInvoice({
      variables: {
        amount: detail?.totalAmount,
        contentType: "pos:orders",
        contentTypeId: detail?._id,
        customerType: "customer",
        description:
          "Өөрийн нэр, утасны дугаарыг бичнэ үү.",
        data: { posToken: process.env.NEXT_PUBLIC_POS_TOKEN },
        paymentIds,
        email: deliveryInfo?.email,
        ...variables,
      },
    });

  const { paymentTransactionsAdd } = data || {};

  return {
    loading: addingTransaction || loading,
    reset: () => {
      reset();
      resetTransaction();
    },
    data: paymentTransactionsAdd,
    invoiceData: invoiceData,
    handleCreateInvoice,
  };
};

export const useCheckInvoice = () => {
  const [checkInvoice, { data, loading }] = useMutation(mutations.checkInvoice);

  const { invoiceCheck } = data || {};

  return { loading, checkInvoice, status: invoiceCheck };
};

export default useCreateInvoice;
