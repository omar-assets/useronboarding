import { z } from 'zod';

// Validation schemas for each section
const accountDetailsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  securityQuestion: z.string().min(1, 'Security question is required'),
  securityAnswer: z.string().min(1, 'Security answer is required'),
});

const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'Invalid state'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(1, 'Country is required'),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  address: addressSchema,
});

const investorProfileSchema = z.object({
  type: z.enum(['individual', 'institutional', 'advisor']),
  accountType: z.string(),
  investmentGoal: z.string(),
  riskTolerance: z.string(),
  initialInvestment: z.string(),
});

// Combined submission schema
export const submissionSchema = z.object({
  accountDetails: accountDetailsSchema,
  personalInfo: personalInfoSchema,
  investorProfile: investorProfileSchema,
});

// Type for validation errors
export type ValidationError = {
  path: string[];
  message: string;
};

// Validation utility function
export function validateSubmission(data: unknown): {
  success: boolean;
  errors?: ValidationError[];
} {
  try {
    submissionSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return { success: false, errors };
    }
    return { 
      success: false, 
      errors: [{ path: ['unknown'], message: 'Unknown validation error' }] 
    };
  }
}