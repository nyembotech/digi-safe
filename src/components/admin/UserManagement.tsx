import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Key, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Lock,
  Unlock,
  Trash2,
  Search
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../Card';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog';
import { createStudent } from '../../firebase/auth';
import { getStudents, updateStudentStatus, deleteStudent, getSampleStudent } from '../../firebase/students';
import { formatDate } from '../../lib/utils';
import type { StudentUser } from '../../types/auth';

export function UserManagement() {
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentUser | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    loadStudents();
  }, []);

  const handleViewCredentials = async () => {
    try {
      const credentials = await getSampleStudent();
      if (credentials) {
        console.log('Student Credentials:', {
          keypass: credentials.keypass,
          password: credentials.password
        });
      } else {
        console.log('No students found');
      }
    } catch (error) {
      console.error('Error getting student credentials:', error);
    }
  };

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  }

  const handleCreateStudent = async (data: any) => {
    try {
      setActionLoading(true);
      setError(null);

      const credentials = await createStudent(
        data.firstName,
        data.lastName,
        parseInt(data.age),
        data.parentEmail
      );

      setSuccess(`Student account created successfully! Email: ${credentials.email}`);
      setShowAddDialog(false);
      reset();
      await loadStudents();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create student');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusUpdate = async (student: StudentUser, enabled: boolean) => {
    try {
      setActionLoading(true);
      setError(null);
      await updateStudentStatus(student.uid, enabled);
      await loadStudents();
      setSuccess(`Student account ${enabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      setError('Failed to update student status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStudent = async (student: StudentUser) => {
    if (!confirm('Are you sure you want to delete this student account? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);
      await deleteStudent(student.uid);
      await loadStudents();
      setSuccess('Student account deleted successfully');
    } catch (error) {
      setError('Failed to delete student account');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            onClick={handleViewCredentials}
            className="flex items-center gap-2"
          >
            View Sample Credentials
          </Button>

          <Button
            variant="primary"
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add New Student
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Students List */}
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No students found
            </div>
          ) : (
            <div className="space-y-6">
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.uid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p>Email: {student.email}</p>
                        <p>Parent Email: {student.parentEmail}</p>
                        <p>Created: {formatDate(student.createdAt)}</p>
                        <p>Last Login: {student.lastLogin ? formatDate(student.lastLogin) : 'Never'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outlined"
                        onClick={() => handleStatusUpdate(student, !student.disabled)}
                        disabled={actionLoading}
                        className="flex items-center gap-2"
                      >
                        {student.disabled ? (
                          <>
                            <Unlock className="w-4 h-4" />
                            Enable
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            Disable
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowResetDialog(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Key className="w-4 h-4" />
                        Reset Password
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteStudent(student)}
                        disabled={actionLoading}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleCreateStudent)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">
                    {errors.firstName.message as string}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">
                    {errors.lastName.message as string}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 8, message: 'Minimum age is 8' },
                  max: { value: 16, message: 'Maximum age is 16' }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.age && (
                <span className="text-sm text-red-500">
                  {errors.age.message as string}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Email
              </label>
              <input
                type="email"
                {...register('parentEmail', {
                  required: 'Parent email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.parentEmail && (
                <span className="text-sm text-red-500">
                  {errors.parentEmail.message as string}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setShowAddDialog(false)}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={actionLoading}
                className="flex items-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Student
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p>
              Are you sure you want to reset the password for{' '}
              <span className="font-medium">
                {selectedStudent?.firstName} {selectedStudent?.lastName}
              </span>
              ?
            </p>
            <p className="text-sm text-gray-500">
              A new password will be generated and sent to the parent's email address.
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outlined"
                onClick={() => setShowResetDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={async () => {
                  // TODO: Implement password reset
                  setShowResetDialog(false);
                }}
              >
                <Key className="w-4 h-4" />
                Reset Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}