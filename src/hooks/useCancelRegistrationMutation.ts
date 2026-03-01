import { useMutation } from '@tanstack/react-query';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { queryClient } from '../lib/query-client';
import type { RegistrationData } from '../types/registration';

export function useCancelRegistrationMutation() {
  return useMutation({
    mutationFn: async (registrationId: string) => {
      const docRef = doc(db, 'registrations', registrationId);
      await updateDoc(docRef, {
        status: 'cancelled',
        updatedAt: serverTimestamp(),
      });
      return registrationId;
    },
    onMutate: async (registrationId) => {
      await queryClient.cancelQueries({ 
        queryKey: ['registration', registrationId] 
      });

      const previousRegistration = queryClient.getQueryData<RegistrationData & { id: string }>([
        'registration',
        registrationId,
      ]);

      // Optimistically update to cancelled status
      queryClient.setQueryData<RegistrationData & { id: string }>(
        ['registration', registrationId],
        old => old ? { ...old, status: 'cancelled' } : undefined
      );

      return { previousRegistration };
    },
    onError: (_, registrationId, context) => {
      if (context?.previousRegistration) {
        queryClient.setQueryData(
          ['registration', registrationId],
          context.previousRegistration
        );
      }
    },
    onSuccess: (registrationId) => {
      const registration = queryClient.getQueryData<RegistrationData & { id: string }>([
        'registration',
        registrationId,
      ]);

      // Invalidate affected queries
      queryClient.invalidateQueries({ 
        queryKey: ['registration', registrationId] 
      });
      if (registration?.courseInfo?.courseId) {
        queryClient.invalidateQueries({ 
          queryKey: ['registrations', 'course', registration.courseInfo.courseId] 
        });
      }
      if (registration?.studentInfo?.email) {
        queryClient.invalidateQueries({ 
          queryKey: ['registrations', 'student', registration.studentInfo.email] 
        });
      }
    },
  });
}