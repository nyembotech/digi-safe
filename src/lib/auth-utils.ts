import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase/config';

export interface UserCredentials {
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'parent' | 'student';
  temporaryPassword: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  parentEmail?: string; // For students
  childEmails?: string[]; // For parents
}

export interface StudentRegistrationData {
  childName: string;
  childAge: number;
  parentEmail: string;
  parentName: string;
  courseId: string;
  courseName: string;
}

/**
 * Generate a secure password with mixed case, numbers, and symbols
 */
export function generateSecurePassword(length: number = 12): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  let password = '';
  
  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Generate username from email and user type
 */
export function generateUsername(email: string, userType: 'student' | 'parent'): string {
  const emailPrefix = email.split('@')[0];
  const timestamp = Date.now().toString().slice(-4);
  return `${userType}_${emailPrefix}_${timestamp}`;
}

/**
 * Create student account with auto-generated credentials
 */
export async function createStudentAccount(registrationData: StudentRegistrationData): Promise<UserCredentials> {
  try {
    // Generate student email (using parent email domain for family connection)
    const parentDomain = registrationData.parentEmail.split('@')[1];
    const studentEmail = `${registrationData.childName.toLowerCase().replace(/\s+/g, '.')}.student@${parentDomain}`;
    
    const password = generateSecurePassword(12);
    const username = generateUsername(studentEmail, 'student');
    
    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(auth, studentEmail, password);
    const uid = userCredential.user.uid;
    
    const credentials: UserCredentials = {
      email: studentEmail,
      password: password, // Store temporarily for admin access
      username: username,
      role: 'student',
      temporaryPassword: true,
      mustChangePassword: false, // Students don't need to change on first login
      createdAt: new Date(),
      parentEmail: registrationData.parentEmail
    };
    
    // Store user data in Firestore
    await setDoc(doc(db, 'users', uid), {
      ...credentials,
      uid: uid,
      profile: {
        name: registrationData.childName,
        age: registrationData.childAge,
        courseId: registrationData.courseId,
        courseName: registrationData.courseName,
        enrollmentDate: new Date(),
        progress: 0,
        certificates: []
      }
    });
    
    // Store credentials for admin access
    await setDoc(doc(db, 'userCredentials', uid), credentials);
    
    return credentials;
  } catch (error) {
    console.error('Error creating student account:', error);
    throw new Error('Failed to create student account');
  }
}

/**
 * Create parent account with auto-generated credentials
 */
export async function createParentAccount(parentEmail: string, parentName: string, childEmail: string): Promise<UserCredentials> {
  try {
    const password = generateSecurePassword(12);
    const username = generateUsername(parentEmail, 'parent');
    
    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(auth, parentEmail, password);
    const uid = userCredential.user.uid;
    
    const credentials: UserCredentials = {
      email: parentEmail,
      password: password, // Store temporarily for admin access
      username: username,
      role: 'parent',
      temporaryPassword: true,
      mustChangePassword: true, // Parents must change password on first login
      createdAt: new Date(),
      childEmails: [childEmail]
    };
    
    // Store user data in Firestore
    await setDoc(doc(db, 'users', uid), {
      ...credentials,
      uid: uid,
      profile: {
        name: parentName,
        children: [childEmail],
        dashboardPreferences: {
          notifications: true,
          weeklyReports: true,
          safetyAlerts: true
        }
      }
    });
    
    // Store credentials for admin access
    await setDoc(doc(db, 'userCredentials', uid), credentials);
    
    return credentials;
  } catch (error) {
    console.error('Error creating parent account:', error);
    throw new Error('Failed to create parent account');
  }
}

/**
 * Process complete family registration (student + parent)
 */
export async function processFamilyRegistration(registrationData: StudentRegistrationData): Promise<{
  studentCredentials: UserCredentials;
  parentCredentials: UserCredentials;
}> {
  try {
    // Create student account first
    const studentCredentials = await createStudentAccount(registrationData);
    
    // Create parent account
    const parentCredentials = await createParentAccount(
      registrationData.parentEmail,
      registrationData.parentName,
      studentCredentials.email
    );
    
    // Send welcome emails (implement email service)
    await sendWelcomeEmails(studentCredentials, parentCredentials, registrationData);
    
    return {
      studentCredentials,
      parentCredentials
    };
  } catch (error) {
    console.error('Error processing family registration:', error);
    throw new Error('Failed to process family registration');
  }
}

/**
 * Get all user credentials (admin only)
 */
export async function getAllUserCredentials(): Promise<UserCredentials[]> {
  try {
    // This function should only be accessible by admins
    // Implementation depends on your Firestore security rules
    const credentialsSnapshot = await collection(db, 'userCredentials').get();
    return credentialsSnapshot.docs.map(doc => doc.data() as UserCredentials);
  } catch (error) {
    console.error('Error fetching user credentials:', error);
    throw new Error('Failed to fetch user credentials');
  }
}

/**
 * Reset user password and generate new temporary password
 */
export async function resetUserPassword(userEmail: string): Promise<string> {
  try {
    const newPassword = generateSecurePassword(12);
    
    // Send password reset email
    await sendPasswordResetEmail(auth, userEmail);
    
    // Update stored credentials
    const userDoc = await getDoc(doc(db, 'users', userEmail));
    if (userDoc.exists()) {
      await updateDoc(doc(db, 'userCredentials', userDoc.id), {
        password: newPassword,
        temporaryPassword: true,
        mustChangePassword: true,
        passwordResetAt: new Date()
      });
    }
    
    return newPassword;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Failed to reset password');
  }
}

/**
 * Send welcome emails to new users
 */
async function sendWelcomeEmails(
  studentCredentials: UserCredentials,
  parentCredentials: UserCredentials,
  registrationData: StudentRegistrationData
): Promise<void> {
  // Implementation depends on your email service (SendGrid, etc.)
  console.log('Sending welcome emails:', {
    student: studentCredentials.email,
    parent: parentCredentials.email,
    course: registrationData.courseName
  });
  
  // TODO: Implement actual email sending
  // await emailService.sendStudentWelcome(studentCredentials, registrationData);
  // await emailService.sendParentWelcome(parentCredentials, registrationData);
}

/**
 * Sample test credentials for development
 */
export const SAMPLE_CREDENTIALS = {
  admin: {
    email: 'admin@digisafe.eu',
    password: 'DigiSafe2024Admin!',
    role: 'admin' as const
  },
  parent: {
    email: 'parent.test@digisafe.eu',
    password: 'ParentTest123!',
    role: 'parent' as const,
    childName: 'Emma Thompson'
  },
  student: {
    email: 'student.test@digisafe.eu',
    password: 'StudentSafe456!',
    role: 'student' as const,
    course: 'Digital Safety Fundamentals'
  }
};