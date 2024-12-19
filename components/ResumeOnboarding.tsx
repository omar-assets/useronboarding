import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useOnboardingPersistence } from '@/hooks/useOnboardingPersistence';

export function ResumeOnboarding() {
  const router = useRouter();
  const { loadProgress, clearProgress } = useOnboardingPersistence();
  const { restoreProgress } = useOnboarding();
  const [showDialog, setShowDialog] = useState(false);
  const [savedProgress, setSavedProgress] = useState<any>(null);

  useEffect(() => {
    const progress = loadProgress();
    if (progress && router.pathname === '/sign-up') {
      setSavedProgress(progress);
      setShowDialog(true);
    }
  }, [loadProgress, router.pathname]);

  const handleResume = () => {
    if (savedProgress) {
      restoreProgress(savedProgress.state);
      const nextPath = getNextPath(savedProgress.state);
      router.push(nextPath);
    }
    setShowDialog(false);
  };

  const handleStartFresh = () => {
    clearProgress();
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resume Your Application</DialogTitle>
          <DialogDescription>
            We found your previous progress from {' '}
            {savedProgress?.lastUpdated && new Date(savedProgress.lastUpdated).toLocaleDateString()}
            . Would you like to continue where you left off?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleStartFresh}>
            Start Fresh
          </Button>
          <Button onClick={handleResume}>
            Continue Progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getNextPath(state: any): string {
  if (!state.accountDetails.email) return '/sign-up';
  if (!state.accountDetails.securityQuestion) return '/onboarding/account-details';
  if (!state.investorProfile.type) return '/onboarding/investor-type';
  if (!state.personalInfo.firstName) return '/onboarding/personal-info';
  return '/onboarding/review';
}