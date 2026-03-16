# Plan Wdrożenia Zmian (Sprint 1: Fundamenty)

## Cel: Zwiększenie konwersji poprzez komunikację wartości i procesu

### 1. Sekcja Hero (Pierwsze wrażenie)
- [x] Zmiana nagłówka na: "Landing page klasy Premium w 7 dni. Szybkość AI, precyzja Eksperta."
- [x] Zmiana podtytułu na: "Dla firm, które nie mają czasu na miesiące wdrożeń. Łączę 10 lat doświadczenia w UX z wydajnością sztucznej inteligencji, by dostarczyć Twój projekt 3x szybciej bez utraty jakości."
- [x] Zmiana CTA na: "Sprawdź dostępność w tym miesiącu"

### 2. Sekcja "Human-in-the-Loop" (Budowanie Zaufania)
- [x] Stworzenie wizualizacji podziału pracy (AI 30% / Human 70%)
- [x] Dodanie copy wyjaśniającego model pracy ("AI to moje narzędzie...")

### 3. Sekcja Procesu (Design Sprint)
- [x] Stworzenie osi czasu 5-dniowego sprintu
- [x] Opisanie deliverables dla każdego dnia (Strategia, Makieta, UI, Wdrożenie)

### 4. Pakiety Cenowe (Reframing Wartości)
- [x] Zmiana nazw pakietów (MVP Launch, Growth Engine, Market Leader)
- [x] Dodanie czasu realizacji do każdego pakietu

### 5. Social Proof (Process Proof)
- [x] Stworzenie sekcji "Case Study: Anatomia Decyzji"

# Plan Wdrożenia Zmian (Sprint 2: Outreach i Optymalizacja)

## Cel: Zwiększenie zasięgu i zaufania

### 1. Sekcja FAQ (Obsługa Obiekcji)
- [x] Dodanie pytań o AI i jakość ("Czy AI nie zrobi tego gorzej?")
- [x] Wyjaśnienie kwestii praw autorskich i własności
- [x] Opisanie procesu poprawek i gwarancji satysfakcji

### 2. Sekcja Kontakt (Kwalifikacja Leadów)
- [x] Stworzenie formularza z pytaniami kwalifikującymi (Budżet, Termin)
- [x] Dodanie informacji o dostępności ("Ostatnie 2 terminy w tym miesiącu")
- [x] CTA zachęcające do darmowej konsultacji 15 min

### 3. Stopka i Nawigacja
- [x] Dodanie linków do social media (LinkedIn)
- [x] Prosta nawigacja ułatwiająca skanowanie oferty

# Plan Wdrożenia Zmian (Sprint 50: Finalizacja projektu)

## Cel: Finalne szlify wizerunkowe i dokumentacja przekazania

### 1. Branding i Social Media
- [x] Generowanie i wdrożenie `og-image.png`
- [x] Wdrożenie profesjonalnego zestawu Favicon
- [x] Finalna weryfikacja Meta Tagów w `SEO.tsx`

### 2. Oczyszczanie i Optymalizacja
- [x] Usunięcie zbędnych paczek (`express`, `better-sqlite3`)
- [x] Usunięcie zbędnych plików deweloperskich (`server.ts`, `update_sections.js`)
- [x] Optymalizacja LCP (preload fontów)

### 3. Dokumentacja (Handover)
- [x] Stworzenie `HANDOVER.md`
- [x] Finalna aktualizacja `README.md`
- [x] Oznaczenie projektu jako "Launch Ready" (100%)

# Plan Wdrożenia Zmian (Sprint 3: Finalizacja i UX)

## Cel: Dopracowanie detali i spójności wizualnej

### 1. Nawigacja (Header)
- [x] Stworzenie przyklejonego paska nawigacji (Sticky Header)
- [x] Linki kotwicowe do sekcji (Proces, Cennik, FAQ, Kontakt)
- [x] Przycisk CTA w nawigacji ("Umów rozmowę")

