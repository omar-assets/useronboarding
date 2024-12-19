// Account Details Types
export interface AccountDetails {
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

// Personal Info Types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: Address;
}

// Investor Profile Types
export interface InvestorProfile {
  type: 'individual' | 'institutional' | 'advisor' | '';
  accountType: 'individual' | 'joint' | 'ira' | '401k' | '';
  investmentGoal: 'retirement' | 'savings' | 'growth' | 'income' | '';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive' | '';
  initialInvestment: string;
}

// Combined State Type
export interface OnboardingState {
  accountDetails: AccountDetails;
  personalInfo: PersonalInfo;
  investorProfile: InvestorProfile;
}

// Action Types
export type OnboardingAction =
  | { type: 'SET_ACCOUNT_DETAILS'; payload: Partial<AccountDetails> }
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_INVESTOR_PROFILE'; payload: Partial<InvestorProfile> }
  | { type: 'RESET_ONBOARDING' }
  | { type: 'RESTORE_PROGRESS'; payload: OnboardingState };

// Context Type
export interface OnboardingContextType {
  state: OnboardingState;
  setAccountDetails: (details: Partial<AccountDetails>) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setInvestorProfile: (profile: Partial<InvestorProfile>) => void;
  resetOnboarding: () => void;
  restoreProgress: (state: OnboardingState) => void;
}