import type { CartItem } from './types';

export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_COST = 99;
export const GST_RATE = 0.18;

export function itemKey(productId: string, variantId: string | undefined): string {
  return `${productId}__${variantId ?? 'default'}`;
}

export function getEffectivePrice(item: CartItem): number {
  const base = item.product.price;
  const modifier = item.selectedVariant?.priceModifier ?? 0;
  return base + modifier;
}

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getEffectivePrice(item) * item.quantity, 0);
}

export function calcShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function calcTax(subtotal: number): number {
  return Math.round(subtotal * GST_RATE);
}

export function calcTotal(items: CartItem[]): number {
  const subtotal = calcSubtotal(items);
  return subtotal + calcShipping(subtotal) + calcTax(subtotal);
}

export function getTotalItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
