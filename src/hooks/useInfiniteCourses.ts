import { useInfiniteQuery } from '@tanstack/react-query';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Course } from '../types/course';

const COURSES_PER_PAGE = 10;

interface CourseQueryResult {
  courses: Course[];
  lastVisible: any;
}

export function useInfiniteCourses() {
  return useInfiniteQuery<CourseQueryResult>({
    queryKey: ['courses', 'infinite'],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const coursesRef = collection(db, 'courses');
      let q = query(
        coursesRef,
        orderBy('createdAt', 'desc'),
        limit(COURSES_PER_PAGE)
      );

      if (pageParam) {
        q = query(q, startAfter(pageParam));
      }

      const snapshot = await getDocs(q);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      
      const courses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];

      return {
        courses,
        lastVisible,
      };
    },
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
  });
}