'use client';

import { Trophy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Course } from '@/lib/fitbox/types';
import Link from 'next/link';

const TIER_STYLES: Record<string, { icon: string; badge: string; label: string }> = {
  bronze: {
    icon: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    label: 'BRONZE ACHIEVER',
  },
  silver: {
    icon: 'text-slate-400',
    badge: 'bg-slate-100 text-slate-600 border-slate-300',
    label: 'SILVER ACHIEVER',
  },
  gold: {
    icon: 'text-yellow-400',
    badge: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    label: 'GOLD ACHIEVER',
  },
};

interface Props {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseCompletionBadge({ course, isOpen, onClose }: Props) {
  const { toast } = useToast();
  const tier = TIER_STYLES[course.badgeTier];

  function handleShare() {
    const text = `I just completed "${course.title}" on FitKit and earned the ${tier.label} badge! 🏆`;
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'Copied to clipboard!', description: 'Share your achievement with the world.' });
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="font-headline text-center text-2xl">
            Course Complete! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Trophy icon */}
          <div className={cn(
            'p-6 rounded-full border-4',
            course.badgeTier === 'gold'
              ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)] bg-yellow-50'
              : course.badgeTier === 'silver'
              ? 'border-slate-400 bg-slate-50'
              : 'border-amber-700 bg-amber-50'
          )}>
            <Trophy className={cn('h-14 w-14', tier.icon)} />
          </div>

          {/* Badge label */}
          <div className={cn('px-4 py-1.5 rounded-full border font-headline text-sm font-bold uppercase tracking-widest', tier.badge)}>
            {tier.label}
          </div>

          <div className="space-y-1 text-center">
            <p className="text-sm text-muted-foreground">You&apos;ve mastered</p>
            <p className="font-semibold text-foreground">{course.title}</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleShare} variant="outline" className="w-full">
            Share Achievement
          </Button>
          <Button asChild className="w-full" onClick={onClose}>
            <Link href="/fitbox">Continue Learning</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
