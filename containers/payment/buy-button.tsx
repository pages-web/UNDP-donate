import { Button } from '../../app/[locale]/components/ui/button';
import PaymentMethods from './payment-methods-dialog';
import PaymentDetail from './payment-detail-dialog';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  openDetailAtom,
  openMethodsAtom,
  selectedMethodAtom
} from '@/store/payment.store';

const BuyButton = () => {
  const setOpenMethods = useSetAtom(openMethodsAtom);
  const setOpenDetails = useSetAtom(openDetailAtom);
  const selectedMethod = useAtomValue(selectedMethodAtom);

  const handlePay = () => {
    if (selectedMethod) return setOpenDetails(true);
    setOpenMethods(true);
  };

  return (
    <>
      <Button size="lg" className="md:h-12 md:px-8" onClick={handlePay}>
        Төлбөр төлөх
      </Button>
      <PaymentMethods />
      <PaymentDetail />
    </>
  );
};

export default BuyButton;
