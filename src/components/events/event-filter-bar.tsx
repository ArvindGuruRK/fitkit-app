'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EVENT_CATEGORY_LABELS } from '@/lib/events/types';
import type { EventCategory } from '@/lib/events/types';

const categories: EventCategory[] = [
  'marathon',
  'hiit-challenge',
  'yoga-retreat',
  'nutrition-workshop',
  'strength-competition',
  'cycling-event',
];

export function EventFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  function setCategory(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === activeCategory || cat === '') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/events?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCategory('')}
        className={cn(
          'rounded-full border transition-colors',
          activeCategory === ''
            ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
            : 'hover:border-primary hover:text-primary'
        )}
      >
        All Events
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="outline"
          size="sm"
          onClick={() => setCategory(cat)}
          className={cn(
            'rounded-full border transition-colors',
            activeCategory === cat
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
              : 'hover:border-primary hover:text-primary'
          )}
        >
          {EVENT_CATEGORY_LABELS[cat]}
        </Button>
      ))}
    </div>
  );
}
