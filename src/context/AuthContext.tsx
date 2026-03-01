import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/auth';
import { Loader2 } from 'lucide-react';
import type { AdminUser, StudentUser } from '../types/auth';

interface AuthContextType {
  user: AdminUser | StudentUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | StudentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing student session on mount
    const checkStudentSession = () => {
      const studentSessionStr = sessionStorage.getItem('studentSession');
      if (studentSessionStr) {
        try {
          const studentData = JSON.parse(studentSessionStr) as StudentUser;
          setUser(studentData);
        } catch (error) {
          console.error('Error parsing student session:', error);
          sessionStorage.removeItem('studentSession');
        }
      }
    };

    checkStudentSession();

    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};