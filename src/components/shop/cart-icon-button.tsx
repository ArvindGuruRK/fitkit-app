'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';
import { getTotalItemCount } from '@/lib/shop/cart-utils';

export function CartIconButton() {
  const { state, dispatch } = useCart();
  const count = getTotalItemCount(state.items);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Cart (${count} items)`}
      onClick={() => dispatch({ type: 'OPEN_CART' })}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Button>
  );
}
