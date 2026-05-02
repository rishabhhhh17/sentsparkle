export type SystemDiscountCode = {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderPaise: number;
};

export const SYSTEM_DISCOUNT_CODES: SystemDiscountCode[] = [
  { code: 'WELCOME15',    type: 'percentage', value:  15, minOrderPaise: 0 },
  { code: 'TESTORDER100', type: 'percentage', value: 100, minOrderPaise: 0 },
];

export function findSystemDiscountCode(input: string): SystemDiscountCode | null {
  const normalized = input.trim().toUpperCase();
  return SYSTEM_DISCOUNT_CODES.find((c) => c.code === normalized) ?? null;
}

export function computeSystemDiscountAmount(
  code: SystemDiscountCode,
  subtotalPaise: number,
): number {
  if (code.type === 'percentage') {
    return Math.round((subtotalPaise * code.value) / 100);
  }
  return Math.min(code.value, subtotalPaise);
}

export const RAZORPAY_MIN_PAISE = 100;

export function clampDiscountForMinTotal(
  subtotalPaise: number,
  discountPaise: number,
  shippingPaise: number,
): { discount: number; total: number } {
  const total = subtotalPaise - discountPaise + shippingPaise;
  if (total >= RAZORPAY_MIN_PAISE) {
    return { discount: discountPaise, total };
  }
  const reduced = Math.max(0, subtotalPaise + shippingPaise - RAZORPAY_MIN_PAISE);
  return {
    discount: reduced,
    total: subtotalPaise - reduced + shippingPaise,
  };
}
