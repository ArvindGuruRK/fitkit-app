'use client';

import { useState } from 'react';
import { QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { EventTicket } from '@/lib/events/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function QrTicketModal({ ticket }: { ticket: EventTicket }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <QrCode className="h-4 w-4 mr-1.5" />
        View QR
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-headline text-center">Event Ticket</DialogTitle>
            <DialogDescription className="text-center text-xs">
              Present this QR code at the event entrance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center space-y-0.5">
              <p className="font-semibold text-foreground text-sm">{ticket.eventTitle}</p>
              <p className="text-xs text-muted-foreground">{formatDate(ticket.eventDate)}</p>
              <p className="text-xs text-muted-foreground">{ticket.eventLocation}</p>
            </div>

            <Separator />

            <div className="flex justify-center py-2">
              <div className="p-3 bg-white rounded-xl border border-border">
                <QRCodeCanvas
                  value={ticket.qrValue}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#212121"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attendee</span>
                <span className="font-medium text-foreground">{ticket.attendeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket ID</span>
                <span className="font-mono font-medium text-primary">{ticket.ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground truncate max-w-[180px]">
                  {ticket.attendeeEmail}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
