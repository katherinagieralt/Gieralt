<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Gieralt — Creative Studio Portfolio & Client OS

[![Project Status: Launch Ready](https://img.shields.io/badge/Status-Launch%20Ready-success?style=for-the-badge)](https://katarzynagieralt.pl)
[![CI — Lint & Tests](https://github.com/katherinagieralt/Gieralt/actions/workflows/ci.yml/badge.svg)](https://github.com/katherinagieralt/Gieralt/actions/workflows/ci.yml)
[![Deploy to Firebase](https://github.com/katherinagieralt/Gieralt/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/katherinagieralt/Gieralt/actions/workflows/firebase-hosting-merge.yml)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-6E9F18?logo=vitest)](https://vitest.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com)

</div>

## 🚀 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **State:** Zustand, TanStack React Query
- **Backend/Auth:** Firebase Firestore, Firebase Auth, Firebase Hosting
- **AI:** Google Gemini API (`@google/genai`)
- **Tests:** Vitest + @testing-library/react (29 tests)
- **CI/CD:** GitHub Actions + Dependabot

## 🛠 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test
npm run test:watch     # watch mode
npm run test:ui        # Vitest UI
npm run test:coverage  # with coverage report

# Build
npm run build

# TypeScript check
npm run lint
```

## 🔐 Environment Variables

Copy `.env.example` (or set these in GitHub Secrets for CI):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_FIRESTORE_DATABASE_ID=
VITE_RECAPTCHA_SITE_KEY=
GEMINI_API_KEY=
APP_URL=
```

## 📐 Architecture

```
src/
├── components/          # Shared UI components
│   ├── admin/           # AdminNav, AdminStats (Sprint 46)
│   └── ...
├── features/
│   └── client-os/       # AI Narrator, Scope Configurator, MicroLearning
├── stores/              # Zustand stores (useAdminStore)
├── hooks/               # useFirestoreQuery
├── services/            # Firebase, AI, SEO services
└── test/                # Vitest tests + mocks
```
