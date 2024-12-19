import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseLogger } from './logger';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase services
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  firebaseLogger.info('Initializing Firebase');
  
  // Initialize or get existing Firebase app
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  
  // Initialize services
  auth = getAuth(app);
  db = getFirestore(app);
  
  firebaseLogger.info('Firebase services initialized successfully');
} catch (error) {
  firebaseLogger.error('Error initializing Firebase', error);
  throw error;
}

// Export initialized services
export { app, auth, db };

// Export a function to check Firebase initialization status
export function checkFirebaseConnection() {
  const status = {
    isInitialized: !!app && !!auth && !!db,
    app,
    auth,
    db
  };

  firebaseLogger.info('Checking Firebase connection status', status);
  return status;
}