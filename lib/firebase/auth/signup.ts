import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';
import { firebaseLogger } from '../logger';
import { getFirebaseErrorMessage } from '../errors';

export async function signUpWithEmailAndPassword(email: string, password: string) {
  try {
    firebaseLogger.info('Creating new user account');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    firebaseLogger.info('User account created successfully');
    return userCredential.user;
  } catch (error: any) {
    firebaseLogger.error('Failed to create user account', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
}