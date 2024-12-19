'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const INVESTOR_TYPES = [
  { value: 'individual', label: 'Individual Investor' },
  { value: 'institutional', label: 'Institutional Investor' },
  { value: 'advisor', label: 'Financial Advisor' },
] as const;

type InvestorType = typeof INVESTOR_TYPES[number]['value'];

export default function InvestorType() {
  const router = useRouter();
  const { state, setInvestorProfile } = useOnboarding();
  const [selectedType, setSelectedType] = useState<InvestorType | ''>(state.investorProfile.type || '');
  const [error, setError] = useState('');

  // Redirect if account details are not set
  useEffect(() => {
    if (!state.accountDetails.email || !state.accountDetails.securityQuestion) {
      router.push('/sign-up');
    }
  }, [state.accountDetails, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      setError('Please select an investor type');
      return;
    }

    try {
      await setInvestorProfile({
        ...state.investorProfile,
        type: selectedType
      });
      await router.push('/onboarding/personal-info');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Investor Profile</CardTitle>
          <CardDescription>Select your investor type to help us customize your experience</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="investorType">Investor Type</Label>
              <Select
                value={selectedType}
                onValueChange={(value: InvestorType) => {
                  setSelectedType(value);
                  setError('');
                }}
              >
                <SelectTrigger id="investorType" className={error ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select your investor type" />
                </SelectTrigger>
                <SelectContent>
                  {INVESTOR_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}