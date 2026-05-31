import type { Course, UserCourseProgress } from '@/lib/fitbox/types';
import { CourseCard } from './course-card';

interface Props {
  courses: Course[];
  userProgressMap?: Record<string, UserCourseProgress>;
}

export function CourseGrid({ courses, userProgressMap = {} }: Props) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">No courses found</p>
        <p className="text-sm mt-1">Try adjusting your filters to see more courses.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={userProgressMap[course.id]}
        />
      ))}
    </div>
  );
}
