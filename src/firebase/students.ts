import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import type { StudentUser } from '../types/auth';

export async function getStudents(): Promise<StudentUser[]> {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as StudentUser[];
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

export async function getSampleStudent(): Promise<{keypass: string, password: string} | null> {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, orderBy('createdAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }

    const studentData = snapshot.docs[0].data() as StudentUser;
    return {
      keypass: studentData.keypass,
      password: studentData.password
    };
  } catch (error) {
    console.error('Error fetching sample student:', error);
    return null;
  }
}

export async function updateStudentStatus(uid: string, enabled: boolean): Promise<void> {
  try {
    const studentRef = doc(db, 'students', uid);
    await updateDoc(studentRef, {
      disabled: !enabled,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating student status:', error);
    throw error;
  }
}

export async function deleteStudent(uid: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'students', uid));
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}