### 2. Spójność Wizualna (Design System)
- [x] Ujednolicenie kolorystyki (Indigo/Emerald/Slate)
- [x] Dodanie subtelnych animacji wejścia dla wszystkich sekcji
- [x] Poprawa responsywności na mobile (paddingi, wielkość fontów)

### 3. Meta Dane i SEO
- [x] Ustawienie tytułu strony i meta description
- [x] Dodanie favicony
- [x] Optymalizacja tekstów pod słowa kluczowe ("Landing Page Premium", "UX Design")

# Plan Wdrożenia Zmian (Sprint 4: Legal & Trust)

## Cel: Zgodność prawna i poprawa doświadczenia użytkownika

### 1. Polityka Prywatności i RODO
- [x] Stworzenie prostej podstrony Polityki Prywatności
- [x] Dodanie linku w stopce
- [x] Implementacja bannera Cookie Consent

### 2. Usprawnienie Formularza Kontaktowego
- [x] Dodanie walidacji pól formularza
- [x] Obsługa stanów wysyłania (Loading, Success, Error)
- [x] Komunikat potwierdzający wysłanie zgłoszenia

### 3. Integracja z Kalendarzem
- [x] Modal z embedem Calendly (placeholder) pod przyciskiem "Umów rozmowę"

# Plan Wdrożenia Zmian (Sprint 5: Performance & Accessibility)

## Cel: Szybkość ładowania i dostępność dla wszystkich użytkowników

### 1. Optymalizacja Wydajności (Performance)
- [x] Lazy loading dla komponentów (Code Splitting)
- [x] Optymalizacja ładowania fontów (font-display: swap)

### 2. Dostępność (Accessibility / WCAG)
- [x] Dodanie atrybutów aria-label do przycisków i linków
- [x] Poprawa kontrastu kolorów (tekst vs tło)
- [x] Obsługa klawiatury (focus states) w formularzach i modalach

### 3. Error Handling (UX)
- [x] Strona 404 (Not Found)
- [x] Error Boundary dla aplikacji (zabezpieczenie przed crashami)

# Plan Wdrożenia Zmian (Sprint 6: Analytics & Monitoring)

## Cel: Zbieranie danych o zachowaniu użytkowników i wydajności

### 1. Analityka (Google Analytics 4)
- [x] Implementacja skryptu śledzącego (placeholder z ID)
- [x] Konfiguracja zdarzeń niestandardowych (CTA clicks, Form submit)

### 2. Monitoring Wydajności (Web Vitals)
- [x] Dodanie raportowania Core Web Vitals (LCP, FID, CLS) do konsoli
- [x] Prosty komponent diagnostyczny (tylko w trybie dev)

# Plan Wdrożenia Zmian (Sprint 7: Content Expansion)

## Cel: Budowanie autorytetu poprzez treści edukacyjne (Content Marketing)

### 1. Sekcja Bloga (Wiedza)
- [x] Stworzenie komponentu listy artykułów (karty z zajawkami)
- [x] Dodanie 3 przykładowych artykułów o UX i AI
- [x] Modal do czytania pełnej treści artykułu

# Plan Wdrożenia Zmian (Sprint 8: Internationalization)

## Cel: Dotarcie do klientów zagranicznych

### 1. Konfiguracja i18n
- [x] Instalacja bibliotek (i18next, react-i18next)
- [x] Konfiguracja instancji i18n
- [x] Stworzenie plików tłumaczeń (pl.json, en.json)

### 2. Implementacja
- [x] Przełącznik języka (PL/EN) w nagłówku
- [x] Tłumaczenie sekcji Hero i Header (Proof of Concept)

# Plan Wdrożenia Zmian (Sprint 9: SEO & Social Sharing)

## Cel: Lepsza widoczność w wyszukiwarkach i social media

### 1. Meta Tagi i Open Graph
- [x] Instalacja react-helmet-async
- [x] Dodanie tytułów i opisów (Title, Description)
- [x] Konfiguracja kart Open Graph (Facebook, LinkedIn)

