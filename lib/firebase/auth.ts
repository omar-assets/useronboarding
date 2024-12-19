import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { app } from './config';
import { firebaseLogger } from './logger';
import { getFirebaseErrorMessage } from './errors';

export const auth = getAuth(app);

export async function signUpUser(email: string, password: string): Promise<User> {
  try {
    firebaseLogger.info('Attempting to create new user', { email });
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    firebaseLogger.info('User created successfully', { uid: userCredential.user.uid });
    return userCredential.user;
  } catch (error: any) {
    firebaseLogger.error('Error creating user', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
}

export async function signInUser(email: string, password: string): Promise<User> {
  try {
    firebaseLogger.info('Attempting to sign in user', { email });
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    firebaseLogger.info('User signed in successfully', { uid: userCredential.user.uid });
    return userCredential.user;
  } catch (error: any) {
    firebaseLogger.error('Error signing in user', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
}