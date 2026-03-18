# MASTER PLAN 2.0: ABSOLUTNY MONOLIT WIZUALNY (20 KROKÓW)

Skoro celujemy w absolutny top tier (World-Class UX/UI), 10 kroków to zaledwie fundament. Poniżej znajduje się bezkompromisowa, 20-krokowa mapa drogowa. Żaden piksel nie pozostanie przypadkowy. Projekt zostanie ściśnięty rygorystycznymi zasadami Design Systemu.

---

## 🌌 FAZA 1: GLOBALNY EKRAN I ZASADY FIZYKI (ŚRODOWISKO)

**[x] 1. Jednorodne Płótno Tła (The Unified Canvas):**  
Niwelacja efektu "zebry". Aplikacja korzysta z dokładnie jednego koloru tła (`bg-[#fafafa]` dla Light, `bg-[#09090b]` dla Dark). Sekcje nie tną strony na paski. Płynny scroll przez jedną wielką przestrzeń.

**[x] 2. Globalny System Oświetlenia Ambientowego (Ambient Glow Engine):**  
Rezygnacja z losowych kulek z blurem w poszczególnych komponentach. Stworzenie absolutnego tła pod sekcjami z użyciem gigantycznych gradientów promieniowych (radial), które symulują "światło" bijące spod treści (rozmycie rzędu `blur-[200px]`).

**[x] 3. Architektura Linii Podziału (Micro-Dividers):**  
Sekcje oddzielane są wyłącznie potężnym marginesem ORAZ 1-pikselową linią szerokości `w-full` lub zdefiniowaną maską gradientową (`bg-gradient-to-r from-transparent via-zinc-800 to-transparent`), aby budować poczucie ekskluzywnej, precyzyjnej inżynierii.

**[x] 4. Kolory Zaznaczenia (Selection State):**  
Gdy użytkownik zaznaczy tekst myszką, przeglądarkowy, generyczny niebieski kolor znika. Implementacja globalnego `selection:bg-rose-500/20 selection:text-rose-300` naprawia ten detal, który wyróżnia strony premium.

**[x] 5. Customowy Pasek Przewijania (Scrollbar UI):**  
Ukrycie domyślnego suwaka przeglądarki i zastąpienie go ultrasmukłym, zaokrąglonym suwakiem (`::-webkit-scrollbar`), który pasuje do trybu dark/light, tonąc organicznie w tle.

---

## 🪟 FAZA 2: SYSTEM SZKŁA I KART (KONTENERY)

**[x] 6. Pojedynczy Standard Glassmorphism (The Master Glass):**  
Nie ma już "mniej lub bardziej" rozmytych kart. Tworzymy jeden stempel: `bg-white/90` (Light) i `bg-zinc-900/40` (Dark). Sztywny narzut `backdrop-blur-3xl`. 

**[x] 7. Standaryzacja Obrysów (The Border Rule):**  
Karty na wierzchu otrzymują border 1px: `border-zinc-200/80` (Light) i zaledwie widoczny `border-white/5` (Dark). Eliminuje to chaos wizualny na stykach sekcji.

**[x] 8. Matematyka Zaokrągleń (Radius System):**  
Zero zgadywania.
*   Zewnętrzne ramy sekcji i obrazy: `rounded-[2.5rem]`.
*   Karty wewnętrzne (np. opinie, boxy ofertowe): `rounded-3xl`.
*   Pola input i przyciski (Button, Input): W pełni zaokrąglone `rounded-full`.
*   Tagi wewnątrz kart: `rounded-xl`.

**[x] 9. Cienie Zależne Od Warstwy (Elevation Shadows):**  
System 3 warstw. 
*   Warstwa 0 (tło) = brak cienia.
*   Warstwa 1 (Karty bazowe) = `shadow-2xl shadow-rose-500/5`.
*   Warstwa 2 (Floating Action/Nav) = `shadow-xl shadow-black/20`.

**[x] 10. Standaryzacja Obrazów (Grayscale to Color Engine):**  
Wszystkie fotografie (użytkownicy w Testimonials, zdjęcia w About) dzielą to samo zachowanie: natywnie renderowane są jako czarno-białe (`grayscale`), a pełnię koloru odzyskują przy delikatnym najeździe kursora (`hover:grayscale-0`), zawsze w timingu `duration-700`.

