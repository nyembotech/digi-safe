import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { RegistrationData } from '../types/registration';

export function useCourseRegistrationsQuery(courseId: string) {
  return useQuery({
    queryKey: ['registrations', 'course', courseId],
    queryFn: async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(
        registrationsRef,
        where('courseInfo.courseId', '==', courseId)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (RegistrationData & { id: string })[];
    },
    enabled: !!courseId,
  });
}