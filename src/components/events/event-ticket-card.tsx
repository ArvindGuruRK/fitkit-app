import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QrTicketModal } from './qr-ticket-modal';
import type { EventTicket } from '@/lib/events/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatRegisteredAt(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function EventTicketCard({ ticket }: { ticket: EventTicket }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36 w-full bg-muted">
        <Image
          src={ticket.bannerImage}
          alt={ticket.eventTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary/90 hover:bg-primary text-white border-0 text-xs">
            Confirmed
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground leading-tight">{ticket.eventTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">For: {ticket.attendeeName}</p>
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{formatDate(ticket.eventDate)} · {ticket.eventTime.split('–')[0].trim()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{ticket.eventLocation}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span>Ticket </span>
            <span className="font-mono font-semibold text-primary">{ticket.ticketId}</span>
            <br />
            <span>Registered {formatRegisteredAt(ticket.registeredAt)}</span>
          </div>
          <QrTicketModal ticket={ticket} />
        </div>
      </CardContent>
    </Card>
  );
}
