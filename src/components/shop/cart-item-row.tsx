'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';
import { getEffectivePrice, formatPrice, itemKey } from '@/lib/shop/cart-utils';
import type { CartItem } from '@/lib/shop/types';

export function CartItemRow({ item }: { item: CartItem }) {
  const { dispatch } = useCart();
  const key = itemKey(item.product.id, item.selectedVariant?.id);
  const unitPrice = getEffectivePrice(item);

  function handleQtyChange(delta: number) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId: item.product.id,
      variantId: item.selectedVariant?.id,
      quantity: item.quantity + delta,
    });
  }

  function handleRemove() {
    dispatch({
      type: 'REMOVE_ITEM',
      productId: item.product.id,
      variantId: item.selectedVariant?.id,
    });
  }

  return (
    <div key={key} className="flex gap-3 py-3">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-sm font-medium leading-tight line-clamp-2">{item.product.name}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 flex-shrink-0 text-muted-foreground hover:text-foreground"
            onClick={handleRemove}
            aria-label="Remove item"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        {item.selectedVariant && (
          <p className="text-xs text-muted-foreground">{item.selectedVariant.label}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleQtyChange(-1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleQtyChange(1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-sm font-semibold text-primary">
            {formatPrice(unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
