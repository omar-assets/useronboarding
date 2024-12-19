import { signUpWithEmailAndPassword } from '../auth/signup';
import { createUserDocument } from '../db/users';
import { validateSubmission } from '@/lib/validation/submission';
import { firebaseLogger } from '../logger';
import type { OnboardingState } from '@/types/onboarding';

export async function submitOnboarding(data: OnboardingState) {
  try {
    firebaseLogger.info('Starting onboarding submission');

    // Validate submission data
    const validation = validateSubmission(data);
    if (!validation.success) {
      const error = validation.errors?.[0]?.message || 'Invalid data provided';
      firebaseLogger.warn('Validation failed', { error });
      throw new Error(error);
    }

    // Create Firebase auth user
    const user = await signUpWithEmailAndPassword(
      data.accountDetails.email,
      data.accountDetails.password
    );

    // Create user document
    await createUserDocument(user.uid, data);

    firebaseLogger.info('Onboarding completed successfully');
    return { success: true, userId: user.uid };
  } catch (error: any) {
    firebaseLogger.error('Onboarding submission failed', error);
    throw error;
  }
}