import { useMutation } from '@tanstack/react-query';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { queryClient } from '../lib/query-client';
import type { RegistrationData } from '../types/registration';

export function useCreateRegistrationMutation() {
  return useMutation({
    mutationFn: async (registrationData: Omit<RegistrationData, 'createdAt' | 'updatedAt'>) => {
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...registrationData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return docRef.id;
    },
    onSuccess: (_, variables) => {
      // Invalidate registrations queries
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      // Invalidate the specific course query to update enrollment count
      queryClient.invalidateQueries({ 
        queryKey: ['course', variables.courseInfo.courseId] 
      });
    },
  });
}