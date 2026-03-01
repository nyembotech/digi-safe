import { 
  collection, 
  addDoc,
  getDocs, 
  query, 
  orderBy, 
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  increment,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from './config';
import { addRegistrationToDashboard } from './dashboard';
import { sendRegistrationEmail } from '../services/email';
import { createStudent } from './auth';
import type { RegistrationData } from '../types/registration';

export async function createRegistration(data: Omit<RegistrationData, 'id' | 'createdAt' | 'updatedAt' | 'invoiceNumber'>) {
  try {
    // Validate required fields
    if (!data.studentInfo?.firstName || !data.studentInfo?.lastName || !data.studentInfo?.age ||
        !data.parentInfo?.email || !data.parentInfo?.firstName || !data.parentInfo?.lastName ||
        !data.parentInfo?.phone || !data.courseInfo?.courseId || !data.courseInfo?.courseName ||
        !data.courseInfo?.sessionId || !data.courseInfo?.date || !data.courseInfo?.time ||
        !data.payment?.method || !data.payment?.amount || !data.payment?.status) {
      throw new Error('Missing required fields');
    }

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create student account and generate credentials
    const credentials = await createStudent(
      data.studentInfo.firstName,
      data.studentInfo.lastName,
      data.studentInfo.age,
      data.parentInfo.email
    );

    // Prepare registration data
    const registrationData = {
      ...data,
      studentInfo: {
        ...data.studentInfo,
        email: credentials.email
      },
      status: 'pending',
      invoiceNumber,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    // Create registration document
    const docRef = await addDoc(collection(db, 'registrations'), registrationData);

    // Update course enrollments
    const courseRef = doc(db, 'courses', data.courseInfo.courseId);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      throw new Error('Course not found');
    }

    const course = courseDoc.data();
    const updatedSessions = course.nextSessions.map((s: any) => {
      if (s.id === data.courseInfo.sessionId) {
        return {
          ...s,
          seatsBooked: s.seatsBooked + 1
        };
      }
      return s;
    });

    await updateDoc(courseRef, {
      enrollments: increment(1),
      nextSessions: updatedSessions,
      updatedAt: Timestamp.now()
    });

    // Handle non-critical operations
    try {
      await Promise.all([
        addRegistrationToDashboard({
          id: docRef.id,
          ...registrationData
        }),
        sendRegistrationEmail({
          to: data.parentInfo.email,
          studentName: `${data.studentInfo.firstName} ${data.studentInfo.lastName}`,
          courseName: data.courseInfo.courseName,
          invoiceNumber,
          amount: data.payment.amount,
          paymentMethod: data.payment.method,
          sessionDate: data.courseInfo.date,
          sessionTime: data.courseInfo.time,
          studentCredentials: credentials
        })
      ]);
    } catch (error) {
      console.warn('Non-critical operations failed:', error);
      // Don't throw error for non-critical operations
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating registration:', error);
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error('Registration failed');
  }
}

export async function getRegistrations() {
  try {
    const registrationsRef = collection(db, 'registrations');
    const q = query(registrationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RegistrationData[];
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
}

export async function updateRegistrationStatus(id: string, status: 'confirmed' | 'cancelled') {
  try {
    const registrationRef = doc(db, 'registrations', id);
    const registrationDoc = await getDoc(registrationRef);
    
    if (!registrationDoc.exists()) {
      throw new Error('Registration not found');
    }

    const registration = registrationDoc.data() as RegistrationData;
    
    // Update registration status
    await updateDoc(registrationRef, {
      status,
      updatedAt: Timestamp.now()
    });

    // Update course enrollments
    const courseRef = doc(db, 'courses', registration.courseInfo.courseId);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      throw new Error('Course not found');
    }

    const course = courseDoc.data();
    const updatedSessions = course.nextSessions.map((s: any) => {
      if (s.id === registration.courseInfo.sessionId) {
        return {
          ...s,
          seatsBooked: status === 'confirmed' 
            ? s.seatsBooked + 1 
            : Math.max(0, s.seatsBooked - 1)
        };
      }
      return s;
    });

    await updateDoc(courseRef, {
      enrollments: status === 'confirmed' 
        ? increment(1) 
        : increment(-1),
      nextSessions: updatedSessions,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating registration status:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update registration status');
  }
}

export async function deleteRegistration(id: string) {
  if (!id) {
    throw new Error('Registration ID is required');
  }

  try {
    // Get registration document
    const registrationRef = doc(db, 'registrations', id);
    const registrationDoc = await getDoc(registrationRef);
    
    if (!registrationDoc.exists()) {
      throw new Error('Registration not found');
    }

    const registration = registrationDoc.data() as RegistrationData;

    // Verify course info exists
    if (!registration.courseInfo?.courseId || !registration.courseInfo?.sessionId) {
      throw new Error('Invalid registration data: missing course information');
    }

    // Update course enrollments
    const courseRef = doc(db, 'courses', registration.courseInfo.courseId);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      throw new Error('Course not found');
    }

    const course = courseDoc.data();
    const updatedSessions = course.nextSessions.map((s: any) => {
      if (s.id === registration.courseInfo.sessionId) {
        return {
          ...s,
          seatsBooked: Math.max(0, s.seatsBooked - 1)
        };
      }
      return s;
    });

    await updateDoc(courseRef, {
      enrollments: Math.max(0, course.enrollments - 1),
      nextSessions: updatedSessions,
      updatedAt: Timestamp.now()
    });

    // Delete registration
    await deleteDoc(registrationRef);
  } catch (error) {
    console.error('Error deleting registration:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete registration: ${error.message}`);
    }
    throw new Error('Failed to delete registration');
  }
}