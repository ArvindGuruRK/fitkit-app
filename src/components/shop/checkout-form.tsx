'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutStepShipping } from './checkout-step-shipping';
import { CheckoutStepPayment } from './checkout-step-payment';
import { CheckoutStepReview } from './checkout-step-review';
import { useCart } from './cart-provider';
import { placeOrderAction } from '@/lib/shop/actions';
import type { CheckoutFormData, CheckoutStep } from '@/lib/shop/types';
import { cn } from '@/lib/utils';

const shippingZod = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
});

const checkoutSchema = z.object({
  shipping: shippingZod,
  payment: z.object({
    method: z.enum(['card', 'upi', 'cod']),
    cardLast4: z.string().optional(),
    upiId: z.string().optional(),
  }),
});

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { dispatch } = useCart();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping: {
        firstName: '', lastName: '', email: '', phone: '',
        addressLine1: '', addressLine2: '', city: '', state: '', pincode: '',
      },
      payment: { method: 'cod' },
    },
  });

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  async function handleNextFromShipping() {
    const valid = await form.trigger('shipping');
    if (valid) setCurrentStep('payment');
  }

  async function handleNextFromPayment() {
    const valid = await form.trigger('payment');
    if (valid) setCurrentStep('review');
  }

  function handleSubmit() {
    const values = form.getValues();
    setError(null);

    startTransition(async () => {
      const fd = new FormData();
      fd.append('firstName', values.shipping.firstName);
      fd.append('lastName', values.shipping.lastName);
      fd.append('email', values.shipping.email);
      fd.append('phone', values.shipping.phone);
      fd.append('addressLine1', values.shipping.addressLine1);
      fd.append('addressLine2', values.shipping.addressLine2 ?? '');
      fd.append('city', values.shipping.city);
      fd.append('state', values.shipping.state);
      fd.append('pincode', values.shipping.pincode);
      fd.append('method', values.payment.method);
      fd.append('upiId', values.payment.upiId ?? '');

      const result = await placeOrderAction(
        { status: 'idle', message: '', orderId: null },
        fd
      );

      if (result.status === 'success' && result.orderId) {
        dispatch({ type: 'CLEAR_CART' });
        router.push(`/shop/checkout/confirmation?orderId=${result.orderId}`);
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center gap-0">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all',
                  i < currentStepIndex
                    ? 'border-primary bg-primary text-primary-foreground'
                    : i === currentStepIndex
                    ? 'border-primary text-primary'
                    : 'border-border text-muted-foreground'
                )}
              >
                {i < currentStepIndex ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs font-medium hidden sm:block',
                  i === currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 transition-all',
                  i < currentStepIndex ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <form>
        {currentStep === 'shipping' && (
          <div className="space-y-6">
            <CheckoutStepShipping form={form} />
            <Button type="button" size="lg" className="w-full" onClick={handleNextFromShipping}>
              Continue to Payment
            </Button>
          </div>
        )}

        {currentStep === 'payment' && (
          <div className="space-y-6">
            <CheckoutStepPayment form={form} />
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setCurrentStep('shipping')}>
                Back
              </Button>
              <Button type="button" size="lg" className="flex-1" onClick={handleNextFromPayment}>
                Review Order
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'review' && (
          <>
            {error && (
              <p className="mb-4 rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive border border-destructive/20">
                {error}
              </p>
            )}
            <CheckoutStepReview
              formData={form.getValues()}
              onBack={() => setCurrentStep('payment')}
              onSubmit={handleSubmit}
              isSubmitting={isPending}
            />
          </>
        )}
      </form>
    </div>
  );
}
