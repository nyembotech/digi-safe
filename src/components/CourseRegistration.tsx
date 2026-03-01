import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { PaymentForm } from './PaymentForm';
import { createRegistration } from '../firebase/registrations';
import type { Course, Session } from '../types/course';

interface CourseRegistrationProps {
  course: Course;
  selectedSession: Session;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CourseRegistration({
  course,
  selectedSession,
  onSuccess,
  onCancel
}: CourseRegistrationProps) {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInfoSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const registrationData = {
        studentInfo: {
          firstName: data.studentFirstName,
          lastName: data.studentLastName,
          age: parseInt(data.studentAge),
          email: data.studentEmail
        },
        parentInfo: {
          firstName: data.parentFirstName,
          lastName: data.parentLastName,
          email: data.parentEmail,
          phone: data.parentPhone,
          address: {
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country
          }
        },
        courseInfo: {
          courseId: course.id,
          courseName: course.title,
          sessionId: selectedSession.id,
          date: selectedSession.date,
          time: selectedSession.time
        },
        payment: {
          method: 'pending',
          amount: course.price,
          status: 'pending',
          subsidyRequested: false
        },
        status: 'pending'
      };

      const id = await createRegistration(registrationData);
      setRegistrationId(id);
      setStep('payment');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentMethod: string, transactionId: string) => {
    try {
      // Payment successful, update registration
      onSuccess();
    } catch (error) {
      console.error('Error updating registration:', error);
      setError('Failed to update registration');
    }
  };

  const handlePaymentError = (error: Error) => {
    setError(error.message);
  };

  if (step === 'payment' && registrationId) {
    return (
      <PaymentForm
        registrationId={registrationId}
        amount={course.price}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(handleInfoSubmit)} className="space-y-6">
      {/* Student Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Student Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register('studentFirstName', { required: 'First name is required' })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.studentFirstName && (
              <span className="text-sm text-red-500">
                {errors.studentFirstName.message as string}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...register('studentLastName', { required: 'Last name is required' })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.studentLastName && (
              <span className="text-sm text-red-500">
                {errors.studentLastName.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              {...register('studentAge', {
                required: 'Age is required',
                min: { value: 8, message: 'Minimum age is 8' },
                max: { value: 16, message: 'Maximum age is 16' }
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.studentAge && (
              <span className="text-sm text-red-500">
                {errors.studentAge.message as string}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('studentEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.studentEmail && (
              <span className="text-sm text-red-500">
                {errors.studentEmail.message as string}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Parent Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register('parentFirstName', { required: 'First name is required' })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.parentFirstName && (
              <span className="text-sm text-red-500">
                {errors.parentFirstName.message as string}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...register('parentLastName', { required: 'Last name is required' })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.parentLastName && (
              <span className="text-sm text-red-500">
                {errors.parentLastName.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('parentEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.parentEmail && (
              <span className="text-sm text-red-500">
                {errors.parentEmail.message as string}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              {...register('parentPhone', { required: 'Phone is required' })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.parentPhone && (
              <span className="text-sm text-red-500">
                {errors.parentPhone.message as string}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            {...register('street')}
            placeholder="Street Address"
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              {...register('city')}
              placeholder="City"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              {...register('postalCode')}
              placeholder="Postal Code"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              {...register('country')}
              placeholder="Country"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </form>
  );
}