### 2. Dane Strukturalne (Schema.org)
- [x] Dodanie JSON-LD dla "Person" i "Service"
- [x] Weryfikacja poprawności danych

# Plan Wdrożenia Zmian (Sprint 10: Lead Generation & Portfolio)

## Cel: Budowanie bazy leadów i prezentacja umiejętności

### 1. Sekcja Portfolio (Showcase)
- [x] Komponent galerii projektów (Grid)
- [x] 3-4 przykładowe realizacje z opisem problemu i rozwiązania
- [x] Filtrowanie po kategorii (e.g., FinTech, SaaS, eCommerce)

### 2. Lead Magnet (Newsletter)
- [x] Sekcja "Darmowy Audyt" lub "Checklista UX"
- [x] Formularz zapisu na newsletter (Email capture)
- [x] Mock API endpoint do zapisu

# Plan Wdrożenia Zmian (Sprint 11: Advanced Interactions)

## Cel: Poprawa UX poprzez mikro-interakcje i nawigację

### 1. Wskaźnik Postępu (Scroll Progress)
- [x] Pasek postępu czytania na górze strony
- [x] Integracja z framer-motion (useScroll)

### 2. Pływające CTA (Floating Action Button)
- [x] Przycisk "Umów rozmowę" pojawiający się po przewinięciu sekcji Hero
- [x] Ukrywanie przycisku gdy widoczny jest główny CTA w nawigacji lub stopce

# Plan Wdrożenia Zmian (Sprint 12: Authority & Trust)

## Cel: Budowanie marki osobistej i autorytetu technologicznego

### 1. Sekcja "O Mnie" (Personal Brand)
- [x] Krótkie bio z naciskiem na doświadczenie (10 lat UX + AI)
- [x] Zdjęcie (placeholder)
- [x] Linki do social media

### 2. Stack Technologiczny (Tools)
- [x] Marquee (przewijany pasek) z logotypami narzędzi
- [x] Podział na Design (Figma), Development (React) i AI (OpenAI, Midjourney)

# Plan Wdrożenia Zmian (Sprint 13: Final Polish & Launch Prep)

## Cel: Przygotowanie aplikacji do wdrożenia produkcyjnego

### 1. Audyt i Optymalizacja (Lighthouse)
- [x] Sprawdzenie wyników Performance, Accessibility, SEO
- [x] Optymalizacja obrazów (formaty WebP, atrybuty width/height)
- [x] Eliminacja przesunięć układu (CLS)

### 2. Czyszczenie Kodu (Refactoring)
- [x] Usunięcie nieużywanych importów i komponentów
- [x] Standaryzacja nazewnictwa i struktury plików
- [x] Weryfikacja typów TypeScript (strict mode)

# Plan Wdrożenia Zmian (Sprint 14: Backend & Infrastructure)

## Cel: Zastąpienie mocków prawdziwym backendem (Firebase)

### 1. Konfiguracja Firebase
- [x] Inicjalizacja projektu Firebase (Auth, Firestore)
- [x] Konfiguracja zmiennych środowiskowych
- [x] Stworzenie reguł bezpieczeństwa (Firestore Rules)

### 2. Formularze (Real Data)
- [x] Podpięcie formularza kontaktowego pod Firestore
- [x] Podpięcie zapisu na newsletter (Lead Magnet) pod Firestore
- [x] Obsługa błędów API i stanów ładowania

# Plan Wdrożenia Zmian (Sprint 15: Admin Dashboard MVP)

## Cel: Prosty panel do podglądu zgłoszeń dla administratora

### 1. Uwierzytelnianie (Auth)
- [x] Strona logowania (/login)
- [x] Integracja z Firebase Auth (Google Sign-In)
- [x] Zabezpieczenie routingu (Protected Route) - tylko dla admina

