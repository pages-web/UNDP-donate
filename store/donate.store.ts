import { OrderItem } from "../types/order.types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedPriceAtom = atom<string | number | null>(null);

export const donateViewAtom = atomWithStorage<string>("donateView", "");

export const donateOrderIdAtom = atomWithStorage<string>("donateOrderId", "");

export const donateItemAtom = atom<OrderItem | null>(null);

export const deliveryInfoAtom = atom<{
  name: string;
  email: string;
  description: string;
}>({ name: "", email: "", description: "" });
