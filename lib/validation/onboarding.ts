import { z } from 'zod';

export const onboardingSchema = z.object({
  accountDetails: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    securityQuestion: z.string().min(1, 'Security question is required'),
    securityAnswer: z.string().min(1, 'Security answer is required'),
  }),
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().length(2, 'Invalid state'),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
      country: z.string().min(1, 'Country is required'),
    }),
  }),
  investorProfile: z.object({
    type: z.enum(['individual', 'institutional', 'advisor']),
    accountType: z.string(),
    investmentGoal: z.string(),
    riskTolerance: z.string(),
    initialInvestment: z.string(),
  }),
});