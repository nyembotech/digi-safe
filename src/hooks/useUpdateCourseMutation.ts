import { useMutation } from '@tanstack/react-query';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { queryClient } from '../lib/query-client';
import type { Course } from '../types/course';

type UpdateCourseInput = Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>;

export function useUpdateCourseMutation() {
  return useMutation({
    mutationFn: async ({ 
      courseId, 
      courseData 
    }: { 
      courseId: string; 
      courseData: UpdateCourseInput;
    }) => {
      const docRef = doc(db, 'courses', courseId);
      await updateDoc(docRef, {
        ...courseData,
        updatedAt: serverTimestamp(),
      });
      return courseId;
    },
    onSuccess: (courseId) => {
      // Invalidate specific course and courses list
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}