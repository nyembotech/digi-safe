import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';
import type { AdminUser, StudentUser } from '../types/auth';

export async function signInStudent(keypass: string, password: string): Promise<StudentUser> {
  try {
    if (!keypass || !password) {
      throw new Error('Student ID and password are required');
    }

    // Get student document from Firestore
    const studentRef = doc(db, 'students', keypass);
    const studentDoc = await getDoc(studentRef);

    if (!studentDoc.exists()) {
      throw new Error('Invalid Student ID');
    }

    const studentData = studentDoc.data() as StudentUser;

    // Verify password
    if (studentData.password !== password) {
      throw new Error('Invalid password');
    }

    // Update last login
    await setDoc(studentRef, {
      ...studentData,
      lastLogin: new Date().toISOString()
    }, { merge: true });

    // Store student session in sessionStorage (will be cleared when browser/tab closes)
    sessionStorage.setItem('studentSession', JSON.stringify(studentData));

    return studentData;
  } catch (error) {
    console.error('Student sign in error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to sign in');
  }
}

export async function signInAdmin(email: string, password: string): Promise<AdminUser> {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Create admin data without Firestore check
    const adminData: AdminUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    return adminData;
  } catch (error) {
    console.error('Admin sign in error:', error);
    if (error instanceof Error) {
      if ('code' in error) {
        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
            throw new Error('Invalid email or password');
          case 'auth/invalid-email':
            throw new Error('Invalid email address');
          case 'auth/user-disabled':
            throw new Error('This account has been disabled');
          case 'auth/user-not-found':
            throw new Error('No account found with this email');
          case 'auth/too-many-requests':
            throw new Error('Too many failed attempts. Please try again later');
          default:
            throw new Error('Authentication failed');
        }
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function signOut() {
  // Clear student session from sessionStorage
  sessionStorage.removeItem('studentSession');

  // Sign out from Firebase Auth (for admin users)
  if (auth.currentUser) {
    await firebaseSignOut(auth);
  }
}

export function onAuthChange(callback: (user: AdminUser | StudentUser | null) => void) {
  // Check for student session first
  const studentSessionStr = sessionStorage.getItem('studentSession');
  if (studentSessionStr) {
    try {
      const studentData = JSON.parse(studentSessionStr) as StudentUser;
      callback(studentData);
    } catch (error) {
      console.error('Error parsing student session:', error);
      sessionStorage.removeItem('studentSession');
    }
  }

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Check if there's a student session
      const studentSessionStr = sessionStorage.getItem('studentSession');
      if (studentSessionStr) {
        try {
          const studentData = JSON.parse(studentSessionStr) as StudentUser;
          callback(studentData);
          return;
        } catch (error) {
          console.error('Error parsing student session:', error);
          sessionStorage.removeItem('studentSession');
        }
      }
      callback(null);
      return;
    }

    // Create admin data directly from Firebase user
    const adminData: AdminUser = {
      uid: user.uid,
      email: user.email!,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    callback(adminData);
  });
}

export async function createStudent(
  firstName: string,
  lastName: string,
  age: number,
  parentEmail: string
): Promise<{ email: string; password: string }> {
  try {
    // Generate student ID (keypass)
    const keypass = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Date.now()}`;
    
    // Generate password
    const password = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

    // Create student document in Firestore
    const studentData: StudentUser = {
      uid: keypass,
      email: `${keypass}@student.digisafe-europe.eu`,
      role: 'student',
      firstName,
      lastName,
      age,
      parentEmail,
      courseIds: [],
      password,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    await setDoc(doc(db, 'students', keypass), studentData);

    return {
      email: keypass,
      password
    };
  } catch (error) {
    console.error('Error creating student:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create student account');
  }
}