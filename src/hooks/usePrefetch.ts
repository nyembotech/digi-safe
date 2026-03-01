import { useCallback } from 'react';
import { queryClient } from '../lib/query-client';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Course } from '../types/course';
import type { RegistrationData } from '../types/registration';

// Prefetch a single course
export async function prefetchCourse(courseId: string) {
  return queryClient.prefetchQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const docRef = doc(db, 'courses', courseId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) throw new Error('Course not found');
      return { id: snapshot.id, ...snapshot.data() } as Course;
    },
  });
}

// Prefetch course registrations
export async function prefetchCourseRegistrations(courseId: string) {
  return queryClient.prefetchQuery({
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
  });
}

// Hook to prefetch course and its registrations
export function usePrefetchCourseData() {
  return useCallback(async (courseId: string) => {
    await Promise.all([
      prefetchCourse(courseId),
      prefetchCourseRegistrations(courseId),
    ]);
  }, []);
}

// Prefetch student registrations
export async function prefetchStudentRegistrations(studentEmail: string) {
  return queryClient.prefetchQuery({
    queryKey: ['registrations', 'student', studentEmail],
    queryFn: async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(
        registrationsRef,
        where('studentInfo.email', '==', studentEmail)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (RegistrationData & { id: string })[];
    },
  });
}