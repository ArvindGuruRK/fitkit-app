import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Package, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Order Confirmed | FitKit 2025',
};

interface ConfirmationPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

function getEstimatedDelivery(): string {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function OrderConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const orderId = params.orderId ?? 'FK-2025-00000';
  const estimatedDelivery = getEstimatedDelivery();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg space-y-8 text-center">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-500/10 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h1 className="font-headline text-4xl uppercase">
            Order <span className="text-primary">Confirmed!</span>
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {/* Order details card */}
        <div className="rounded-xl border border-border bg-card p-6 text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Order ID</span>
            <span className="font-mono font-semibold text-sm bg-muted px-2 py-1 rounded">
              {orderId}
            </span>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to your registered email address.
            </p>
            <p className="text-xs text-muted-foreground">
              You can track your order status from your dashboard once shipped.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild className="flex-1 gap-2">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
