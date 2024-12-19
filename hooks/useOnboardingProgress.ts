'use client';

import { useEffect, useState } from 'react';
import { OnboardingState } from '@/types/onboarding';

export function useOnboardingProgress(state: OnboardingState) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let step = 1;
    let completed = 0;
    const totalSteps = 5;

    if (state.accountDetails.email) {
      completed++;
      step = 2;
    }
    if (state.accountDetails.securityQuestion) {
      completed++;
      step = 3;
    }
    if (state.investorProfile.type) {
      completed++;
      step = 4;
    }
    if (state.personalInfo.firstName) {
      completed++;
      step = 5;
    }

    setCurrentStep(step);
    setProgress((completed / totalSteps) * 100);
  }, [state]);

  return { progress, currentStep };
}