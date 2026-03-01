import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Course } from '../types/course';

export function useCoursesQuery() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const coursesRef = collection(db, 'courses');
      const coursesQuery = query(coursesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(coursesQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}