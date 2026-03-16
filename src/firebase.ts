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

// Test connection
async function testConnection() {
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.error("Firebase config is missing in environment variables. Make sure your .env file has VITE_FIREBASE_* variables.");
    return;
  }

  try {
    // Try to read a non-existent document to test connectivity
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection successful');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase connection failed: Client is offline. Please check your network or Firebase configuration.");
    } else {
      // Ignore other errors (like permission denied) as we just want to test connectivity
      // console.log('Firebase connection test result:', error);
    }
  }
}

testConnection();
