'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useOnboardingPersistence } from '@/hooks/useOnboardingPersistence';
import type { OnboardingState, OnboardingAction, OnboardingContextType } from '@/types/onboarding';

// Initial state
export const initialState: OnboardingState = {
  accountDetails: {
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
  },
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  },
  investorProfile: {
    type: '',
    accountType: '',
    investmentGoal: '',
    riskTolerance: '',
    initialInvestment: '',
  },
};

// Reducer function
function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_ACCOUNT_DETAILS':
      return {
        ...state,
        accountDetails: { ...state.accountDetails, ...action.payload },
      };
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
          address: {
            ...state.personalInfo.address,
            ...(action.payload.address || {}),
          },
        },
      };
    case 'SET_INVESTOR_PROFILE':
      return {
        ...state,
        investorProfile: { ...state.investorProfile, ...action.payload },
      };
    case 'RESET_ONBOARDING':
      return initialState;
    case 'RESTORE_PROGRESS':
      return action.payload;
    default:
      return state;
  }
}

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const { saveProgress } = useOnboardingPersistence();

  // Save progress whenever state changes
  useEffect(() => {
    saveProgress(state);
  }, [state, saveProgress]);

  const setAccountDetails = (details: Partial<AccountDetails>) => {
    dispatch({ type: 'SET_ACCOUNT_DETAILS', payload: details });
  };

  const setPersonalInfo = (info: Partial<PersonalInfo>) => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: info });
  };

  const setInvestorProfile = (profile: Partial<InvestorProfile>) => {
    dispatch({ type: 'SET_INVESTOR_PROFILE', payload: profile });
  };

  const resetOnboarding = () => {
    dispatch({ type: 'RESET_ONBOARDING' });
  };

  const restoreProgress = (savedState: OnboardingState) => {
    dispatch({ type: 'RESTORE_PROGRESS', payload: savedState });
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setAccountDetails,
        setPersonalInfo,
        setInvestorProfile,
        resetOnboarding,
        restoreProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook for using the context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}