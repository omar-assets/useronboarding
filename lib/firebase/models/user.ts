import { db } from '../config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { signUpUser } from '../auth';
import type { OnboardingState } from '@/types/onboarding';

export interface UserDocument {
  id: string;
  email: string;
  securityQuestion: string;
  securityAnswer: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  investorProfile: {
    type: string;
    accountType: string;
    investmentGoal: string;
    riskTolerance: string;
    initialInvestment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser(data: OnboardingState): Promise<string> {
  try {
    console.log('Creating user with data:', data);

    // Create Firebase Auth user
    const firebaseUser = await signUpUser(data.accountDetails.email, data.accountDetails.password);
    console.log('Firebase Auth user created:', firebaseUser.uid);

    // Create user document
    const userDoc = mapOnboardingToUserDoc(data);
    const userRef = doc(collection(db, 'users'), firebaseUser.uid);
    
    await setDoc(userRef, {
      ...userDoc,
      id: firebaseUser.uid,
    });
    console.log('Firestore document created successfully');

    return firebaseUser.uid;
  } catch (error: any) {
    console.error('Error creating user:', error.message, error.code);
    throw error;
  }
}

function mapOnboardingToUserDoc(data: OnboardingState): Omit<UserDocument, 'id'> {
  const now = new Date();
  
  return {
    email: data.accountDetails.email,
    securityQuestion: data.accountDetails.securityQuestion,
    securityAnswer: data.accountDetails.securityAnswer,
    firstName: data.personalInfo.firstName,
    lastName: data.personalInfo.lastName,
    dateOfBirth: data.personalInfo.dateOfBirth,
    phoneNumber: data.personalInfo.phoneNumber,
    address: data.personalInfo.address,
    investorProfile: data.investorProfile,
    createdAt: now,
    updatedAt: now,
  };
}