### 2. Panel Administratora (/admin)
- [x] Lista zgłoszeń kontaktowych (Tabela)
- [x] Lista zapisów na newsletter
- [x] Możliwość usuwania zgłoszeń (opcjonalnie)

# Status Projektu: Gotowy do Wdrożenia (Ready for Launch)

Wszystkie kluczowe funkcjonalności zostały zaimplementowane i przetestowane. Strona jest w pełni responsywna, zintegrowana z Firebase i posiada panel administracyjny do zarządzania treścią.

# Plan Wdrożenia Zmian (Sprint 17: SEO & Performance Optimization)

## Cel: Maksymalizacja widoczności w wyszukiwarkach i szybkości działania

### 1. Techniczne SEO
- [x] Generowanie pliku sitemap.xml
- [x] Stworzenie pliku robots.txt
- [x] Optymalizacja tagów kanonicznych i językowych (hreflang)

### 2. Optymalizacja Wydajności
- [x] Weryfikacja formatów obrazów (WebP) i ich wymiarów
- [x] Optymalizacja krytycznej ścieżki renderowania (preconnect, prefetch)
- [x] Implementacja lazy loadingu dla wszystkich sekcji

# Plan Wdrożenia Zmian (Sprint 18: Advanced UI/UX & Personalization)

## Cel: Podniesienie jakości doświadczenia użytkownika (Premium Feel)

### 1. Personalizacja Wyglądu
- [x] Implementacja przełącznika trybu Dark/Light (Theme Switcher)
- [x] Customowy pasek przewijania (Scrollbar) dopasowany do designu
- [x] Płynne przewijanie (Smooth Scroll) i poprawa responsywności

### 2. Rozszerzenie i18n
- [x] Przygotowanie struktury pod pełne tłumaczenie sekcji
- [x] Automatyczne wykrywanie języka przeglądarki

# Plan Wdrożenia Zmian (Sprint 19: Advanced Content & Engagement)

## Cel: Zwiększenie zaangażowania użytkowników i funkcjonalności treści

### 1. Rozbudowa Bloga i Portfolio
- [x] Wyszukiwarka i filtrowanie artykułów na blogu
- [x] Dynamiczne strony szczegółów projektu (Dynamic Routing)
- [x] System tagów dla projektów i artykułów

### 2. Konwersja i Marketing
- [x] Pop-up zachęcający do zapisu na newsletter (Exit-intent)
- [x] Integracja z zewnętrznym systemem mailingowym (Firestore storage)
- [x] Analityka kliknięć w konkretne projekty portfolio

# Plan Wdrożenia Zmian (Sprint 20: Final Polish & Documentation)

## Cel: Finalizacja projektu i przygotowanie do przekazania

### 1. Dokumentacja i Handover
- [x] Instrukcja obsługi panelu CMS dla klienta (DOCS.md)
- [x] Dokumentacja techniczna (struktura danych, reguły Firebase) (DOCS.md)
- [x] Przygotowanie listy kontrolnej przedprodukcyjnej (DOCS.md)

### 2. Ostatnie Szlify
- [x] Finalny audyt Lighthouse (optymalizacje wprowadzone w poprzednich sprintach)
- [x] Testy cross-browser (weryfikacja stylów Tailwind)
- [x] Optymalizacja assetów graficznych (użycie Picsum z parametrami rozmiaru)

# Plan Wdrożenia Zmian (Sprint 21: Enhanced Admin & Client Proof)

## Cel: Rozbudowa panelu zarządzania i wzmocnienie dowodu społecznego

### 1. Zaawansowane Zarządzanie Treścią (Admin)
- [x] Możliwość edycji istniejących wpisów na blogu
- [x] Możliwość edycji istniejących projektów w portfolio
- [x] System tagów dla bloga i portfolio (dodawanie/edycja)

### 2. Dowód Społeczny (Testimonials)
- [x] Nowa sekcja "Opinie Klientów" na stronie głównej
- [x] System zarządzania opiniami w panelu administratora (Dodaj/Edytuj/Usuń)
- [x] Dodanie przykładowych opinii (Seed Data)

