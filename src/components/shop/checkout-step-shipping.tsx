'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CheckoutFormData } from '@/lib/shop/types';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

interface CheckoutStepShippingProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function CheckoutStepShipping({ form }: CheckoutStepShippingProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="space-y-5">
      <h3 className="font-headline text-lg uppercase">Shipping Address</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register('shipping.firstName')} placeholder="Rahul" />
          {errors.shipping?.firstName && (
            <p className="text-xs text-destructive">{errors.shipping.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register('shipping.lastName')} placeholder="Sharma" />
          {errors.shipping?.lastName && (
            <p className="text-xs text-destructive">{errors.shipping.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" type="email" {...register('shipping.email')} placeholder="rahul@example.com" />
        {errors.shipping?.email && (
          <p className="text-xs text-destructive">{errors.shipping.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" type="tel" {...register('shipping.phone')} placeholder="+91 98765 43210" />
        {errors.shipping?.phone && (
          <p className="text-xs text-destructive">{errors.shipping.phone.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="addressLine1">Address Line 1 *</Label>
        <Input id="addressLine1" {...register('shipping.addressLine1')} placeholder="House / Flat no., Street name" />
        {errors.shipping?.addressLine1 && (
          <p className="text-xs text-destructive">{errors.shipping.addressLine1.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input id="addressLine2" {...register('shipping.addressLine2')} placeholder="Landmark, Area" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register('shipping.city')} placeholder="Mumbai" />
          {errors.shipping?.city && (
            <p className="text-xs text-destructive">{errors.shipping.city.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="state">State *</Label>
          <Select
            value={watch('shipping.state')}
            onValueChange={(val) => setValue('shipping.state', val, { shouldValidate: true })}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.shipping?.state && (
            <p className="text-xs text-destructive">{errors.shipping.state.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input id="pincode" {...register('shipping.pincode')} placeholder="400001" maxLength={6} />
          {errors.shipping?.pincode && (
            <p className="text-xs text-destructive">{errors.shipping.pincode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
