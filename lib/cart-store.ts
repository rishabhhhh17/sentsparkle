'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  clampDiscountForMinTotal,
  computeSystemDiscountAmount,
  findSystemDiscountCode,
} from './discounts';

export type CartLine = {
  productId: string;
  variantId: string;
  productSlug: string;
  productName: string;
  variantLabel: string;
  unitPaise: number;
  qty: number;
  image: string;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  discountCode: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (line: Omit<CartLine, 'qty'> & { qty?: number }) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  applyCode: (code: string) => { ok: true } | { ok: false; error: string };
  removeCode: () => void;
  count: () => number;
  subtotalPaise: () => number;
  discountPaise: () => number;
  finalTotalPaise: (shippingPaise?: number) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      discountCode: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.variantId === line.variantId);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.variantId === line.variantId ? { ...l, qty: l.qty + (line.qty ?? 1) } : l,
              ),
              isOpen: true,
            };
          }
          return { lines: [...s.lines, { ...line, qty: line.qty ?? 1 }], isOpen: true };
        }),
      remove: (variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId) })),
      setQty: (variantId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.variantId === variantId ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [], discountCode: null }),
      applyCode: (code) => {
        const found = findSystemDiscountCode(code);
        if (!found) return { ok: false, error: 'Invalid code.' };
        set({ discountCode: found.code });
        return { ok: true };
      },
      removeCode: () => set({ discountCode: null }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotalPaise: () => get().lines.reduce((s, l) => s + l.unitPaise * l.qty, 0),
      discountPaise: () => {
        const subtotal = get().subtotalPaise();
        const code = get().discountCode;
        if (!code || subtotal <= 0) return 0;
        const found = findSystemDiscountCode(code);
        if (!found || subtotal < found.minOrderPaise) return 0;
        const raw = computeSystemDiscountAmount(found, subtotal);
        return clampDiscountForMinTotal(subtotal, raw, 0).discount;
      },
      finalTotalPaise: (shippingPaise = 0) => {
        const subtotal = get().subtotalPaise();
        const discount = get().discountPaise();
        return Math.max(0, subtotal - discount + shippingPaise);
      },
    }),
    { name: 'sentsparkle-cart' },
  ),
);
