'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from './cart-provider';
import { formatPrice, getEffectivePrice, calcSubtotal, calcShipping, calcTax, calcTotal } from '@/lib/shop/cart-utils';
import type { CheckoutFormData } from '@/lib/shop/types';

const PAYMENT_LABELS: Record<string, string> = {
  card: 'Credit / Debit Card',
  upi: 'UPI',
  cod: 'Cash on Delivery',
};

interface CheckoutStepReviewProps {
  formData: CheckoutFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function CheckoutStepReview({ formData, onBack, onSubmit, isSubmitting }: CheckoutStepReviewProps) {
  const { state } = useCart();
  const { items } = state;
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const tax = calcTax(subtotal);
  const total = calcTotal(items);
  const { shipping: addr, payment } = formData;

  return (
    <div className="space-y-6">
      <h3 className="font-headline text-lg uppercase">Review Your Order</h3>

      {/* Shipping summary */}
      <div className="rounded-lg border border-border p-4 space-y-1">
        <p className="text-sm font-semibold mb-2">Deliver to</p>
        <p className="text-sm">{addr.firstName} {addr.lastName}</p>
        <p className="text-sm text-muted-foreground">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
        <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} — {addr.pincode}</p>
        <p className="text-sm text-muted-foreground">{addr.phone} · {addr.email}</p>
      </div>

      {/* Payment summary */}
      <div className="rounded-lg border border-border p-4 space-y-1">
        <p className="text-sm font-semibold mb-2">Payment</p>
        <p className="text-sm text-muted-foreground">{PAYMENT_LABELS[payment.method]}</p>
        {payment.method === 'upi' && payment.upiId && (
          <p className="text-sm text-muted-foreground">UPI ID: {payment.upiId}</p>
        )}
      </div>

      {/* Items */}
      <div className="rounded-lg border border-border divide-y divide-border">
        {items.map((item) => (
          <div
            key={`${item.product.id}__${item.selectedVariant?.id ?? 'default'}`}
            className="flex justify-between items-center px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-muted-foreground text-xs">
                {item.selectedVariant?.label ? `${item.selectedVariant.label} · ` : ''}
                Qty {item.quantity}
              </p>
            </div>
            <span className="font-semibold">{formatPrice(getEffectivePrice(item) * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 dark:text-green-400">FREE</span> : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>GST (18%)</span><span>{formatPrice(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Placing Order...
            </>
          ) : (
            `Place Order — ${formatPrice(total)}`
          )}
        </Button>
      </div>
    </div>
  );
}
