import { OnboardingState } from '@/types/onboarding';

export async function submitOnboarding(data: OnboardingState) {
  const response = await fetch('/api/complete-onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit onboarding information');
  }

  return response.json();
}