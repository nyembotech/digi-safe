import { useMutation } from '@tanstack/react-query';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { queryClient } from '../lib/query-client';
import type { RegistrationData } from '../types/registration';

type UpdateRegistrationInput = Partial<Omit<RegistrationData, 'createdAt' | 'updatedAt'>>;

export function useUpdateRegistrationMutation() {
  return useMutation({
    mutationFn: async ({
      registrationId,
      data
    }: {
      registrationId: string;
      data: UpdateRegistrationInput;
    }) => {
      const docRef = doc(db, 'registrations', registrationId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return registrationId;
    },
    onMutate: async ({ registrationId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: ['registration', registrationId] 
      });

      // Snapshot the previous value
      const previousRegistration = queryClient.getQueryData<RegistrationData & { id: string }>([
        'registration',
        registrationId,
      ]);

      // Optimistically update the cache
      queryClient.setQueryData<RegistrationData & { id: string }>(
        ['registration', registrationId],
        old => old ? { ...old, ...data } : undefined
      );

      return { previousRegistration };
    },
    onError: (err, { registrationId }, context) => {
      // Rollback to the previous value
      if (context?.previousRegistration) {
        queryClient.setQueryData(
          ['registration', registrationId],
          context.previousRegistration
        );
      }
    },
    onSuccess: (registrationId, { data }) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ 
        queryKey: ['registration', registrationId] 
      });
      if (data.courseInfo?.courseId) {
        queryClient.invalidateQueries({ 
          queryKey: ['registrations', 'course', data.courseInfo.courseId] 
        });
      }
      if (data.studentInfo?.email) {
        queryClient.invalidateQueries({ 
          queryKey: ['registrations', 'student', data.studentInfo.email] 
        });
      }
    },
  });
}