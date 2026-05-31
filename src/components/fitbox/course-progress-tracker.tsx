'use client';

import { useState } from 'react';
import { CheckCircle, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from './video-player';
import { CourseLessonsPanel } from './course-lessons-panel';
import { CourseCompletionBadge } from './course-completion-badge';
import { cn } from '@/lib/utils';
import type { Course, Lesson, UserCourseProgress } from '@/lib/fitbox/types';

interface Props {
  course: Course;
  initialProgress: UserCourseProgress | null;
}

export function CourseProgressTracker({ course, initialProgress }: Props) {
  const [completedIds, setCompletedIds] = useState<string[]>(
    initialProgress?.completedLessonIds ?? []
  );
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    () =>
      course.lessons.find((l) => l.id === initialProgress?.lastWatchedLessonId) ??
      course.lessons[0]
  );
  const [showBadge, setShowBadge] = useState(false);

  const progressPercent = Math.round((completedIds.length / course.lessons.length) * 100);
  const isActiveLessonCompleted = completedIds.includes(activeLesson.id);

  function handleMarkComplete(lessonId: string) {
    if (completedIds.includes(lessonId)) return;
    const next = [...completedIds, lessonId];
    setCompletedIds(next);

    if (next.length === course.lessons.length) {
      setTimeout(() => setShowBadge(true), 400);
    } else {
      // Advance to next lesson automatically
      const currentIdx = course.lessons.findIndex((l) => l.id === lessonId);
      if (currentIdx < course.lessons.length - 1) {
        setActiveLesson(course.lessons[currentIdx + 1]);
      }
    }
  }

  return (
    <>
      <div className="space-y-4">
        {/* Progress header */}
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedIds.length} of {course.lessons.length} lessons completed
              </span>
              <span className="font-semibold text-foreground">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Active lesson title */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Now Watching</p>
          <h2 className="text-lg font-semibold text-foreground">{activeLesson.title}</h2>
          <p className="text-sm text-muted-foreground">{activeLesson.duration}</p>
        </div>

        {/* Two-col layout: player + lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer videoId={activeLesson.youtubeVideoId} title={activeLesson.title} />

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeLesson.description}
            </p>

            {/* Mark complete button */}
            <Button
              onClick={() => handleMarkComplete(activeLesson.id)}
              disabled={isActiveLessonCompleted}
              variant={isActiveLessonCompleted ? 'secondary' : 'default'}
              className={cn(
                'w-full sm:w-auto',
                isActiveLessonCompleted && 'opacity-70'
              )}
            >
              {isActiveLessonCompleted ? (
                <>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Lesson Completed
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>

          <div className="lg:col-span-1">
            <CourseLessonsPanel
              lessons={course.lessons}
              completedIds={completedIds}
              activeLessonId={activeLesson.id}
              onSelectLesson={setActiveLesson}
            />
          </div>
        </div>
      </div>

      <CourseCompletionBadge
        course={course}
        isOpen={showBadge}
        onClose={() => setShowBadge(false)}
      />
    </>
  );
}
