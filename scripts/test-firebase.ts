import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0928557519",
  appId: "1:677025367520:web:8797bbd22042da9258d785",
  apiKey: "AIzaSyDjYi67ZxwKCYwGiFwRUoApEWztOEYA8bs",
  authDomain: "gen-lang-client-0928557519.firebaseapp.com",
  storageBucket: "gen-lang-client-0928557519.firebasestorage.app",
  messagingSenderId: "677025367520",
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
