'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutForm } from '@/components/shop/checkout-form';
import { OrderSummaryPanel } from '@/components/shop/order-summary-panel';
import { useCart } from '@/components/shop/cart-provider';

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (state.items.length === 0) {
      router.replace('/shop');
    }
  }, [state.items.length, router]);

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4 text-center min-h-screen">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild>
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl uppercase">
          Check<span className="text-primary">out</span>
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          You&apos;re just a few steps away from your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Checkout form — 3 columns */}
        <div className="lg:col-span-3">
          <CheckoutForm />
        </div>

        {/* Order summary — 2 columns */}
        <div className="lg:col-span-2">
          <OrderSummaryPanel />
        </div>
      </div>
    </div>
  );
}
