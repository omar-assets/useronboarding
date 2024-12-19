'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { submitOnboarding } from '@/lib/firebase/onboarding/submit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewSection } from '@/components/ReviewSection';
import { Loader2 } from 'lucide-react';
import { useOnboardingToasts } from '@/hooks/useOnboardingToasts';

export default function Review() {
  const router = useRouter();
  const { state } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { showSuccessToast, showErrorToast } = useOnboardingToasts();

  useEffect(() => {
    if (!state.accountDetails.email || 
        !state.accountDetails.securityQuestion || 
        !state.investorProfile.type || 
        !state.personalInfo.firstName) {
      router.push('/sign-up');
    }
  }, [state, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitOnboarding(state);
      if (result.success) {
        showSuccessToast('Your account has been created successfully!');
        router.push('/welcome');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to submit onboarding information';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  return (
    // ... existing JSX
  );
}