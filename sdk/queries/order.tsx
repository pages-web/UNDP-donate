import {
  type OperationVariables,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { queries, subscriptions } from "../graphql/order";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom } from "../../store/auth.store";
import {
  initialLoadingOrderAtom,
  loadingOrderAtom,
  activeOrderAtom,
} from "../../store/order.store";
import { defaultOrderItem, cudOrderAtom } from "../../store/order.store";
import { localCartAtom } from "../../store/cart.store";
import { OrderItem } from "../../types/order.types";
import { useEffect, useMemo } from "react";
import { ORDER_SALE_STATUS, ORDER_STATUSES } from "../../lib/constants";
import { onError } from "../../lib/utils";

const useCurrentOrder = () => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const setCurrentAtom = useSetAtom(activeOrderAtom);
  const [localCart, setLocalCart] = useAtom(localCartAtom);
  const setLoadingOrder = useSetAtom(loadingOrderAtom);
  const setInitialLoadingOrder = useSetAtom(initialLoadingOrderAtom);
  const setTriggerCRUD = useSetAtom(cudOrderAtom);

  const { data, error, loading } = useQuery(queries.currentOrder, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CART,
      perPage: 1,
      page: 1,
      sortField: "createdAt",
      sortDirection: -1,
    },
    skip: !erxesCustomerId,
  });

  const fullOrders = useMemo(() => data?.fullOrders, [data]);

  useEffect(() => {
    if (fullOrders) {
      const currentOrder = (fullOrders || [])[0];
      setLoadingOrder(false);
      setInitialLoadingOrder(false);
      setTriggerCRUD(false);
      setCurrentAtom(currentOrder || defaultOrderItem);
      if (localCart.length > 0) {
        if (!currentOrder) {
          setCurrentAtom({
            ...currentOrder,
            items: localCart,
          });
        } else {
          setCurrentAtom({
            ...currentOrder,
            items: syncCarts(localCart, currentOrder.items),
          });
        }
        setTriggerCRUD(true);
        setLocalCart([]);
      }
    }
  }, [fullOrders]);

  const currentOrder = (fullOrders || [])[0];

  return { loading, currentOrder, error };
};

const syncCarts = (localCart: OrderItem[], items: OrderItem[]) => {
  const synchronizedCart = localCart.map((localItem) => {
    const matchingSavedItem = items.find(
      (savedItem) => savedItem.productId === localItem.productId
    );
    if (matchingSavedItem) {
      return { ...localItem, count: localItem.count + matchingSavedItem.count };
    } else {
      return localItem;
    }
  });

  items.forEach((savedItem) => {
    const isAlreadyInLocalCart = synchronizedCart.some(
      (localItem) => localItem.productId === savedItem.productId
    );
    if (!isAlreadyInLocalCart) {
      synchronizedCart.push(savedItem);
    }
  });

  return synchronizedCart;
};

export const useFullOrders = (props?: { variables?: OperationVariables }) => {
  const { variables } = props || {};
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const { data, loading, refetch } = useQuery(queries.fullOrders, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CONFIRMED,
      sortField: "createdAt",
      sortDirection: -1,
      ...variables,
    },
    onError,
    skip: !erxesCustomerId,
  });

  const fullOrders = useMemo(() => data?.fullOrders, [data]);

  return { fullOrders, loading, refetch };
};

export const useOrderDetail = (id: string) => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const { data, loading, subscribeToMore, refetch } = useQuery(
    queries.orderDetail,
    {
      variables: {
        customerId: erxesCustomerId,
        id,
      },
      onError,
    }
  );

  const { orderDetail } = data || {};
  const { _id } = orderDetail || {};

  useEffect(() => {
    if (_id) {
      subscribeToMore({
        document: subscriptions.ordersOrdered,
        variables: {
          token: process.env.NEXT_PUBLIC_POS_TOKEN,
          statuses: ORDER_STATUSES.ALL,
          customerId: erxesCustomerId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          const { ordersOrdered } = subscriptionData.data || {};
          if (!ordersOrdered) return prev;
          if (ordersOrdered._id === _id) {
            refetch();
          }
          return prev;
        },
      });
    }
  }, [_id]);

  return { orderDetail, loading };
};

export const useCheckRegister = (onCompleted?: (name: string) => void) => {
  const [checkRegister, { loading }] = useLazyQuery(
    queries.ordersCheckCompany,
    {
      onError,
      onCompleted(data) {
        const { found, name } = (data || {}).ordersCheckCompany || {};

        onCompleted && onCompleted(!found ? "" : name || "Demo company");
      },
    }
  );
  return { checkRegister, loading };
};

export default useCurrentOrder;
