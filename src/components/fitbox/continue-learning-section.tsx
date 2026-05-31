import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { CourseCard } from './course-card';
import type { Course, UserCourseProgress } from '@/lib/fitbox/types';

interface Props {
  inProgressCourses: Array<{ course: Course; progress: UserCourseProgress }>;
}

export function ContinueLearningSection({ inProgressCourses }: Props) {
  if (inProgressCourses.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-5">
        <PlayCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-headline font-bold text-foreground">Continue Learning</h2>
        <Link
          href="/fitbox"
          className="ml-auto text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inProgressCourses.map(({ course, progress }) => (
          <CourseCard key={course.id} course={course} progress={progress} />
        ))}
      </div>
    </section>
  );
}
