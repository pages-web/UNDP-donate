import { cartItemAtomAtoms } from '../../store/cart.store';
import { itemAtomsAtom, loadingOrderAtom } from '../../store/order.store';
import { currentUserAtom } from '../../store/auth.store';
import { useAtomValue } from 'jotai';

const useCart = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const cart = useAtomValue(cartItemAtomAtoms);
  const items = useAtomValue(itemAtomsAtom);
  const loading = useAtomValue(loadingOrderAtom);

  if (!currentUser) return { cart };

  return { items, loading };
};

export default useCart;
