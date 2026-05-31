import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { EventRegisterModal } from './event-register-modal';
import { EVENT_CATEGORY_LABELS } from '@/lib/events/types';
import type { FitEvent } from '@/lib/events/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `₹${price.toLocaleString('en-IN')}`;
}

interface Props {
  event: FitEvent;
}

export function EventDetailHero({ event }: Props) {
  const isSoldOut = event.status === 'sold-out';
  const slotsLeft = event.totalSlots - event.registeredCount;
  const slotsPercent = Math.round((event.registeredCount / event.totalSlots) * 100);

  return (
    <div className="space-y-8">
      {/* Banner image */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-muted">
        <Image
          src={event.bannerImage}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-0">
            {EVENT_CATEGORY_LABELS[event.category]}
          </Badge>
          {event.isNew && (
            <Badge className="bg-green-600 hover:bg-green-600 text-white border-0">NEW</Badge>
          )}
          {isSoldOut && (
            <Badge variant="destructive">SOLD OUT</Badge>
          )}
          {event.price === 0 && (
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white border-0">FREE</Badge>
          )}
        </div>
      </div>

      {/* Two-col layout: info + booking card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Event details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground leading-tight">
              {event.title}
            </h1>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">
              {event.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Date</p>
                <p className="text-sm font-semibold text-foreground">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Time</p>
                <p className="text-sm font-semibold text-foreground">{event.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Location</p>
                <p className="text-sm font-semibold text-foreground line-clamp-2">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="text-lg font-headline font-semibold text-foreground mb-3">What&apos;s Included</h2>
            <ul className="space-y-2">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking card */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-md">
          <div className="text-center">
            <p className="text-3xl font-bold font-headline text-primary">
              {formatPrice(event.price)}
            </p>
            {event.originalPrice && (
              <p className="text-sm text-muted-foreground line-through mt-0.5">
                {formatPrice(event.originalPrice)}
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-4 w-4" />
                {isSoldOut ? 'Sold out' : `${slotsLeft} of ${event.totalSlots} spots left`}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{slotsPercent}%</span>
            </div>
            <Progress value={slotsPercent} className="h-2" />
          </div>

          <EventRegisterModal
            event={event}
            disabled={isSoldOut}
            variant="default"
            label={isSoldOut ? 'Sold Out' : 'Register Now'}
          />

          {!isSoldOut && (
            <p className="text-center text-xs text-muted-foreground">
              Secure your spot before it fills up
            </p>
          )}

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
