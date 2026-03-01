import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin' | null>(null);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || (user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleRoleSelect = (role: 'student' | 'admin') => {
    setSelectedRole(role);
    navigate(role === 'admin' ? '/admin/login' : '/student/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <Logo size="lg" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to DigiSafe</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose your login type to continue
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('student')}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-colors hover:bg-blue-50 hover:border-blue-500"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Student</h3>
                <p className="text-sm text-gray-500">Access your courses</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('admin')}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-colors hover:bg-blue-50 hover:border-blue-500"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Administrator</h3>
                <p className="text-sm text-gray-500">Manage platform</p>
              </div>
            </motion.button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Need help? Contact support@digisafe-europe.eu</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}