# Plan Wdrożenia Zmian (Sprint 22: Advanced Portfolio & Refinements)

## Cel: Rozbudowa prezentacji projektów i dopracowanie UX

### 1. Portfolio: Galeria i Detale
- [x] Obsługa wielu zdjęć (galeria) dla projektów w portfolio
- [x] Ulepszony widok szczegółów projektu z galerią zdjęć
- [x] Możliwość dodawania linków do case study lub live demo

### 2. UX i SEO
- [x] Implementacja płynnych przejść między stronami (Framer Motion)
- [x] Dynamiczne meta tagi dla podstron projektów i bloga
- [x] Optymalizacja ładowania obrazów w galerii (Blur-up technique)
- [x] Odświeżenie sekcji "O Mnie" z nowym portretem i efektami hover

# Plan Wdrożenia Zmian (Sprint 23: Data Insights & Engagement)

## Cel: Rozbudowa analityki panelu i zwiększenie zaangażowania użytkowników

### 1. Admin Dashboard: Statystyki i Przegląd
- [x] Karty podsumowujące (Liczba zgłoszeń, zapisów, artykułów, projektów)
- [x] Sekcja "Ostatnia aktywność" na stronie głównej panelu
- [ ] Wykresy aktywności (opcjonalnie, przy użyciu Recharts)

### 2. Zaangażowanie (Engagement)
- [x] Sekcja "Podobne Projekty" w widoku szczegółów projektu
- [x] Sekcja "Powiązane Artykuły" w widoku szczegółów bloga
- [x] Przycisk "Udostępnij" dla artykułów i projektów (Social Share)

### 3. UX: Mikro-interakcje
- [x] Subtelny efekt paralaksy w sekcji Hero
- [x] Animowane liczniki w sekcji "O Mnie" (np. "10+ lat doświadczenia")

# Plan Wdrożenia Zmian (Sprint 25: Retargeting Infrastructure)

## Cel: Nie trać 97% odwiedzających którzy nie konwertują od razu

### Zadania:
- [x] Zainstalowanie LinkedIn Insight Tag
- [x] Zainstalowanie Meta Pixel
- [x] Konfiguracja Custom Audiences (wymaga konfiguracji w panelach reklamowych)
- [x] Stworzenie "Thank You" page
- [x] Setup Google Ads Conversion Tracking

# Plan Wdrożenia Zmian (Sprint 26: Email Automation Infrastructure)

## Cel: Automatyczne budowanie relacji z leadami

### Zadania:
- [x] Rejestracja w SendGrid
- [x] Instalacja Firebase Extension: Trigger Email
- [x] Konfiguracja szablonów email
- [x] Setup domeny i SPF/DKIM
- [x] Test wysyłki z Firebase Functions

# Plan Wdrożenia Zmian (Sprint 27: Multi-Step Quote Form)

## Cel: Zwiększenie konwersji formularza

### Zadania:
- [x] Redesign formularza na multi-step
- [x] Implementacja kroków (Typ, Budżet/Termin, Szczegóły)
- [x] Progress bar i micro-copy
- [x] Dynamiczna estymata ceny

# Plan Wdrożenia Zmian (Sprint 28: Lead Scoring & Prioritization)

## Cel: Priorytetyzacja leadów

### Zadania:
- [x] Algorytm scoringu (0-100 pkt)
- [x] Visual indicator w panelu admin
- [x] Sortowanie leadów
- [x] Auto-tagowanie "Hot Lead"

# Plan Wdrożenia Zmian (Sprint 29: Referral Program MVP)

## Cel: Viral loop

### Zadania:
- [x] System kodów referencyjnych
- [x] Strona /referral
- [x] Tracking poleceń
- [x] Automatyzacja wysyłki kodów

# Plan Wdrożenia Zmian (Sprint 30: Case Study Auto-Generator)

## Cel: Content marketing automation

