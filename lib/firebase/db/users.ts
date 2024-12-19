import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config';
import { firebaseLogger } from '../logger';
import type { OnboardingState } from '@/types/onboarding';

export async function createUserDocument(userId: string, data: OnboardingState) {
  try {
    firebaseLogger.info('Creating user document');
    const userDoc = {
      email: data.accountDetails.email,
      securityQuestion: data.accountDetails.securityQuestion,
      securityAnswer: data.accountDetails.securityAnswer,
      firstName: data.personalInfo.firstName,
      lastName: data.personalInfo.lastName,
      dateOfBirth: data.personalInfo.dateOfBirth,
      phoneNumber: data.personalInfo.phoneNumber,
      address: data.personalInfo.address,
      investorProfile: data.investorProfile,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', userId), userDoc);
    firebaseLogger.info('User document created successfully');
    return true;
  } catch (error) {
    firebaseLogger.error('Failed to create user document', error);
    throw error;
  }
}