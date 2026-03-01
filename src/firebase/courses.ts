import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy,
  Timestamp,
  increment,
  setDoc,
  runTransaction
} from 'firebase/firestore';
import { db } from './config';
import type { Course, Session } from '../types/course';

const initializeDefaultCourses = async () => {
  const defaultCourses = [
    {
      id: 'online-safety-license',
      title: 'Online Safety License (Smartphone License)',
      description: 'Master safe device and internet use with our comprehensive smartphone safety program. Get certified in digital safety practices.',
      price: 140,
      subsidizedPrice: {
        min: 60,
        max: 90
      },
      duration: '8 weeks',
      enrollments: 234,
      rating: 4.8,
      category: 'safety',
      level: 'beginner',
      language: 'English',
      instructor: 'Dr. Sarah Miller',
      status: 'active',
      featured: true,
      outcomes: [
        'Certificate of completion',
        'Digital safety badge',
        'Practical safety skills'
      ],
      curriculum: [
        { week: 1, topic: 'Introduction to Digital Safety', hours: 3 },
        { week: 2, topic: 'Online Privacy Fundamentals', hours: 3 },
        { week: 3, topic: 'Social Media Safety', hours: 3 },
        { week: 4, topic: 'Cyberbullying Prevention', hours: 3 },
        { week: 5, topic: 'Safe Online Communication', hours: 3 },
        { week: 6, topic: 'Digital Footprint Management', hours: 3 },
        { week: 7, topic: 'Mobile Device Security', hours: 3 },
        { week: 8, topic: 'Final Project & Certification', hours: 3 }
      ],
      nextSessions: [
        {
          id: 'osl-2024-03',
          date: '2024-03-15',
          time: '15:00',
          seatsTotal: 20,
          seatsBooked: 12,
          location: {
            country: 'DE',
            city: 'Frankfurt',
            address: 'Innovationsstraße 123',
            postalCode: '60313'
          }
        },
        {
          id: 'osl-2024-04',
          date: '2024-04-01',
          time: '16:00',
          seatsTotal: 20,
          seatsBooked: 5,
          location: {
            country: 'DE',
            city: 'Frankfurt',
            address: 'Innovationsstraße 123',
            postalCode: '60313'
          }
        }
      ],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    },
    {
      id: 'intro-to-early-ai',
      title: 'Intro to Early AI - Computing',
      description: 'Learn essential technology concepts and AI basics through hands-on projects. Perfect for beginners starting their tech journey.',
      price: 140,
      subsidizedPrice: {
        min: 60,
        max: 90
      },
      duration: '8 weeks',
      enrollments: 156,
      rating: 4.9,
      category: 'technology',
      level: 'beginner',
      language: 'English',
      instructor: 'Prof. Michael Chen',
      status: 'active',
      featured: true,
      outcomes: [
        'Understanding of AI basics',
        'Hands-on project experience',
        'Computing fundamentals certificate'
      ],
      curriculum: [
        { week: 1, topic: 'Computing Basics', hours: 3 },
        { week: 2, topic: 'Introduction to AI', hours: 3 },
        { week: 3, topic: 'Programming Concepts', hours: 3 },
        { week: 4, topic: 'Data and Information', hours: 3 },
        { week: 5, topic: 'Problem Solving', hours: 3 },
        { week: 6, topic: 'Simple AI Projects', hours: 3 },
        { week: 7, topic: 'Project Work', hours: 3 },
        { week: 8, topic: 'Final Presentation', hours: 3 }
      ],
      nextSessions: [
        {
          id: 'ai-2024-03',
          date: '2024-03-20',
          time: '14:00',
          seatsTotal: 15,
          seatsBooked: 8,
          location: {
            country: 'DE',
            city: 'Frankfurt',
            address: 'Innovationsstraße 123',
            postalCode: '60313'
          }
        },
        {
          id: 'ai-2024-04',
          date: '2024-04-05',
          time: '15:00',
          seatsTotal: 15,
          seatsBooked: 3,
          location: {
            country: 'DE',
            city: 'Frankfurt',
            address: 'Innovationsstraße 123',
            postalCode: '60313'
          }
        }
      ],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
  ];

  for (const course of defaultCourses) {
    await setDoc(doc(db, 'courses', course.id), course, { merge: true });
  }
};

export async function getCourses(): Promise<Course[]> {
  try {
    const coursesRef = collection(db, 'courses');
    const snapshot = await getDocs(query(coursesRef, orderBy('createdAt', 'desc')));
    
    if (snapshot.empty) {
      await initializeDefaultCourses();
      return getCourses();
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const docRef = doc(db, 'courses', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const course = {
      ...courseData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'courses'), course);
    return docRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function updateCourse(id: string, courseData: Partial<Course>): Promise<void> {
  try {
    const courseRef = doc(db, 'courses', id);
    await updateDoc(courseRef, {
      ...courseData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

export async function deleteCourse(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'courses', id));
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}

export async function updateCourseEnrollments(courseId: string, sessionId: string, increment: boolean): Promise<void> {
  try {
    await runTransaction(db, async (transaction) => {
      const courseRef = doc(db, 'courses', courseId);
      const courseDoc = await transaction.get(courseRef);
      
      if (!courseDoc.exists()) {
        throw new Error('Course not found');
      }

      const course = courseDoc.data() as Course;
      
      // Find the session and check capacity before updating
      const sessionIndex = course.nextSessions.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        throw new Error('Session not found');
      }

      const session = course.nextSessions[sessionIndex];

      // Check if we can increment (don't exceed total seats)
      if (increment && session.seatsBooked >= session.seatsTotal) {
        throw new Error('Session is full');
      }

      // Check if we can decrement (don't go below 0)
      if (!increment && session.seatsBooked <= 0) {
        throw new Error('No seats booked');
      }

      // Update the sessions array with proper bounds checking
      const updatedSessions = course.nextSessions.map((s) => {
        if (s.id === sessionId) {
          const newBookedSeats = increment 
            ? Math.min(s.seatsTotal, s.seatsBooked + 1)
            : Math.max(0, s.seatsBooked - 1);
          
          return {
            ...s,
            seatsBooked: newBookedSeats
          };
        }
        return s;
      });

      // Update course with both enrollments and session data
      transaction.update(courseRef, {
        enrollments: increment 
          ? course.enrollments + 1 
          : Math.max(0, course.enrollments - 1),
        nextSessions: updatedSessions,
        updatedAt: Timestamp.now()
      });
    });
  } catch (error) {
    console.error('Error updating course enrollments:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to update course enrollments');
    }
  }
}