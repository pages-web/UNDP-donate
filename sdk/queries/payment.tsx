import { useQuery } from '@apollo/client';
import { queries } from '../graphql/payment';
import { IPayment } from '../../types/payment.types';
import { useAtomValue } from 'jotai';
import { configAtom } from '../../store/auth.store';

const usePaymentConfig = () => {
  const config = useAtomValue(configAtom);
  const { erxesAppToken, paymentIds, name } = config || {};

  const { data, loading } = useQuery(queries.payment, {
    context: {
      headers: {
        'erxes-app-token': erxesAppToken
      }
    },
    nextFetchPolicy: 'cache-first',
    skip: !erxesAppToken
  });

  const { payments } = data || {};

  const selectedPayments: IPayment[] = (payments || []).filter(
    (payment: IPayment) => paymentIds?.includes(payment._id)
  );

  return {
    loading,
    payments: selectedPayments,
    name,
    erxesAppToken
  };
};

export { usePaymentConfig };
