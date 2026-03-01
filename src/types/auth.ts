export interface BaseUser {
  uid: string;
  email: string;
  role: 'admin' | 'student';
  createdAt: string;
  lastLogin: string | null;
  disabled?: boolean;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
}

export interface StudentUser extends BaseUser {
  role: 'student';
  firstName: string;
  lastName: string;
  age: number;
  parentEmail: string;
  courseIds: string[];
  password: string; // Added for student authentication
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface GeneratedCredentials {
  email: string;
  password: string;
  username: string;
}