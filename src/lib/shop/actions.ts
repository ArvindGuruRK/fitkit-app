'use server';

import { z } from 'zod';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
});

const paymentSchema = z.object({
  method: z.enum(['card', 'upi', 'cod']),
  upiId: z.string().optional(),
});

export type PlaceOrderState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  orderId: string | null;
};

export async function placeOrderAction(
  _prevState: PlaceOrderState,
  formData: FormData
): Promise<PlaceOrderState> {
  try {
    const raw = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      addressLine1: formData.get('addressLine1') as string,
      addressLine2: (formData.get('addressLine2') as string) || undefined,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      pincode: formData.get('pincode') as string,
      method: formData.get('method') as string,
      upiId: (formData.get('upiId') as string) || undefined,
    };

    const shippingResult = shippingSchema.safeParse(raw);
    if (!shippingResult.success) {
      return {
        status: 'error',
        message: shippingResult.error.errors[0].message,
        orderId: null,
      };
    }

    const paymentResult = paymentSchema.safeParse({ method: raw.method, upiId: raw.upiId });
    if (!paymentResult.success) {
      return {
        status: 'error',
        message: paymentResult.error.errors[0].message,
        orderId: null,
      };
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const orderId = `FK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;

    return {
      status: 'success',
      message: 'Order placed successfully!',
      orderId,
    };
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
      orderId: null,
    };
  }
}
