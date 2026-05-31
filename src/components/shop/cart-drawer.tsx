'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from './cart-provider';
import { CartItemRow } from './cart-item-row';
import {
  calcSubtotal,
  calcShipping,
  calcTax,
  calcTotal,
  getTotalItemCount,
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/shop/cart-utils';

export function CartDrawer() {
  const { state, dispatch } = useCart();
  const { items, isOpen } = state;
  const count = getTotalItemCount(items);
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const tax = calcTax(subtotal);
  const total = calcTotal(items);

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch({ type: open ? 'OPEN_CART' : 'CLOSE_CART' })}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 font-headline text-lg uppercase">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            {count > 0 && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-center text-muted-foreground">Your cart is empty.</p>
            <Button asChild onClick={() => dispatch({ type: 'CLOSE_CART' })}>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="px-6 py-3 bg-muted/30 border-b">
              {amountToFreeShipping > 0 ? (
                <p className="text-xs text-muted-foreground mb-1.5">
                  Add <span className="font-semibold text-foreground">{formatPrice(amountToFreeShipping)}</span> more for free shipping!
                </p>
              ) : (
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1.5">
                  🎉 You qualify for free shipping!
                </p>
              )}
              <Progress value={freeShippingProgress} className="h-1.5" />
            </div>

            <ScrollArea className="flex-1 px-6">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.product.id}__${item.selectedVariant?.id ?? 'default'}`}
                    item={item}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="border-t px-6 py-4 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full"
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
              >
                <Link href="/shop/checkout">Proceed to Checkout</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
