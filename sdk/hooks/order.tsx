import {
  type ApolloError,
  useMutation,
  type OperationVariables,
  BaseMutationOptions
} from '@apollo/client';
import { mutations } from '../graphql/order';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  activeOrderAtom,
  cudOrderAtom,
  loadingOrderAtom,
  orderParamsAtom
} from '../../store/order.store';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { IOrder } from '../../types/order.types';
import { ORDER_SALE_STATUS } from '../../lib/constants';
import { onError } from '../../lib/utils';

const refetchQueries = ['CurrentOrder'];

export const useOrderCUD = () => {
  const params = useAtomValue(orderParamsAtom);
  const [triggerCUDOrder, changeTrigger] = useAtom(cudOrderAtom);
  const setLoading = useSetAtom(loadingOrderAtom);
  const { _id, items } = params;

  const onError = (error: ApolloError) => {
    setLoading(false);
    changeTrigger(false);
    toast.error(error.message);
  };

  const [add] = useMutation(mutations.ordersAdd, {
    onError,
    refetchQueries
  });
  const [edit] = useMutation(mutations.ordersEdit, {
    onError,
    refetchQueries
  });

  const [remove] = useMutation(mutations.ordersCancel, {
    onError,
    refetchQueries
  });

  useEffect(() => {
    if (triggerCUDOrder) {
      setLoading(true);
      if (_id) {
        if (items.length > 0) {
          edit({ variables: params });
        } else {
          remove({
            variables: params
          });
        }
      } else {
        add({
          variables: params
        });
      }
    }
  }, [triggerCUDOrder]);

  return {};
};

export const useOrderChangeSaleStatus = () => {
  const { _id } = useAtomValue(activeOrderAtom) as IOrder;

  const [change, { loading }] = useMutation(mutations.orderChangeSaleStatus, {
    refetchQueries,
    onError
  });

  const handleConfirm = (onCompleted?: BaseMutationOptions['onCompleted']) => {
    change({
      variables: {
        _id,
        saleStatus: ORDER_SALE_STATUS.CONFIRMED
      },
      onCompleted
    });
  };

  return { handleConfirm, loading };
};

export const useCancelOrder = () => {
  const [cancel, { loading }] = useMutation(mutations.ordersCancel, {
    onError
  });

  return { cancel, loading };
};
