'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useCart } from './cart-provider';
import {
  calcSubtotal,
  calcShipping,
  calcTax,
  calcTotal,
  getEffectivePrice,
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/shop/cart-utils';

export function OrderSummaryPanel() {
  const { state } = useCart();
  const { items } = state;
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const tax = calcTax(subtotal);
  const total = calcTotal(items);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 sticky top-28">
      <h2 className="font-headline text-base uppercase tracking-wider">Order Summary</h2>
      <Separator />

      {/* Items */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const unitPrice = getEffectivePrice(item);
          return (
            <div
              key={`${item.product.id}__${item.selectedVariant?.id ?? 'default'}`}
              className="flex gap-3 items-start"
            >
              <div className="relative h-12 w-12 flex-shrink-0 rounded-md border border-border overflow-hidden bg-muted">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                {item.selectedVariant && (
                  <p className="text-[10px] text-muted-foreground">{item.selectedVariant.label}</p>
                )}
              </div>
              <span className="text-xs font-semibold flex-shrink-0">
                {formatPrice(unitPrice * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <p className="text-[11px] text-muted-foreground">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
          </p>
        )}
        <div className="flex justify-between text-muted-foreground">
          <span>GST (18%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base pt-1">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
