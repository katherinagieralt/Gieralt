# Dokumentacja Projektu - Portfolio & Blog CMS

## 1. Instrukcja Obsługi Panelu Administratora (CMS)

### Logowanie
- Panel dostępny pod adresem: `/admin`
- Logowanie odbywa się za pomocą konta Google.
- Dostęp mają tylko autoryzowani użytkownicy (zdefiniowani w regułach Firebase).

### Zarządzanie Treścią
1. **Blog**:
   - Możesz dodawać nowe artykuły, podając tytuł, kategorię, czas czytania, tagi (oddzielone przecinkami) oraz treść w formacie HTML.
   - Każdy post wymaga linku do obrazka (zalecane Picsum lub własny hosting).
2. **Portfolio**:
   - Dodawanie projektów z podziałem na kategorie (SaaS, FinTech, eCommerce).
   - Możliwość dodania tagów technologicznych.
3. **Zgłoszenia**:
   - W zakładce "Zgłoszenia" widzisz wszystkie wiadomości z formularza kontaktowego.
   - W zakładce "Newsletter" znajdują się adresy e-mail osób zapisanych przez pop-up.

### Funkcje Specjalne
- **Seed Data**: Przycisk pozwalający na szybkie wypełnienie bazy przykładowymi danymi (przydatne przy testach).
- **Usuwanie**: Każdy element można usunąć jednym kliknięciem (wymaga potwierdzenia w przeglądarce).

---

## 2. Dokumentacja Techniczna

### Architektura
- **Frontend**: React 18 + Vite + Tailwind CSS.
- **Backend**: Firebase (Firestore, Auth).
- **Routing**: React Router DOM v6.
- **Animacje**: Framer Motion.

### Struktura Danych (Firestore)
- `blogPosts`: Kolekcja artykułów.
  - `title` (string)
  - `excerpt` (string)
  - `content` (string - HTML)
  - `category` (string)
  - `tags` (array of strings)
  - `image` (string - URL)
  - `readTime` (string)
  - `createdAt` (timestamp)
- `portfolioItems`: Kolekcja projektów.
  - `title` (string)
  - `category` (string)
  - `description` (string)
  - `tags` (array of strings)
  - `image` (string - URL)
  - `link` (string)
  - `createdAt` (timestamp)
- `contactSubmissions`: Wiadomości z formularza.
- `leadMagnetSignups`: Zapisy na newsletter.

### Bezpieczeństwo (Firestore Rules)
- Dostęp do zapisu (`create`, `update`, `delete`) mają tylko administratorzy.
- Odczyt publiczny dla `blogPosts` i `portfolioItems`.
- Zgłoszenia kontaktowe są prywatne (tylko admin).

---

## 3. Lista Kontrolna Przedprodukcyjna
- [ ] Sprawdzenie poprawności linków w Portfolio.
- [ ] Test formularza kontaktowego.
- [ ] Weryfikacja działania trybu ciemnego na różnych urządzeniach.
- [ ] Audyt Lighthouse (Performance, Accessibility, SEO).
- [ ] Sprawdzenie responsywności (Mobile/Tablet/Desktop).
