'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import type { CheckoutFormData } from '@/lib/shop/types';

interface CheckoutStepPaymentProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function CheckoutStepPayment({ form }: CheckoutStepPaymentProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const method = watch('payment.method');

  return (
    <div className="space-y-5">
      <h3 className="font-headline text-lg uppercase">Payment Method</h3>

      <RadioGroup
        value={method}
        onValueChange={(val) => setValue('payment.method', val as 'card' | 'upi' | 'cod', { shouldValidate: true })}
        className="space-y-3"
      >
        {/* Card */}
        <label
          htmlFor="method-card"
          className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition-colors has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
        >
          <RadioGroupItem value="card" id="method-card" />
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Credit / Debit Card</p>
            <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
          </div>
        </label>

        {/* UPI */}
        <label
          htmlFor="method-upi"
          className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition-colors has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
        >
          <RadioGroupItem value="upi" id="method-upi" />
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">UPI</p>
            <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
          </div>
        </label>

        {/* COD */}
        <label
          htmlFor="method-cod"
          className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition-colors has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
        >
          <RadioGroupItem value="cod" id="method-cod" />
          <Banknote className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Cash on Delivery</p>
            <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
          </div>
        </label>
      </RadioGroup>

      {/* Conditional card fields */}
      {method === 'card' && (
        <div className="rounded-lg border border-border p-4 space-y-4 bg-muted/20">
          <p className="text-xs text-muted-foreground italic">
            Demo only — no real payment is processed.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="4242 4242 4242 4242" maxLength={19} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" maxLength={5} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="•••" maxLength={3} type="password" />
            </div>
          </div>
        </div>
      )}

      {method === 'upi' && (
        <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/20">
          <div className="space-y-1.5">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              {...register('payment.upiId')}
              placeholder="yourname@upi"
            />
            {errors.payment?.upiId && (
              <p className="text-xs text-destructive">{errors.payment.upiId.message}</p>
            )}
          </div>
        </div>
      )}

      {method === 'cod' && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-sm text-muted-foreground">
          ✓ You will pay in cash when your order is delivered. A small COD convenience fee of ₹30 may apply.
        </div>
      )}
    </div>
  );
}
