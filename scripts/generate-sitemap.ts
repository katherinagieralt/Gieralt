import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = JSON.parse(readFileSync(join(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp({
    projectId: firebaseConfig.projectId,
    appId: firebaseConfig.appId,
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
});
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

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
