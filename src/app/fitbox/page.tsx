import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight, BookOpen, GraduationCap, Trophy } from 'lucide-react';
import { CourseGrid } from '@/components/fitbox/course-grid';
import { CourseFilterBar } from '@/components/fitbox/course-filter-bar';
import { ContinueLearningSection } from '@/components/fitbox/continue-learning-section';
import { filterCourses, getAllCourses } from '@/lib/fitbox/courses';
import { MOCK_USER_PROGRESS, getInProgressCourses } from '@/lib/fitbox/user-progress';
import type { UserCourseProgress } from '@/lib/fitbox/types';

interface Props {
  searchParams: Promise<{ category?: string; level?: string }>;
}

export default async function FitBoxPage({ searchParams }: Props) {
  const { category, level } = await searchParams;
  const filtered = filterCourses({ category, level });
  const allCourses = getAllCourses();

  // Build user progress map for grid
  const userProgressMap: Record<string, UserCourseProgress> = {};
  for (const p of MOCK_USER_PROGRESS.courses) {
    userProgressMap[p.courseId] = p;
  }

  // In-progress courses for continue-learning section
  const inProgressRefs = getInProgressCourses();
  const inProgressCourses = inProgressRefs
    .map((progress) => {
      const course = allCourses.find((c) => c.id === progress.courseId);
      return course ? { course, progress } : null;
    })
    .filter(Boolean) as Array<{ course: (typeof allCourses)[0]; progress: (typeof inProgressRefs)[0] }>;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/15 via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-3">
            Fit <span className="text-primary">Box</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Level up your fitness knowledge. Expert-led courses on training, nutrition, recovery, and sports science.
          </p>
          <div className="flex justify-center gap-10 mt-8">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <BookOpen className="h-5 w-5 text-primary" />
                {allCourses.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Courses</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <GraduationCap className="h-5 w-5 text-primary" />
                47K+
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Enrolled</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <Trophy className="h-5 w-5 text-primary" />
                3
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Badges</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">FitBox</span>
        </nav>

        {/* Continue Learning (only when no filters active) */}
        {!category && !level && inProgressCourses.length > 0 && (
          <ContinueLearningSection inProgressCourses={inProgressCourses} />
        )}

        {/* Filter bar + course grid */}
        <h2 className="text-xl font-headline font-bold text-foreground mb-5">
          {category || level ? 'Filtered Courses' : 'All Courses'}
        </h2>
        <Suspense>
          <CourseFilterBar />
        </Suspense>

        <CourseGrid courses={filtered} userProgressMap={userProgressMap} />
      </main>
    </>
  );
}
