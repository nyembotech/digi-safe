import { useQuery } from '@tanstack/react-query';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { RegistrationData } from '../types/registration';

export function useRegistrationsByStudentQuery(studentEmail: string) {
  return useQuery({
    queryKey: ['registrations', 'student', studentEmail],
    queryFn: async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(
        registrationsRef,
        where('studentInfo.email', '==', studentEmail),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (RegistrationData & { id: string })[];
    },
    enabled: !!studentEmail,
  });
}