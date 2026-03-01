import { Timestamp } from 'firebase/firestore';

export interface RegistrationData {
  studentInfo: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone?: string;
  };
  parentInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  courseInfo: {
    courseId: string;
    courseName: string;
    sessionId: string;
    date: string;
    time: string;
  };
  payment: {
    method: 'cash' | 'online';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    subsidyRequested: boolean;
    subsidyAmount?: number;
    transactionId?: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  invoiceNumber: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface RegistrationLog {
  registrationId: string;
  action: string;
  details: Record<string, any>;
  timestamp: Timestamp;
}

interface Payment {
  registrationId: string;
  method: 'cash' | 'online';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}