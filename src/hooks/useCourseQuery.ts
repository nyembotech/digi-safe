import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Course } from '../types/course';

export function useCourseQuery(courseId: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const docRef = doc(db, 'courses', courseId);
      const snapshot = await getDoc(docRef);
      
      if (!snapshot.exists()) {
        throw new Error('Course not found');
      }
      
      return {
        id: snapshot.id,
        ...snapshot.data()
      } as Course;
    },
    enabled: !!courseId,
  });
}