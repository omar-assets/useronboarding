import { useEffect, useCallback } from 'react';
import { OnboardingState } from '@/types/onboarding';

const STORAGE_KEY = 'onboarding_progress';

export function useOnboardingPersistence() {
  const saveProgress = useCallback((state: OnboardingState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        state,
        lastUpdated: new Date().toISOString(),
        currentStep: getCurrentStep(state),
      }));
    } catch (error) {
      console.error('Failed to save onboarding progress:', error);
    }
  }, []);

  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load onboarding progress:', error);
      return null;
    }
  }, []);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear onboarding progress:', error);
    }
  }, []);

  return { saveProgress, loadProgress, clearProgress };
}

function getCurrentStep(state: OnboardingState): number {
  if (!state.accountDetails.email) return 1;
  if (!state.accountDetails.securityQuestion) return 2;
  if (!state.investorProfile.type) return 3;
  if (!state.personalInfo.firstName) return 4;
  return 5;
}