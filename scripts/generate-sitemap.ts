import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
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
const db = getFirestore(app);

const baseUrl = 'https://katarzynagieralt.pl';

async function generateSitemap() {
    const pages = [
        '/',
        '/login',
        '/admin',
        '/thank-you'
    ];

    const blogSnapshot = await getDocs(collection(db, 'blogPosts'));
    const portfolioSnapshot = await getDocs(collection(db, 'portfolioItems'));

    const blogUrls = blogSnapshot.docs.map(doc => `/blog/${doc.id}`);
    const portfolioUrls = portfolioSnapshot.docs.map(doc => `/portfolio/${doc.id}`);

    const allUrls = [...pages, ...blogUrls, ...portfolioUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;

    writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
