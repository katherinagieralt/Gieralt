// @ts-ignore
console.log("TEST VITE:", import.meta.env.VITE_FIREBASE_API_KEY);
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

console.log("DEBUG - API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
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
// If VITE_FIREBASE_FIRESTORE_DATABASE_ID is provided, use it, otherwise use default
export const db = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
  ? getFirestore(app, import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID)
  : getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);


// Connection test removed for performance. 
// Firebase is initialized lazily or via React Query hooks.
