"use client";
import React from "react";
import ChooseProducts from "../../app/[locale]/components/choose-products/choose-products";
import { onError } from "../../lib/utils";
import { mutations, queries } from "../../sdk/graphql/order";
import {
  donateItemAtom,
  donateOrderIdAtom,
  donateViewAtom,
  deliveryInfoAtom,
} from "../../store/donate.store";
import { IProduct } from "../../types/product.types";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useAtom, useSetAtom } from "jotai";
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
import { ArrowLeftIcon, CheckIcon, ShareIcon } from "lucide-react";
import { Button } from "../../app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
  const unitProduct = products.find(
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
      donateItem.count < 50
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
      <CardHeader className="flex items-center justify-between flex-row ">
        <CardTitle className="text-black">{t("Хандивөгөх")}</CardTitle>
        <Steps validateProduct={validateProduct} />
      </CardHeader>
      {loading ? (
        <>
          <CardContent>
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
              <CardContent className="py-0 md:py-0">
                <PaymentMethods />
              </CardContent>
              <CardFooter className="flex-col">
                <PaymentDetail />
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full !mt-4"
                  disabled={loading}
                  onClick={() => setView("info")}
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
                  {t("Буцах")}
                </Button>
              </CardFooter>
            </>
          )}
          {view === "success" && (
            <>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
                    <CheckIcon className="h-10 w-10 stroke-green-700 " />
                  </div>
                  <div className="text-xl font-semibold pt-6 text-center">
                    {t("Танамжилттай")}
                    <span className="block"> {t("хүлээнавлаа")} </span>
                  </div>
                  <div className="text-neutral-500 pt-2">
                    {t("Биднярлалаа")}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-5">
                <Link
                  className="w-full"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    "https://fund.educated.mn/"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full text-white">
                    {t("Тау")}
                  </Button>
                </Link>
                <Button size="lg" className="w-full text-white" onClick={reset}>
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
