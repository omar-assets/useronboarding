'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SECURITY_QUESTIONS = [
  "What was your first pet's name?",
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What high school did you attend?",
  "What was your childhood nickname?",
];

export default function AccountDetails() {
  const router = useRouter();
  const { state, setAccountDetails } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    securityQuestion: state.accountDetails.securityQuestion,
    securityAnswer: state.accountDetails.securityAnswer,
  });

  // Redirect if email is not set
  useEffect(() => {
    if (!state.accountDetails.email) {
      router.push('/sign-up');
    }
  }, [state.accountDetails.email, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.securityQuestion) {
      newErrors.securityQuestion = 'Please select a security question';
    }

    if (!formData.securityAnswer) {
      newErrors.securityAnswer = 'Security answer is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setAccountDetails({
        ...state.accountDetails,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      });
      router.push('/onboarding/investor-type');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Set up your account security</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={state.accountDetails.email}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityQuestion">Security Question</Label>
              <Select
                value={formData.securityQuestion}
                onValueChange={(value) => setFormData({ ...formData, securityQuestion: value })}
              >
                <SelectTrigger className={errors.securityQuestion ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  {SECURITY_QUESTIONS.map((question) => (
                    <SelectItem key={question} value={question}>
                      {question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.securityQuestion && (
                <p className="text-sm text-destructive">{errors.securityQuestion}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityAnswer">Security Answer</Label>
              <Input
                id="securityAnswer"
                type="text"
                value={formData.securityAnswer}
                onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
                className={errors.securityAnswer ? 'border-destructive' : ''}
              />
              {errors.securityAnswer && (
                <p className="text-sm text-destructive">{errors.securityAnswer}</p>
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