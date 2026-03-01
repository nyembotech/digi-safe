import { useQueries } from '@tanstack/react-query';
import { collection, query, where, orderBy, limit, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Course } from '../types/course';
import type { RegistrationData } from '../types/registration';

interface DashboardMetrics {
  totalEnrollments: number;
  activeRegistrations: number;
  recentRegistrations: RegistrationData[];
  popularCourses: Course[];
}

export function useDashboardQueries() {
  return useQueries({
    queries: [
      {
        queryKey: ['dashboard', 'popular-courses'],
        queryFn: async () => {
          const coursesRef = collection(db, 'courses');
          const q = query(
            coursesRef,
            orderBy('enrollments', 'desc'),
            limit(5)
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Course[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      {
        queryKey: ['dashboard', 'recent-registrations'],
        queryFn: async () => {
          const registrationsRef = collection(db, 'registrations');
          const constraints: QueryConstraint[] = [
            orderBy('createdAt', 'desc'),
            limit(10)
          ];
          
          const q = query(registrationsRef, ...constraints);
          const snapshot = await getDocs(q);
          
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as (RegistrationData & { id: string })[];
        },
        staleTime: 1000 * 60, // 1 minute
      },
      {
        queryKey: ['dashboard', 'active-registrations-count'],
        queryFn: async () => {
          const registrationsRef = collection(db, 'registrations');
          const q = query(
            registrationsRef,
            where('status', '==', 'confirmed')
          );
          const snapshot = await getDocs(q);
          return snapshot.size;
        },
        staleTime: 1000 * 60 * 2, // 2 minutes
      }
    ],
  });
}

// Helper hook to transform parallel queries into a single dashboard object
export function useDashboardData() {
  const [
    { data: popularCourses = [] },
    { data: recentRegistrations = [] },
    { data: activeRegistrationsCount = 0 },
  ] = useDashboardQueries();

  const totalEnrollments = popularCourses.reduce(
    (sum, course) => sum + (course.enrollments || 0),
    0
  );

  return {
    totalEnrollments,
    activeRegistrations: activeRegistrationsCount,
    recentRegistrations,
    popularCourses,
  } as DashboardMetrics;
}