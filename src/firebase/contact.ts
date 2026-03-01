import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      status: 'new',
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}