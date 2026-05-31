'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, BookOpen, Clock, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import ElectricBorder from '@/components/ui/electric-border';
import { COURSE_CATEGORY_LABELS } from '@/lib/fitbox/types';
import { getCourseProgressPercent } from '@/lib/fitbox/user-progress';
import type { Course, UserCourseProgress } from '@/lib/fitbox/types';
import { cn } from '@/lib/utils';

interface Props {
  course: Course;
  progress?: UserCourseProgress;
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-600',
  intermediate: 'bg-amber-500',
  advanced: 'bg-red-600',
};

const TIER_COLORS: Record<string, string> = {
  bronze: 'text-amber-700',
  silver: 'text-slate-400',
  gold: 'text-yellow-400',
};

export function CourseCard({ course, progress }: Props) {
  const isCompleted = !!progress?.completedAt;
  const hasProgress = !isCompleted && progress && progress.completedLessonIds.length > 0;
  const progressPercent = progress ? getCourseProgressPercent(progress, course.totalLessons) : 0;

  const ctaLabel = isCompleted ? 'Review Course' : hasProgress ? 'Continue' : 'Start Course';

  return (
    <ElectricBorder color="#E63946" speed={2} chaos={0.3} thickness={1.5}>
      <Card className="overflow-hidden group transform transition-all duration-300 hover:shadow-xl flex flex-col rounded-2xl bg-transparent h-full">
        <Link href={`/fitbox/${course.slug}`} className="block overflow-hidden relative">
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={course.thumbnailImage}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className={cn('text-[10px] px-1.5 py-0.5 text-white border-0 uppercase', LEVEL_COLORS[course.level])}>
              {course.level}
            </Badge>
            <Badge className="text-[10px] px-1.5 py-0.5 bg-blue-600 hover:bg-blue-600 text-white border-0 uppercase">
              {COURSE_CATEGORY_LABELS[course.category]}
            </Badge>
          </div>
          {course.isNew && (
            <div className="absolute top-2 right-2">
              <Badge className="text-[10px] px-1.5 py-0.5 bg-green-600 hover:bg-green-600 text-white border-0">NEW</Badge>
            </div>
          )}
          {isCompleted && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge className="bg-amber-500 hover:bg-amber-500 text-white border-0 text-sm px-3 py-1">
                <Trophy className="h-3.5 w-3.5 mr-1.5" />
                Completed
              </Badge>
            </div>
          )}
        </Link>

        <CardContent className="p-4 flex-grow flex flex-col gap-3 bg-card">
          <Link href={`/fitbox/${course.slug}`} className="flex-1 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {course.instructorName}
            </p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(course.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {course.rating} ({course.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.totalDuration}
            </span>
            <span className={cn('flex items-center gap-1 font-semibold', TIER_COLORS[course.badgeTier])}>
              <Trophy className="h-3.5 w-3.5" />
              {course.badgeTier.charAt(0).toUpperCase() + course.badgeTier.slice(1)}
            </span>
          </div>

          {/* Progress bar */}
          {hasProgress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress.completedLessonIds.length}/{course.totalLessons} lessons done</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}

          <Button size="sm" className="w-full mt-auto" asChild>
            <Link href={`/fitbox/${course.slug}`}>{ctaLabel}</Link>
          </Button>
        </CardContent>
      </Card>
    </ElectricBorder>
  );
}
