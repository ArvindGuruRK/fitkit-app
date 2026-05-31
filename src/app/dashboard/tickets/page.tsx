import { Ticket } from 'lucide-react';
import { EventTicketCard } from '@/components/events/event-ticket-card';
import { MOCK_USER_TICKETS } from '@/lib/events/events';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TicketsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            My Event Tickets
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {MOCK_USER_TICKETS.length} registered event{MOCK_USER_TICKETS.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/events">Browse More Events</Link>
        </Button>
      </div>

      {MOCK_USER_TICKETS.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Ticket className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No tickets yet</p>
          <p className="text-sm mt-1 mb-6">Register for an event to see your tickets here.</p>
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MOCK_USER_TICKETS.map((ticket) => (
            <EventTicketCard key={ticket.ticketId} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
