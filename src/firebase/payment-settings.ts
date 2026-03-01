import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export interface PaymentSettings {
  stripe: {
    test: {
      publicKey: string;
      secretKey: string;
      webhookSecret: string;
    };
    production: {
      publicKey: string;
      secretKey: string;
      webhookSecret: string;
    };
    isTestMode: boolean;
  };
  paypal: {
    test: {
      clientId: string;
      clientSecret: string;
      webhookId: string;
    };
    production: {
      clientId: string;
      clientSecret: string;
      webhookId: string;
    };
    isTestMode: boolean;
  };
  lastUpdated: string;
  updatedBy: string;
}

export async function getPaymentSettings(): Promise<PaymentSettings | null> {
  try {
    const docRef = doc(db, 'settings', 'payment');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PaymentSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    return null;
  }
}

export async function updatePaymentSettings(
  settings: Partial<PaymentSettings>,
  userId: string
): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'payment');
    await setDoc(docRef, {
      ...settings,
      lastUpdated: new Date().toISOString(),
      updatedBy: userId
    }, { merge: true });
  } catch (error) {
    console.error('Error updating payment settings:', error);
    throw error;
  }
}