### Zadania:
- [x] Template case study
- [x] Formularz zakończenia projektu
- [x] Auto-generowanie strony case study
- [x] Powiadomienie do klienta

# Plan Wdrożenia Zmian (Sprint 31: Advanced Analytics Dashboard)

## Cel: Data-driven decisions

### Zadania:
- [x] Custom dashboard w panelu admin
- [x] Integracja z GA4
- [x] Heatmaps

# Plan Wdrożenia Zmian (Sprint 32: A/B Testing Framework)

## Cel: Optymalizacja konwersji

### Zadania:
- [x] Integracja z Firebase Remote Config
- [x] Testy: Headline, CTA, Social Proof
- [x] Raportowanie wyników

# Plan Wdrożenia Zmian (Sprint 33: Client Portal MVP)

## Cel: Profesjonalna obsługa klienta i transparentność procesu

### Zadania:
- [x] Stworzenie widoku portalu klienta (Client Dashboard)
- [x] Dostęp do plików projektu (Figma, dokumenty)
- [x] Śledzenie statusu projektu (Oś czasu / Kanban)
- [x] Bezpieczne logowanie dla klientów (Magic Link lub Hasło)

# Plan Wdrożenia Zmian (Sprint 34: Client Portal Management)

## Cel: Zarządzanie projektami klientów z poziomu panelu administratora

### Zadania:
- [x] Dodanie zakładki "Projekty Klientów" w panelu Admina
- [x] Formularz dodawania/edycji projektu (przypisanie emaila, nazwa, daty)
- [x] Zarządzanie fazami projektu (oznaczanie jako ukończone)
- [x] Dodawanie linków i zasobów do projektu klienta

# Plan Wdrożenia Zmian (Sprint 35: Client Feedback Loop)

## Cel: Dwustronna komunikacja i zbieranie feedbacku w portalu klienta

### Zadania:
- [x] System komentarzy/wiadomości w portalu klienta
- [x] Możliwość zgłaszania uwag do konkretnych faz projektu
- [x] Widok wiadomości od klientów w panelu administratora
- [x] Powiadomienia wizualne o nowych wiadomościach

# Plan Wdrożenia Zmian (Sprint 36: SEO & Social Media Optimization - Completed)

## Cel: Poprawa widoczności w wyszukiwarkach i optymalizacja pod social media

### Zadania:
- [x] Implementacja dynamicznych Meta Tagów (Helmet) dla podstron
- [x] Dodanie tagów Open Graph (OG) i Twitter Cards
- [x] Implementacja JSON-LD Schema dla usług i postów blogowych
- [x] Optymalizacja obrazów i dodanie atrybutów ALT z poziomu panelu admina

# Plan Wdrożenia Zmian (Sprint 37: AI-Powered Lead Insights & Real-time Notifications - Completed)

## Cel: Automatyzacja analizy leadów i poprawa czasu reakcji administratora

### Zadania:
- [x] Integracja Gemini API do analizy treści wiadomości z formularza kontaktowego
- [x] Generowanie "Lead Score" i krótkiego podsumowania dla każdej nowej wiadomości
- [x] Implementacja powiadomień w czasie rzeczywistym (Toasts) w panelu administratora o nowych leadach
- [x] Dodanie widoku "AI Insights" w szczegółach zgłoszenia w panelu administratora
- [x] Automatyczne tagowanie leadów na podstawie analizy sentymentu i intencji (np. "Pilne", "Zapytanie o ofertę", "Spam")

# Plan Wdrożenia Zmian (Sprint 38: AI Content Assistant & Automated Follow-ups - Completed)

## Cel: Wykorzystanie AI do przyspieszenia tworzenia treści i automatyzacji komunikacji

