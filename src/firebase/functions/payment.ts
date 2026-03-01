import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const functions = getFunctions();

export const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');

export async function savePaymentDetails(paymentData: {
  registrationId: string;
  paymentMethod: string;
  amount: number;
  status: string;
  transactionId: string;
}) {
  try {
    const paymentRef = collection(db, 'payments');
    await addDoc(paymentRef, {
      ...paymentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving payment details:', error);
    throw error;
  }
}