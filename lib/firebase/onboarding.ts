import { createUser } from './models/user';
import { validateSubmission } from '../validation/submission';
import { firebaseLogger } from './logger';
import type { OnboardingState } from '@/types/onboarding';

export async function handleOnboardingSubmission(data: OnboardingState) {
  try {
    firebaseLogger.info('Starting onboarding submission');

    // Validate the submission data
    const validation = validateSubmission(data);
    if (!validation.success) {
      const error = validation.errors?.[0]?.message || 'Invalid data provided';
      firebaseLogger.warn('Validation failed', { error });
      throw new Error(error);
    }

    // Create user in Firebase
    firebaseLogger.info('Creating user in Firebase');
    const userId = await createUser(data);

    firebaseLogger.info('Onboarding completed successfully', { userId });
    return { success: true, userId };
  } catch (error: any) {
    firebaseLogger.error('Onboarding error', error);
    throw error;
  }
}