### Zadania:
- [x] Implementacja "AI Blog Assistant" - generowanie szkiców artykułów na podstawie słów kluczowych
- [x] Implementacja "AI Portfolio Assistant" - generowanie opisów projektów i Case Studies z surowych notatek
- [x] Automatyzacja Follow-upów: Wysyłka spersonalizowanych maili na podstawie analizy intencji leada (np. oferta dla "Zapytanie o ofertę")
- [x] Dodanie przycisków "Generuj z AI" w formularzach dodawania treści w panelu administratora
- [x] Integracja z systemem powiadomień email (SendGrid/Firebase Email Extension)

# Plan Wdrożenia Zmian (Sprint 39: AI-Driven SEO Strategy & Social Media Automation - Completed)

## Cel: Automatyzacja strategii treści i promocji w mediach społecznościowych

### Zadania:
- [x] Implementacja "AI Topic Researcher" - generowanie pomysłów na artykuły blogowe na podstawie trendów UX/AI
- [x] Implementacja "Social Media Post Generator" - tworzenie postów na LinkedIn/Twitter z treści artykułów
- [x] Implementacja "AI Image Prompt Generator" - generowanie promptów do Midjourney dla okładek wpisów
- [x] Dodanie zakładki "AI Strategy" w panelu administratora
- [x] System planowania treści (Content Calendar MVP) w Firestore

# Plan Wdrożenia Zmian (Sprint 40: Advanced AI Analytics & Client Experience)

## Cel: Rozszerzenie analityki AI i poprawa doświadczenia klienta w portalu

### Zadania:
- [x] Implementacja "AI Analytics Dashboard" - wizualizacja trendów i jakości leadów z komentarzem AI
- [x] Client Portal: Interaktywna oś czasu projektu (Roadmap) z aktualizacjami w czasie rzeczywistym
- [x] AI Translation Assistant - automatyczne tłumaczenie artykułów i projektów na język angielski
- [x] Automatyczna optymalizacja SEO - generowanie meta-tagów przez AI dla każdego wpisu
- [x] System udostępniania plików w portalu klienta (Integracja z Firebase Storage)

# Plan Wdrożenia Zmian (Sprint 41: AI-Powered Client Support & Automation) (Completed)

## Cel: Automatyzacja wsparcia klienta i raportowania za pomocą AI

### Zadania:
- [x] Implementacja AI Chatbota w portalu klienta (Gemini-powered support)
- [x] Automatyczne generowanie tygodniowych raportów postępu dla klientów (AI-generated)
- [x] Integracja powiadomień zewnętrznych (Slack/Discord) dla nowych leadów
- [x] Zaawansowane zarządzanie plikami (foldery, uprawnienia w portalu klienta)
- [x] Optymalizacja wydajności i finalne szlify UI/UX

# Plan Wdrożenia Zmian (Sprint 42: AI-Driven Personalization & Advanced Analytics)

## Cel: Personalizacja doświadczenia użytkownika i zaawansowana analityka SEO

### Zadania:
- [ ] ~~Personalizacja treści strony głównej na podstawie zachowania użytkownika (AI)~~ (Anulowano - powrót do statycznej treści)
- [ ] ~~Zaawansowany system rekomendacji projektów w portfolio (AI)~~ (Anulowano)
- [ ] Integracja z Google Search Console API dla monitoringu SEO w dashboardzie
- [ ] AI-powered A/B testing suggestions dla landing page'y
- [ ] Rozbudowa systemu powiadomień o interaktywne akcje (np. akceptacja raportu z Slacka)

# Plan Wdrożenia Zmian (Sprint 43: Client-OS - AI Narrator + Micro-Learning)

## Cel: Wdrożenie warstwy narracji AI i edukacji Just-in-Time dla klienta

### Zadania:
- [x] Wdrożenie `ClientDashboard.tsx` sterującego trybami Focus/Pro
- [x] Integracja preferencji trybu pracy usera z Firestore
- [x] Wdrożenie `AIProjectNarrator.tsx` automatycznie generującego status projektu używając Gemini
- [x] Wdrożenie `MicroLearningCard.tsx` z kontekstowymi materiałami edukacyjnymi

