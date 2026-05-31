import Image from 'next/image';
import { Star, BookOpen, Clock, Users, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { COURSE_CATEGORY_LABELS } from '@/lib/fitbox/types';
import type { Course } from '@/lib/fitbox/types';
import { cn } from '@/lib/utils';

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

export function CourseDetailHero({ course }: { course: Course }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left: info */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={cn('text-white border-0 uppercase text-xs', LEVEL_COLORS[course.level])}>
              {course.level}
            </Badge>
            <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-0 uppercase text-xs">
              {COURSE_CATEGORY_LABELS[course.category]}
            </Badge>
            {course.isNew && (
              <Badge className="bg-green-600 hover:bg-green-600 text-white border-0 text-xs">NEW</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground leading-tight">
            {course.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Rating + meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('h-4 w-4', i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground')}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">{course.rating}</span>
            <span>({course.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.enrolledCount.toLocaleString()} enrolled
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.totalDuration}
          </span>
          <span className={cn('flex items-center gap-1 font-semibold', TIER_COLORS[course.badgeTier])}>
            <Trophy className="h-4 w-4" />
            {course.badgeTier.charAt(0).toUpperCase() + course.badgeTier.slice(1)} Badge on Completion
          </span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30">
          <Avatar className="h-12 w-12">
            <AvatarImage src={course.instructorAvatarUrl} alt={course.instructorName} />
            <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Instructor</p>
            <p className="font-semibold text-sm text-foreground">{course.instructorName}</p>
            <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: thumbnail */}
      <div className="relative h-56 lg:h-72 rounded-2xl overflow-hidden bg-muted">
        <Image
          src={course.thumbnailImage}
          alt={course.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
