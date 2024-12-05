"use client";

import ChooseProducts from "../../app/[locale]/components/choose-products/choose-products";
import { onError } from "@/lib/utils";
import { mutations, queries } from "@/sdk/graphql/order";
import {
  donateItemAtom,
  donateOrderIdAtom,
  donateViewAtom,
  deliveryInfoAtom,
} from "@/store/donate.store";
import { IProduct } from "@/types/product.types";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createContext, useContext, useEffect } from "react";
import DonateInfo from "./info";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../app/[locale]/components/ui/card";
import { Loading } from "../../app/[locale]/components/ui/loading";
import PaymentMethods from "../payment/payment-methods";
import PaymentDetail from "../payment/payment-detail";
import Steps from "../../app/[locale]/components/choose-products/steps";
import { toast } from "sonner";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import { Button } from "../../app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "@/app/[locale]/components/svg/CopyIcon";
type DonateProps = React.PropsWithChildren & {
  loading: boolean;
  action: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => void;
  variables?: OperationVariables | undefined;
  detail?: any;
  refetch: () => void;
};

type ContextProps = DonateProps;

const DonateContext = createContext<ContextProps | null>(null);

export function useDonate() {
  const context = useContext(DonateContext);

  if (!context) {
    throw new Error("useDonate must be used within a <Donate />");
  }

  return context;
}

export type ValidateProduct = (
  func: (params: any) => void,
  params?: any
) => void;
const Donate = ({ products }: { products: IProduct[] }) => {
  const [view, setView] = useAtom(donateViewAtom);
  const [donateOrderId, setDonateOrderId] = useAtom(donateOrderIdAtom);
  const [donateItem, setDonateItem] = useAtom(donateItemAtom);
  const setDeliveryInfo = useSetAtom(deliveryInfoAtom);
  const unitProduct = products?.find(
    (product) => product.unitPrice === 1
  ) as IProduct;

  const { data, loading, refetch } = useQuery(queries.donateOrderDetail, {
    skip: !Boolean(donateOrderId),
    variables: {
      id: donateOrderId,
      customerId: "visitor",
    },
    onCompleted({ orderDetail }) {
      const { items, deliveryInfo } = orderDetail;
      const { _id, productId, count, unitPrice } = items[0] || {};
      setDonateItem({ _id, productId, count, unitPrice });
      !!deliveryInfo && setDeliveryInfo(deliveryInfo);
    },
  });

  const onCompleted = (_id: string) => {
    setDonateOrderId(_id);
    donateOrderId && refetch();
    view === "" && setView("info");
    view === "info" && setView("payment");
  };

  const variables = {
    items: [donateItem],
    totalAmount: (donateItem?.count || 1) * (donateItem?.unitPrice || 1),
    customerType: "visitor",
    type: "eat",
    _id: donateOrderId,
  };

  const [add, orderAdd] = useMutation(mutations.ordersAdd, {
    onError,
    variables,
    onCompleted(data) {
      onCompleted(data?.ordersAdd?._id);
    },
  });

  const [edit, orderEdit] = useMutation(mutations.ordersEdit, {
    onError,
    variables,
    onCompleted(data) {
      onCompleted(data?.ordersEdit?._id);
    },
  });

  const validateProduct: ValidateProduct = (func, params) => {
    if (!donateItem) {
      setView("");
      return toast.error("Мөнгөн дүнгээ оруулана уу");
    }

    if (
      unitProduct &&
      donateItem.productId === unitProduct._id &&
      donateItem.count < 100
    ) {
      setView("");
      return toast.error("Хамгийн багадаа 100₮ оруулана уу");
    }

    return func(params);
  };

  const reset = () => {
    setView("");
    setDonateOrderId("");
    setDonateItem(null);
    setDeliveryInfo({
      name: "",
      email: "",
      description: "",
    });
  };

  const { orderDetail } = data || {};
  const t = useTranslations();

  return (
    <DonateContext.Provider
      value={{
        loading: orderAdd.loading || orderEdit.loading,
        action: donateOrderId ? edit : add,
        variables,
        detail: orderDetail,
        refetch,
      }}
    >
      <Steps validateProduct={validateProduct} />
      <CardHeader className="flex flex-col  p-4 md:flex-col md:items-start md:justify-between">
        <CardTitle className="text-black font-medium text-sm md:text-base">
          Collected donations
        </CardTitle>
        <div className="flex items-start justify-between flex-col gap-y-4 md:flex-row md:gap-6 w-full">
          <PaymentMethods />
          {view === "" && (
            <div className="flex items-center justify-between p-1 gap-12 rounded-[8px] border border-[#EFEFEF]">
              <div className="flex items-center gap-2.5 ">
                <img
                  src="/tbd.png"
                  height={24}
                  width={24}
                  className=" top-[1px] left-[1px] bottom-[1px] h-[24px] w-[24px] z-10 rounded-[7px] "
                />
                <h1 className="text-[#000] font-inter text-sm font-medium leading-normal">
                  5011237899 - UNDP Mongolia
                </h1>
              </div>
              <CopyToClipboard
                text="5011237899"
                onCopy={() => toast.success("Данс хуулагдлаа.")}
              >
                <button className="">
                  <CopyIcon />
                </button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </CardHeader>
      {loading ? (
        <>
          <CardContent className="p-4">
            <Loading />
          </CardContent>
          <CardFooter />
        </>
      ) : (
        <>
          {view === "" && (
            <ChooseProducts
              products={products}
              unitProduct={unitProduct}
              validateProduct={validateProduct}
            />
          )}
          {view === "info" && <DonateInfo />}
          {view === "payment" && (
            <>
              <CardContent className="" />
              <CardFooter className="flex flex-col gap-y-4">
                <PaymentDetail />
              </CardFooter>
            </>
          )}
          {view === "success" && (
            <>
              <CardContent className="p-4 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckIcon className="h-10 w-10 text-white" />
                </div>
                <div className="text-xl font-semibold pt-6 text-center">
                  Your donation has been successfully
                  <span className="block"> received.</span>
                </div>
                <div className="text-neutral-500 pt-2">
                  Thank you for supporting us and donating
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-y-4 p-4">
                <Button
                  size="lg"
                  className="w-full text-white rounded-full"
                  onClick={reset}
                >
                  {t("Эхлах")}
                </Button>
              </CardFooter>
            </>
          )}
        </>
      )}
    </DonateContext.Provider>
  );
};

export default Donate;
