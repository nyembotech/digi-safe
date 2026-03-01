import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';
import type { PDFSettings } from '../types/settings';

const defaultSettings: PDFSettings = {
  company: {
    name: 'DigiSafe Europe GmbH',
    address: {
      street: 'Innovationsstraße 123',
      city: 'Frankfurt am Main',
      postalCode: '60313',
      country: 'Germany'
    },
    vat: 'DE123456789',
    email: 'support@digisafe-europe.eu',
    phone: '+49 (0) 69 1234567'
  },
  invoice: {
    prefix: 'INV',
    footer: 'Thank you for choosing DigiSafe Europe. For any questions, please contact us.',
    terms: [
      'Payment is due within 30 days',
      'Late payments may incur additional fees',
      'All prices include VAT'
    ],
    colors: {
      primary: '#003399',
      secondary: '#FFD700',
      accent: '#059669'
    }
  }
};

export async function getPDFSettings(): Promise<PDFSettings> {
  try {
    const docRef = doc(db, 'settings', 'pdf');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PDFSettings;
    }

    // Initialize with default settings if none exist
    await setDoc(docRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error fetching PDF settings:', error);
    return defaultSettings;
  }
}

export async function updatePDFSettings(settings: PDFSettings): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'pdf');
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error updating PDF settings:', error);
    throw error;
  }
}