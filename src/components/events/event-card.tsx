'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ElectricBorder from '@/components/ui/electric-border';
import { EventRegisterModal } from './event-register-modal';
import { EVENT_CATEGORY_LABELS } from '@/lib/events/types';
import type { FitEvent } from '@/lib/events/types';

function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `₹${price.toLocaleString('en-IN')}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function EventCard({ event }: { event: FitEvent }) {
  const slotsPercent = Math.round((event.registeredCount / event.totalSlots) * 100);
  const isSoldOut = event.status === 'sold-out';
  const slotsLeft = event.totalSlots - event.registeredCount;

  return (
    <ElectricBorder color="#E63946" speed={2} chaos={0.3} thickness={1.5}>
      <Card className="overflow-hidden group transform transition-all duration-300 hover:shadow-xl flex flex-col rounded-2xl bg-transparent h-full">
        <Link href={`/events/${event.slug}`} className="block overflow-hidden relative">
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={event.bannerImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className="text-[10px] px-1.5 py-0.5 bg-blue-600 hover:bg-blue-600 text-white border-0 uppercase">
              {EVENT_CATEGORY_LABELS[event.category]}
            </Badge>
            {event.isNew && (
              <Badge className="text-[10px] px-1.5 py-0.5 bg-green-600 hover:bg-green-600 text-white border-0">
                NEW
              </Badge>
            )}
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm px-3 py-1 font-headline uppercase">
                Sold Out
              </Badge>
            </div>
          )}
          {event.price === 0 && !isSoldOut && (
            <div className="absolute top-2 right-2">
              <Badge className="text-[10px] px-1.5 py-0.5 bg-emerald-600 hover:bg-emerald-600 text-white border-0">
                FREE
              </Badge>
            </div>
          )}
        </Link>

        <CardContent className="p-4 flex-grow flex flex-col gap-3 bg-card">
          <Link href={`/events/${event.slug}`} className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </Link>

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{formatDate(event.date)} · {event.time.split('–')[0].trim()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {isSoldOut ? 'Sold out' : `${slotsLeft} spots left`}
              </span>
              <span>{slotsPercent}% filled</span>
            </div>
            <Progress value={slotsPercent} className="h-1.5" />
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-primary">
                {formatPrice(event.price)}
              </span>
              {event.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(event.originalPrice)}
                </span>
              )}
            </div>
            <EventRegisterModal event={event} disabled={isSoldOut} />
          </div>
        </CardContent>
      </Card>
    </ElectricBorder>
  );
}
