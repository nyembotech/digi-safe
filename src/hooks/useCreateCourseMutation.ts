import { useMutation } from '@tanstack/react-query';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { queryClient } from '../lib/query-client';
import type { Course } from '../types/course';

type CreateCourseInput = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;

export function useCreateCourseMutation() {
  return useMutation({
    mutationFn: async (courseData: CreateCourseInput) => {
      const docRef = await addDoc(collection(db, 'courses'), {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        enrollments: 0,
      });
      return docRef.id;
    },
    onSuccess: () => {
      // Invalidate courses queries to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}