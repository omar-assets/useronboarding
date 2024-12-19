'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OnboardingState } from '@/types/onboarding';
import { validateSubmission } from '@/lib/validation/submission';

export function useOnboardingValidation(state: OnboardingState) {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const validation = validateSubmission(state);
    setIsValid(validation.success);
    setValidationErrors(validation.errors?.map(err => err.message) || []);

    // Redirect if critical data is missing
    if (!state.accountDetails.email) {
      router.push('/sign-up');
    }
  }, [state, router]);

  return { isValid, validationErrors };
}