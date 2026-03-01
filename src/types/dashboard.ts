import { Timestamp } from 'firebase/firestore';

export interface DashboardStats {
  totalRegistrations: number;
  totalRevenue: number;
  activeStudents: number;
  completionRate: number;
  monthlyRegistrations: Array<{
    month: string;
    count: number;
  }>;
  recentRegistrations: Array<{
    id: string;
    studentName: string;
    courseName: string;
    date: Timestamp;
    amount: number;
    status: string;
  }>;
  updatedAt: Timestamp;
}

interface DashboardLog {
  type: string;
  data: any;
  timestamp: Timestamp;
}