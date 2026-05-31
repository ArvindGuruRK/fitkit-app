export type CourseCategory =
  | 'nutrition'
  | 'strength-training'
  | 'mindfulness'
  | 'cardio'
  | 'recovery'
  | 'sports-science';

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  'nutrition': 'Nutrition',
  'strength-training': 'Strength Training',
  'mindfulness': 'Mindfulness',
  'cardio': 'Cardio',
  'recovery': 'Recovery',
  'sports-science': 'Sports Science',
};

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseBadgeTier = 'bronze' | 'silver' | 'gold';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeVideoId: string;
  description: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  badgeTier: CourseBadgeTier;
  instructorName: string;
  instructorTitle: string;
  instructorAvatarUrl: string;
  thumbnailImage: string;
  totalLessons: number;
  totalDuration: string;
  lessons: Lesson[];
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: string;
}

export interface UserCourseProgress {
  courseId: string;
  completedLessonIds: string[];
  lastWatchedLessonId: string | null;
  startedAt: string;
  completedAt: string | null;
}

export interface UserProgress {
  userId: string;
  courses: UserCourseProgress[];
}

export interface CourseFilterParams {
  category?: string;
  level?: string;
}
