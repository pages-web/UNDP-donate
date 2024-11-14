import { IPayment } from '../types/payment.types';
import { atom } from 'jotai';

export const openMethodsAtom = atom<boolean>(true);
export const openDetailAtom = atom<boolean>(false);
export const selectedMethodAtom = atom<string>('');

export const handleMethodAtom = atom(
  get => get(selectedMethodAtom),
  (_, set, method: string) => {
    set(selectedMethodAtom, method);
    if (method) {
      set(openMethodsAtom, false);
      set(openDetailAtom, true);
    } else {
      set(openMethodsAtom, true);
      set(openDetailAtom, false);
    }
  }
);
