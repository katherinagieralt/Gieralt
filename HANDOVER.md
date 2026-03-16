# 🚚 HANDOVER: Gieralt Creative Studio & Client OS

Gratulacje! Projekt jest gotowy do wdrożenia. Poniżej znajdziesz kluczowe informacje niezbędne do zarządzania systemem.

## 1. Architektura Systemu
System został zbudowany jako nowoczesna aplikacja typu **PWA (Progressive Web App)** w oparciu o:
- **Frontend:** React 19 + Vite (Turbo build)
- **Styling:** Tailwind CSS v4 (Modern engine)
- **Backend:** Firebase (Firestore, Auth, Hosting)
- **AI Engine:** Google Gemini API (Model: `gemini-3-flash-preview`)

## 2. Pierwsze Kroki po Przejęciu
Aby uruchomić projekt na nowym środowisku:
1. Skonfiguruj projekt w [Firebase Console](https://console.firebase.google.com/).
2. Pobierz klucze konfiguracyjne aplikacji i wpisz je do pliku `.env`:
   ```env
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_PROJECT_ID=xxx
   ... (zobacz .env.example)
   ```
3. Wygeneruj klucz API w [Google AI Studio](https://aistudio.google.com/) i dodaj go jako `GEMINI_API_KEY`.

## 3. Deployment (Wdrożenie)
Wdrożenie odbywa się automatycznie przez **GitHub Actions** na każdą zmianę w gałęzi `main`.
Manualny deploy:
```bash
npm run build
npx firebase deploy --only hosting
```

## 4. Panel Administratora
Panel dostępny pod adresem `/admin`.
- Dostęp wymaga zalogowania kontem Google, które musi znajdować się na liście autoryzowanych adresów w Firebase Auth.
- Przez panel możesz zarządzać Portfolio, Blogiem oraz widzieć spływające Leady z analizą AI.

## 5. Portal Klienta
Dostęp dla klientów pod adresem `/client`.
- Umożliwia śledzenie statusu projektu, czat z AI (AI Support) oraz pobieranie plików.
- Projekty przypisuje się klientom (adres email) w Dashboardzie Admina.

---

**Status Projektu:** 🟢 100% Launch Ready
**Wsparcie:** Dokumentacja techniczna znajduje się w pliku `DOCS.md`.
