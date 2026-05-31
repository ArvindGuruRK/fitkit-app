import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CourseDetailHero } from '@/components/fitbox/course-detail-hero';
import { CourseProgressTracker } from '@/components/fitbox/course-progress-tracker';
import { getCourseBySlug } from '@/lib/fitbox/courses';
import { getUserCourseProgress } from '@/lib/fitbox/user-progress';
import { COURSE_CATEGORY_LABELS } from '@/lib/fitbox/types';

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseBySlug(courseId);
  if (!course) return { title: 'Course Not Found | FitBox' };
  return {
    title: `${course.title} | FitBox`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;
  const course = getCourseBySlug(courseId);
  if (!course) notFound();

  const initialProgress = getUserCourseProgress(course.id) ?? null;

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/fitbox" className="hover:text-foreground transition-colors">FitBox</Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/fitbox?category=${course.category}`}
          className="hover:text-foreground transition-colors"
        >
          {COURSE_CATEGORY_LABELS[course.category]}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
      </nav>

      {/* Hero */}
      <CourseDetailHero course={course} />

      <Separator className="my-10" />

      {/* Interactive tracker: video player + lessons panel */}
      <CourseProgressTracker course={course} initialProgress={initialProgress} />

      <Separator className="my-10" />

      {/* About / Instructor tabs */}
      <Tabs defaultValue="about" className="w-full max-w-3xl">
        <TabsList className="mb-6">
          <TabsTrigger value="about">About This Course</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="text-muted-foreground leading-relaxed text-sm space-y-4">
            <p>{course.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="instructor">
          <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={course.instructorAvatarUrl} alt={course.instructorName} />
              <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-lg">{course.instructorName}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{course.instructorTitle}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
