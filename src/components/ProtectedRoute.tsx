import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import type { BaseUser } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<BaseUser['role']>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    // Redirect to appropriate login page based on the attempted route
    const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/student/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}