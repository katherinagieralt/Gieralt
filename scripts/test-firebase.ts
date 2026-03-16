import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'ai-studio-f691c7a3-0af0-4eea-a037-8783cfeaede7');

async function test() {
    try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        console.log('Fetched', querySnapshot.size, 'blog posts');
    } catch (e) {
        console.error('Failed to fetch:', e);
    }
}
test();
