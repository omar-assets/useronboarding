import { useOnboarding } from '@/contexts/OnboardingContext';

const STEPS = [
  'Account Creation',
  'Security Setup',
  'Investor Profile',
  'Personal Information',
  'Review'
];

export function OnboardingProgress() {
  const { state } = useOnboarding();
  const currentStep = getCurrentStep(state);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        {STEPS[currentStep - 1]}
      </p>
    </div>
  );
}

function getCurrentStep(state: any): number {
  if (!state.accountDetails.email) return 1;
  if (!state.accountDetails.securityQuestion) return 2;
  if (!state.investorProfile.type) return 3;
  if (!state.personalInfo.firstName) return 4;
  return 5;
}