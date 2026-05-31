'use client';

import { useState } from 'react';
import { CheckCircle, Loader2, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { FitEvent } from '@/lib/events/types';
import Link from 'next/link';

type Step = 'form' | 'confirming' | 'success';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  event: FitEvent;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  label?: string;
}

export function EventRegisterModal({
  event,
  disabled = false,
  variant = 'default',
  label = 'Register Now',
}: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setStep('confirming');
    setTimeout(() => {
      const id = `TKT-${Date.now().toString(36).toUpperCase()}`;
      setTicketId(id);
      setStep('success');
      toast({
        title: 'Registration confirmed!',
        description: `You're registered for ${event.title}. Check your tickets in the dashboard.`,
      });
    }, 1500);
  }

  function handleOpen() {
    setStep('form');
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    setTicketId('');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button
        size="sm"
        variant={variant}
        onClick={handleOpen}
        disabled={disabled}
        className="shrink-0"
      >
        <Ticket className="h-3.5 w-3.5 mr-1.5" />
        {disabled ? 'Sold Out' : label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          {step === 'form' && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline">Register for Event</DialogTitle>
                <DialogDescription className="line-clamp-2">{event.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input
                    id="reg-name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email">Email Address</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-phone">Mobile Number</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Registration fee</span>
                  <span className="font-bold text-primary text-base">
                    {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <Button className="w-full" onClick={handleSubmit}>
                  Confirm Registration
                </Button>
              </div>
            </>
          )}

          {step === 'confirming' && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Processing your registration…</p>
            </div>
          )}

          {step === 'success' && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-center">You&apos;re Registered!</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 pt-2">
                <CheckCircle className="h-14 w-14 text-green-500" />
                <div className="text-center space-y-1">
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date} · {event.location}</p>
                </div>
                <Separator className="w-full" />
                <div className="w-full space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attendee</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket ID</span>
                    <span className="font-mono font-medium text-primary">{ticketId}</span>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 pt-2">
                  <Button asChild>
                    <Link href="/dashboard/tickets" onClick={handleClose}>
                      View My Tickets
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleClose}>
                    Done
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
