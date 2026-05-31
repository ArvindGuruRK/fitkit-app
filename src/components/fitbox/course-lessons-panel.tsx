'use client';

import { CheckCircle, Play, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/fitbox/types';

interface Props {
  lessons: Lesson[];
  completedIds: string[];
  activeLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export function CourseLessonsPanel({
  lessons,
  completedIds,
  activeLessonId,
  onSelectLesson,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <p className="font-semibold text-sm text-foreground">Course Lessons</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {completedIds.length} / {lessons.length} completed
        </p>
      </div>
      <ScrollArea className="flex-1 max-h-[400px] lg:max-h-none">
        <ol className="divide-y divide-border">
          {lessons.map((lesson, index) => {
            const isCompleted = completedIds.includes(lesson.id);
            const isActive = lesson.id === activeLessonId;

            return (
              <li key={lesson.id}>
                <button
                  onClick={() => onSelectLesson(lesson)}
                  className={cn(
                    'w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50',
                    isActive && 'bg-primary/5 border-l-2 border-l-primary'
                  )}
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-4.5 w-4.5 text-green-500 h-5 w-5" />
                    ) : isActive ? (
                      <Play className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-sm font-medium leading-snug',
                      isActive ? 'text-primary' : isCompleted ? 'text-muted-foreground' : 'text-foreground'
                    )}>
                      <span className="text-muted-foreground mr-1">{index + 1}.</span>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{lesson.duration}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </ScrollArea>
    </div>
  );
}
