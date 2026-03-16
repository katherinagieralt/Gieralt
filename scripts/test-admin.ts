import * as admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: 'gen-lang-client-0928557519',
    });
    console.log('Firebase Admin initialized successfully');
} catch (e) {
    console.error('Failed to initialize Firebase Admin:', e);
}