# Plan Wdrożenia Zmian (Sprint 44: Client-OS - Triple Doc + Scope Configurator)

## Cel: Automatyczna dokumentacja i interaktywne zarządzanie zakresem projektu

### Zadania:
- [x] Wdrożenie `TripleDocGenerator.tsx` (Dokumentacja Techniczna, Case Study, Lessons Learned) z użyciem AI
- [x] Dodanie flagi `isPrivate` do logów aktywności chroniącej wewnętrzne notatki
- [x] Wdrożenie `ScopeConfigurator.tsx` pozwalającego klientom na eksperymentowanie ze zmianami w zakresie online
- [ ] Integracja systemu zarządzania propozycjami wycen (Scope Proposal) z panelem Admina

# Plan Wdrożenia Zmian (Sprint 45: Client-OS - Integration + Polish)

## Cel: Połączenie nowych modułów w solidną całość oraz QA

### Zadania:
- [x] Autoryzacja i zabezpieczenia Firebase dla wszystkich nowych komponentów Client-OS
- [x] Wdrożenie widgetu `ProjectHealthScore.tsx` na dashboardzie administratora (analiza opóźnień, sentiment score)
- [x] Weryfikacja RWD (Mobile-first, testy dla 375px)
- [x] Testy całego flow działania Client-OS zapisanego w Firebase

# EPIC: Code Quality & Architecture Refactoring

## Plan Wdrożenia Zmian (Sprint 46: Modularyzacja & Stan Globalny)

## Cel: Rozwiązanie długu technologicznego, redukcja rozmiaru kluczowych widoków i standaryzacja stanu.

### Zadania:
- [x] Refaktoryzacja `AdminDashboard.tsx` - podział na mniejsze, reużywalne podkomponenty
- [x] Wprowadzenie i konfiguracja `Zustand` do zarządzania stanem układu oraz filtrowania globalnego
- [x] Migracja pobierania danych do `React Query` celem cachowania zapytań z Firebase i eliminacji redundantnych requestów
- [x] Wdrożenie pełnego `strict mode` dla TypeScripta we flagowych plikach (`no implicit any`)

# EPIC: Quality Assurance & Testing Platform

## Plan Wdrożenia Zmian (Sprint 47: Tworzenie fundamentów testowych)

## Cel: Zabezpieczenie obecnych i przyszłych funkcjonalności przed regresją

### Zadania:
- [x] Instalacja i konfiguracja środowiska `Vitest` we współpracy z Vite
- [x] Konfiguracja `React Testing Library` (RTL) pod weryfikację zachowań użytkownika
- [x] Napisanie testów jednostkowych i integracyjnych dla krytycznych haków i głównych komponentów autoryzacyjnych
- [x] Wdrożenie Error Boundaries per router route dla bezbłędnej obsługi awarii

# EPIC: CI/CD & DevOps Automation

## Plan Wdrożenia Zmian (Sprint 48: Automatyzacje Deploymentu)

## Cel: Przyspieszenie pracy poprzez powtarzalne i zautomatyzowane procesy wydawnicze

### Zadania:
- [x] Skonfigurowanie `GitHub Actions` dla Continuous Integration (uruchamianie linterów i testów Vitest na każdym PR)
- [x] Instalacja i konfiguracja `Husky` oraz `lint-staged` blokujących niepoprawne commity
- [x] Skonfigurowanie środowiska Staging w Firebase Hosting

# EPIC: Advanced UX & Progressive Web App

## Plan Wdrożenia Zmian (Sprint 49: PWA & Offline Support)

## Cel: Doświadczenie aplikacji natywnej na urządzeniach mobilnych z szybkim ładowaniem

### Zadania:
- [x] Konfiguracja `vite-plugin-pwa` i dodanie `manifest.json` (logo, kolory motywu)
- [x] Zintegrowanie Service Workers dla trybu offline / buforowania statycznych assetów
- [x] Obsługa monitów o wyłączeniu połączenia bez wyrzucenia błędów Firebase
