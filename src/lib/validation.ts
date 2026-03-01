import { z } from 'zod';

export const emailSchema = z.string()
  .email('Invalid email address')
  .min(1, 'Email is required');

export const phoneSchema = z.string()
  .regex(/^\+?[\d\s-()]{8,}$/, 'Invalid phone number')
  .min(1, 'Phone number is required');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens and apostrophes');

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required')
});

export const registrationSchema = z.object({
  studentInfo: z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    age: z.number()
      .min(8, 'Minimum age is 8')
      .max(16, 'Maximum age is 16'),
    email: emailSchema
  }),
  parentInfo: z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    address: addressSchema
  })
});

export const blogPostSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  excerpt: z.string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt must be less than 200 characters'),
  content: z.string()
    .min(50, 'Content must be at least 50 characters'),
  author: z.string()
    .min(2, 'Author name must be at least 2 characters'),
  category: z.string()
    .min(1, 'Category is required')
});

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});