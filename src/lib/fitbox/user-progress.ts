import type { UserProgress, UserCourseProgress } from './types';

export const MOCK_USER_PROGRESS: UserProgress = {
  userId: 'usr-mock-001',
  courses: [
    {
      courseId: 'crs-001',
      completedLessonIds: ['crs-001-l1', 'crs-001-l2', 'crs-001-l3'],
      lastWatchedLessonId: 'crs-001-l3',
      startedAt: '2026-05-10T08:00:00Z',
      completedAt: null,
    },
    {
      courseId: 'crs-004',
      completedLessonIds: ['crs-004-l1'],
      lastWatchedLessonId: 'crs-004-l1',
      startedAt: '2026-05-20T18:30:00Z',
      completedAt: null,
    },
    {
      courseId: 'crs-002',
      completedLessonIds: ['crs-002-l1', 'crs-002-l2', 'crs-002-l3', 'crs-002-l4', 'crs-002-l5', 'crs-002-l6'],
      lastWatchedLessonId: 'crs-002-l6',
      startedAt: '2026-04-01T10:00:00Z',
      completedAt: '2026-04-22T16:45:00Z',
    },
  ],
};

export function getUserCourseProgress(courseId: string): UserCourseProgress | undefined {
  return MOCK_USER_PROGRESS.courses.find((p) => p.courseId === courseId);
}

export function getCourseProgressPercent(
  progress: UserCourseProgress,
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;
  return Math.round((progress.completedLessonIds.length / totalLessons) * 100);
}

export function isLessonCompleted(
  progress: UserCourseProgress,
  lessonId: string
): boolean {
  return progress.completedLessonIds.includes(lessonId);
}

export function isCourseCompleted(progress: UserCourseProgress): boolean {
  return progress.completedAt !== null;
}

export function getInProgressCourses(): UserCourseProgress[] {
  return MOCK_USER_PROGRESS.courses.filter(
    (p) => p.completedLessonIds.length > 0 && p.completedAt === null
  );
}
