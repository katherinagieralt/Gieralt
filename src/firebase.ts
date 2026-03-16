import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
  ? getFirestore(app, import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID)
  : getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Secondary Firebase App for Administrative Tasks (e.g. creating users without logging out admin)
// We initialize it with a different name to prevent session conflicts
export const secondaryApp = !getApps().find(a => a.name === "Secondary") 
  ? initializeApp(firebaseConfig, "Secondary") 
  : getApp("Secondary");

export const secondaryAuth = getAuth(secondaryApp);
// Disable persistence for secondary auth to be extra safe
secondaryAuth.setPersistence({ type: 'NONE' } as any).catch(() => {});

// Connection test removed for performance. 
// Firebase is initialized lazily or via React Query hooks.
