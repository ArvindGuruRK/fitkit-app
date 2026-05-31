import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight, CalendarDays } from 'lucide-react';
import { EventGrid } from '@/components/events/event-grid';
import { EventFilterBar } from '@/components/events/event-filter-bar';
import { filterEvents, getFeaturedEvents } from '@/lib/events/events';
import { EventCard } from '@/components/events/event-card';

interface Props {
  searchParams: Promise<{ category?: string; status?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {
  const { category, status } = await searchParams;
  const filtered = filterEvents({ category, status });
  const featured = getFeaturedEvents();
  const showFeatured = !category && !status;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/15 via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-3">
            Fit <span className="text-primary">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Discover, register, and compete in fitness events across India. Marathons, HIIT challenges, yoga retreats, and more.
          </p>
          <div className="flex justify-center gap-10 mt-8">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <CalendarDays className="h-5 w-5 text-primary" />
                {filtered.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Events</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-foreground font-headline">10K+</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Participants</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-foreground font-headline">6</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Categories</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Events</span>
        </nav>

        {/* Featured strip (only shown when no filters active) */}
        {showFeatured && featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-headline font-bold text-foreground mb-5">
              Featured Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featured.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Filter bar */}
        <h2 className="text-xl font-headline font-bold text-foreground mb-5">
          {showFeatured ? 'All Events' : 'Filtered Events'}
        </h2>
        <Suspense>
          <EventFilterBar />
        </Suspense>

        {/* Grid */}
        <EventGrid events={filtered} />
      </main>
    </>
  );
}
