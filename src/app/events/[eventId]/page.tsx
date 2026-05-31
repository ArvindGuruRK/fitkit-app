import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EventDetailHero } from '@/components/events/event-detail-hero';
import { EventGrid } from '@/components/events/event-grid';
import { getEventBySlug, getRelatedEvents } from '@/lib/events/events';
import { EVENT_CATEGORY_LABELS } from '@/lib/events/types';

interface Props {
  params: Promise<{ eventId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const event = getEventBySlug(eventId);
  if (!event) return { title: 'Event Not Found | FitKit' };
  return {
    title: `${event.title} | FitKit Events`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { eventId } = await params;
  const event = getEventBySlug(eventId);
  if (!event) notFound();

  const related = getRelatedEvents(event, 3);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/events" className="hover:text-foreground transition-colors">Events</Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/events?category=${event.category}`}
          className="hover:text-foreground transition-colors"
        >
          {EVENT_CATEGORY_LABELS[event.category]}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{event.title}</span>
      </nav>

      {/* Hero section */}
      <EventDetailHero event={event} />

      <Separator className="my-10" />

      {/* Tabs: Overview / Speakers */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {event.speakers && event.speakers.length > 0 && (
            <TabsTrigger value="speakers">Speakers & Coaches ({event.speakers.length})</TabsTrigger>
          )}
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="max-w-3xl">
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <p>{event.description}</p>
          </div>
          {event.address && (
            <div className="mt-6 p-4 rounded-xl border border-border bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Full Address</p>
              <p className="text-sm text-foreground">{event.address}</p>
            </div>
          )}
        </TabsContent>

        {event.speakers && event.speakers.length > 0 && (
          <TabsContent value="speakers">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={speaker.avatarUrl} alt={speaker.name} />
                    <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{speaker.name}</p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="tags">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                #{tag}
              </span>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related events */}
      {related.length > 0 && (
        <>
          <Separator className="my-10" />
          <div>
            <h2 className="text-xl font-headline font-bold text-foreground mb-6">
              More {EVENT_CATEGORY_LABELS[event.category]} Events
            </h2>
            <EventGrid events={related} />
          </div>
        </>
      )}
    </div>
  );
}
