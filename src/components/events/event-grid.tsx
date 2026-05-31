import type { FitEvent } from '@/lib/events/types';
import { EventCard } from './event-card';

interface Props {
  events: FitEvent[];
}

export function EventGrid({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">No events found</p>
        <p className="text-sm mt-1">Try adjusting your filters to see more events.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
