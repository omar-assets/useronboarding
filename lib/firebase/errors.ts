// Firebase error codes and messages mapping
export const FIREBASE_ERRORS = {
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/invalid-email': 'Invalid email address',
  'auth/operation-not-allowed': 'Email/password accounts are not enabled',
  'auth/weak-password': 'Password is too weak',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
} as const;

export type FirebaseErrorCode = keyof typeof FIREBASE_ERRORS;

export function getFirebaseErrorMessage(code: string): string {
  return (FIREBASE_ERRORS as Record<string, string>)[code] || 'An unexpected error occurred';
}