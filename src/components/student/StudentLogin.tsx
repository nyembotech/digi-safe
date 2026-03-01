import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInStudent } from '../../firebase/auth';
import { Button } from '../Button';
import { useAuth } from '../../context/AuthContext';

export function StudentLogin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [keypass, setKeypass] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'student') {
      navigate('/student/dashboard');
    } else if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const trimmedKeypass = keypass.trim();
      const trimmedPassword = password.trim();

      if (!trimmedKeypass || !trimmedPassword) {
        throw new Error('Please enter both Student ID and password');
      }

      await signInStudent(trimmedKeypass, trimmedPassword);
      navigate('/student/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

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
              className="flex justify-center"
            >
              <Bot className="w-16 h-16 text-blue-500" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Student!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in with your Student ID and password
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="keypass" className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  id="keypass"
                  name="keypass"
                  type="text"
                  required
                  value={keypass}
                  onChange={(e) => setKeypass(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Student ID"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-center text-gray-600">
              Having trouble signing in? Ask your parent to contact support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}