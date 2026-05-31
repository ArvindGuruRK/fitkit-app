'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COURSE_CATEGORY_LABELS } from '@/lib/fitbox/types';
import type { CourseCategory, CourseLevel } from '@/lib/fitbox/types';

const categories: CourseCategory[] = [
  'nutrition',
  'strength-training',
  'mindfulness',
  'cardio',
  'recovery',
  'sports-science',
];

const levels: { value: CourseLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export function CourseFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';
  const activeLevel = searchParams.get('level') ?? '';

  function update(key: string, val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === val || val === '') {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    router.push(`/fitbox?${params.toString()}`);
  }

  return (
    <div className="space-y-3 mb-8">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => update('category', '')}
          className={cn(
            'rounded-full border transition-colors',
            activeCategory === ''
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
              : 'hover:border-primary hover:text-primary'
          )}
        >
          All Topics
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            onClick={() => update('category', cat)}
            className={cn(
              'rounded-full border transition-colors',
              activeCategory === cat
                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                : 'hover:border-primary hover:text-primary'
            )}
          >
            {COURSE_CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {levels.map(({ value, label }) => (
          <Button
            key={value}
            variant="outline"
            size="sm"
            onClick={() => update('level', value)}
            className={cn(
              'rounded-full border transition-colors text-xs',
              activeLevel === value
                ? 'bg-foreground text-background border-foreground hover:bg-foreground/90'
                : 'hover:border-foreground hover:text-foreground'
            )}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