---

## ✒️ FAZA 3: TYPOGRAFIA I HIERARCHIA

**[x] 11. Rygorystyczny Rytm Wertykalny (The 32/20 Rule):**  
Padding główny sekcji zabetonowany na `py-24 md:py-32`. Odstęp między nagłówkiem (H2) a bazą kart (Grid) wynosi dokładnie `mb-20`. Żadnych ustępstw.

**[x] 12. H2 Typography Engine (Jednolity Rozmiar Nagłówków):**  
Wszystkie nagłówki korzystają z klasy nadrzędnej przypominającej redakcyjny layout: `text-4xl sm:text-5xl font-display font-light text-zinc-900/white tracking-tighter`. Wszędzie rezygnujemy z przypadkowych boldów.

**[x] 13. Standaryzacja Pigułek (The Badge Standard):**  
Wszystkie wskaźniki sekcji (tzw. Pigułki/Badges nad nagłówkami) wymuszają jeden format: 
`inline-flex px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 uppercase tracking-[0.3em] font-bold text-[10px]`.

**[x] 14. H3 i Micro-Copy (Tytuły Kart):**  
Nagłówki wewnątrz kart (Tytul Projektu, Imię w Opiniach, Nazwa Oferty) współdzielą gramaturę `font-medium` lub `font-bold` przy rozmiarze zaledwie `text-xl` lub `text-2xl`, budując silny kontrast wielkości względem H2.

**[x] 15. Typografia Paragrafów (Body Text Oddech):**  
Z tekstów ściągamy czystą biel. Używamy głębokich szarości typu `text-zinc-600` (Light) i `text-zinc-400` (Dark) z dużą interlinią (`leading-relaxed`), by zminimalizować zmęczenie oka podczas dłuższego czytania.

---

## 🕹️ FAZA 4: INTERAKCJA, RUCH I ACCESSIBILITY

**[x] 16. Uniwersalny Hover State (Puls Akcji):**  
Żaden border nie reaguje po swojemu. Wszędzie (Karta, Przycisk domyślny) wdrażamy podbicie jasności bordera: `hover:border-rose-500/30` połączone z miękkim uniesieniem `hover:-translate-y-1`. Czas zawsze na `duration-500`. 

**[x] 17. Standaryzacja Przycisków (One Button to Rule Them All):**  
Wycięcie lokalnych przycisków HTML. Każdy wezwany do akcji docelowej element przepuszczony jest przez jeden nadrzędny `<PremiumButton>`, który dziedziczy ten sam hover, ten sam promień i to samo gradientowe tło. W interfejsie nie może wystąpić inny design CTA.

**[x] 18. Płynność Narastająca (Synchronized Entrances):**  
Ujednolicenie wejść Framer Motion. Żadnych agresywnych zjazdów i skalowań. Ustawiamy powolny fade-up `y: 30`, `opacity: 0` -> `opacity: 1` z opóźnieniem generowanym dynamicznie na podstawie indexu (`delay: i * 0.1`) używając przejścia `ease: [0.16, 1, 0.3, 1]`.

**[x] 19. Focus Rings (Dostępność i Tabulacja):**  
Gdy strona nawigowana jest z klawiatury (TAB), natywne niebieskie ramki przeglądarki zostają zastąpione miękkim obrysem z design systemu: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`.

**[x] 20. System Ikonografii (Stroke & Size Override):**  
Ikony z okręgu `lucide-react` otrzymują ten sam gabaryt (`w-5 h-5` dla mniejszych, `w-6 h-6` dla naczelnych) i grubość linii (strokeWidth={1.5}), by uniknąć wrażenia, że część elementów jest "gruba", a część "cienka".

---
Dzięki wdrożeniu tych 20 punktów strona osiągnie jakość natywnych, najdroższych designów z doliny krzemowej. W kodzie będzie to widać jako olbrzymią czystkę klas - usunięcie kilkuset losowych dopisków Tailwind na rzecz jednego dyktatu wizualnego.
