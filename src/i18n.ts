import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: {
          common: {
            loading: "Ładowanie...",
            error: "Wystąpił błąd",
            investment: "Inwestycja",
            timeline: "Czas realizacji",
            wynik: "WYNIK",
            availableIn: "Dostępność w: {{month}}"
          },
          app: {
            error: {
              sectionFailed: "Sekcja \"{{name}}\" nie wczytała się poprawnie",
              checkConnection: "Sprawdź swoje połączenie internetowe lub status serwera."
            }
          },
          nav: {
            skipToContent: "Przejdź do treści",
            cta: "UMÓW ROZMOWĘ",
            links: {
              about: "O mnie",
              process: "Proces",
              portfolio: "Portfolio",
              offer: "Oferta",
              faq: "FAQ",
              contact: "Kontakt"
            }
          },
          hero: {
            availability: "Dostępność w: {{month}}",
            qualityBadge: {
              label: "Gwarancja Satysfakcji",
              tooltip: "100% zwrotu w 14 dni"
            },
            headline: {
              line1: "Twoja Strona",
              highlight1: "Nie Sprzedaje?",
              line2: "Zaprojektuję",
              highlight2: "Ścieżkę Konwersji,",
              line3: "Którą Twoi Klienci",
              highlight3: "Pokochają."
            },
            subtext: "Odzyskaj czas i przestań przepalać budżet. Jako UX/UI Designer & AI-Powered Strategist łączę 10 lat doświadczenia z precyzją sztucznej inteligencji. Tworzę strony, które nie tylko wyglądają premium, ale przede wszystkim zarabiają.",
            cta: {
              primary: "Umów Bezpłatną Konsultację"
            }
          },
          valueProp: {
            badge: "Ekspercka Realizacja",
            title: {
              line1: "Kunszt cyfrowy,",
              highlight: "bez kompromisów."
            },
            subtext: "Dostarczam produkty cyfrowe premium, które łączą wizjonerski design z inżynieryjną precyzją.",
            pillars: {
              strategy: {
                label: "Strategia",
                title: "Design oparty na celach",
                desc: "Każdy piksel ma swój cel biznesowy. Projektuję, aby konwertować wizytujących w Twoich lojalnych klientów."
              },
              stack: {
                label: "Modern Stack",
                title: "Perfekcja pod maską",
                desc: "Twoja strona będzie błyskawiczna, bezpieczna i łatwa w skalowaniu dzięki technologiom przyszłości."
              },
              delivering: {
                label: "Global Score",
                title: "Dostarczanie jutra dzisiaj",
                desc: "Standardy WCAG, SEO i UX na światowym poziomie. Buduję strony, które wyznaczają trendy."
              }
            }
          },
          about: {
            badge: "O Mnie",
            title: {
              line1: "Projektuję z pasją,",
              highlight: "optymalizuję dzięki AI."
            },
            fallbackBio: "Odzyskaj czas i przestań przepalać budżet. Jako UX/UI Designer & AI-Powered Strategist łączę 10 lat doświadczenia z precyzją sztucznej inteligencji.",
            stats: {
              experience: "Lat Doświadczenia",
              projects: "Zrealizowanych Projektów",
              clients: "Zadowolonych Klientów"
            }
          },
          offer: {
            badge: "Moja Oferta",
            title: {
              line1: "Gotowe rozwiązania,",
              highlight: "skrojone pod Ciebie."
            },
            subtext: "Moja oferta to nie tylko pakiety. To fundament pod rozwój Twojej firmy, realizowany na najwyższym poziomie technologicznym.",
            popularChoice: "Popularny Wybór",
            scopeLabel: "Zakres usługi:",
            investmentLabel: "Inwestycja",
            timelineLabel: "Czas realizacji",
            fallback: {
              landing: {
                name: "Premium Landing Page",
                desc: "Błyskawiczna sprzedaż i wizerunek. Idealna dla nowych produktów lub usług, które potrzebują mocnego wejścia.",
                price: "od 4 900 PLN",
                timeline: "3-5 dni",
                feat1: "Strategia UX & Copywriting",
                feat2: "Dedykowany Design Premium",
                feat3: "Podstawowa Analityka (GA4)",
                feat4: "System Zarządzania CMS",
                feat5: "Automatyzacje procesów AI"
              },
              business: {
                name: "Portal Biznesowy 3.0",
                desc: "Twoja cyfrowa siedziba. Skalowalna platforma dla firm, które chcą dominować na rynku.",
                price: "od 12 000 PLN",
                timeline: "10-14 dni",
                feat1: "Dedykowana Architektura (Payload)",
                feat2: "Modułowa Budowa (Skalowalność)",
                feat3: "Zaawansowane SEO (Semantyka)",
                feat4: "Interaktywne Komponenty",
                feat5: "Modelowanie AI / Agenci AI"
              },
              ecommerce: {
                name: "E-commerce Elite",
                desc: "Maszyna do zarabiania. Sklep, który usuwa wszelkie bariery zakupowe Twoich klientów.",
                price: "od 20 000 PLN",
                timeline: "21-30 dni",
                feat1: "High-Conversion Checkout Flow",
                feat2: "Automatyzacja Marketingu (Email)",
                feat3: "System Lojalnościowy / Kupony",
                feat4: "Integracja AI: Rekomendacje",
                feat5: "Panel Zarządzania Sprzedażą"
              }
            },
            cta: {
              start: "Zacznijmy Teraz",
              discuss: "Omów Projekt"
            },
            custom: {
              badge: "Zlecenia Niestandardowe",
              name: "Systemy Dedykowane & AI",
              desc: "Rozwiązania szyte na miarę. Od zaawansowanych aplikacji webowych po automatyzacje procesów i agentów AI.",
              price: "Wycena Indywidualna",
              timeline: "Zależnie od zakresu",
              feat1: "Architektura systemowa",
              feat2: "Integracje API i zewnętrzne",
              feat3: "Automatyzacje AI / Scrapery",
              feat4: "Audyty bezpieczeństwa i UX",
              cta: "Omów Projekt"
            },
            aiModel: {
              badge: "Model Pracy",
              title: {
                line1: "AI jako narzędzie,",
                highlight: "człowiek jako strateg."
              },
              subtext: "AI daje nam bezbłędny start, ja dowożę perfekcyjny finisz. Dzięki temu nie zaczynamy od zera, a Ty zyskujesz stronę premium w ułamku standardowego czasu.",
              ai: {
                title: "AI (30%)",
                subtitle: "Automatyzacja i szybkość",
                feat1: "Błyskawiczny research rynku i analiza konkurencji",
                feat2: "Szybkie prototypowanie layoutów i struktury",
                feat3: "Optymalizacja pod kątem wydajności"
              },
              human: {
                title: "Human (70%)",
                subtitle: "Strategia i kreatywność",
                feat1: "Moje oko do detalu i psychologia sprzedaży",
                feat2: "Decyzje projektowe, których nie podejmie algorytm",
                feat3: "Strategia marki i unikalny charakter"
              },
              progress: {
                ai: "AI: Fundamenty (30%)",
                human: "Human: Wartość Premium (70%)"
              }
            }
          },
          portfolio: {
            badge: "Moje Realizacje",
            title: {
              line1: "Projekty, które",
              highlight: "budują jutro."
            },
            subtext: "Każdy projekt to dowód na to, że technologia w służbie designu tworzy niezrównane doświadczenia.",
            viewCaseStudy: "Zobacz Case Study",
            filters: {
              all: "Wszystkie",
              landing: "Landing Page",
              business: "Portal Biznesowy",
              ecommerce: "E-commerce"
            },
            fallback: {
              landing: {
                desc: "Konwersyjna strona typu landing page dla marki biżuterii premium."
              },
              portal: {
                desc: "Rozbudowany portal korporacyjny z systemem zarządzania treścią Payload CMS."
              },
              shop: {
                desc: "Nowoczesny sklep internetowy z pełną integracją płatności i logiką koszyka."
              }
            }
          },
          process: {
            badge: "Proces",
            title: {
              line1: "Twoja Droga Do",
              highlight: "Sukcesu.",
              subtitle: "Sprawdzony schemat działania."
            },
            subtext: "Zamiast niekończących się poprawek – konkretny plan. Wiesz dokładnie, co otrzymasz na każdym etapie współpracy.",
            deliverableLabel: "WYNIK",
            steps: {
              s1: {
                stage: "Etap 1",
                title: "Warsztat i Strategia",
                desc: "Nie rysuję bez planu. Zaczynamy od głębokiego zrozumienia Twojego biznesu i celów.",
                deliverable: "Strategia Konwersji"
              },
              s2: {
                stage: "Etap 2",
                title: "Architektura i Copywriting",
                desc: "Słowa sprzedają, design oprawia. Tworzymy strukturę, która prowadzi klienta za rękę do zakupu.",
                deliverable: "Makieta i Treści"
              },
              s3: {
                stage: "Etap 3",
                title: "Visual Design",
                desc: "Pixel-perfect UI. Projektuję interfejsy, które budują zaufanie i pozycjonują Cię jako lidera.",
                deliverable: "Projekt Graficzny"
              },
              s4: {
                stage: "Etap 4",
                title: "Wdrożenie No-Code",
                desc: "Dostajesz gotowy, błyskawicznie działający produkt (Framer/Webflow), a nie tylko ładne obrazki.",
                deliverable: "Działająca Strona"
              },
              s5: {
                stage: "Etap 5",
                title: "Optymalizacja",
                desc: "Uczę Cię, jak obsługiwać Twoją nową maszynę do zarabiania i wyciskać z niej maksimum.",
                deliverable: "Szkolenie i Przekazanie"
              }
            }
          },
          testimonials: {
            badge: "Głosy Zaufania",
            title: "Relacje oparte na wynikach.",
            fallback: {
              f1: {
                content: "Współpraca z Katarzyną to czysta przyjemność. Strona wygląda jak z agencji za 50 tys. — a cały projekt zamknęłyśmy w dwa tygodnie. Konwersja wzrosła o 40%."
              },
              f2: {
                content: "Katarzyna zaprojektowała sklep, który nie tylko wygląda rewelacyjnie, ale naprawdę sprzedaje. Przychody wzrosły o 65% w pierwszym kwartale po wdrożeniu."
              },
              f3: {
                content: "Nowa strona wyróżnia nas na tle konkurencji. Jakość wykonania jest na poziomie, którego wcześniej nie spotykałem w Polsce. Polecam bez zastrzeżeń."
              }
            }
          },
          faq: {
            badge: "Expert Q&A",
            title: {
              line1: "Wszystko, co musisz",
              highlight: "wiedzieć."
            },
            subtext: "Masz inne pytania? Jestem do Twojej dyspozycji. Napisz bezpośrednio i rozwiejmy wszelkie wątpliwości.",
            askQuestion: "Zadaj Pytanie",
            faqs: {
              q1: {
                question: "Jak długo trwa realizacja projektu?",
                answer: "Każdy projekt traktuję indywidualnie, ale trzymam się sprawdzonych ram czasowych: Landing Page (3–5 dni), Portal Biznesowy (10–14 dni), Sklep E-commerce (21–30 dni). Moja agentyczna metodyka pracy pozwala dowozić jakość agencji w ułamku ich czasu."
              },
              q2: {
                question: "Czy mogę samodzielnie zarządzać stroną?",
                answer: "Absolutnie. Każdy projekt opieram na nowoczesnym systemie CMS (Payload lub Framer). Po wdrożeniu otrzymujesz ode mnie pełne szkolenie wideo, dzięki któremu edycja tekstów czy zdjęć będzie tak prosta, jak edycja dokumentu."
              },
              q3: {
                question: "Jak wygląda proces płatności?",
                answer: "Model współpracy opieram na jasnych zasadach: 50% zadatku przed rozpoczęciem prac oraz 50% po akceptacji finalnego produktu, a przed przekazaniem praw autorskich i dostępów. Wystawiam faktury VAT."
              },
              q4: {
                question: "Jakie mam gwarancje jakości?",
                answer: "Gwarantuję wynik Lighthouse 90+ pod kątem wydajności i SEO. Moje strony są budowane zgodnie z najnowszymi standardami UX i WCAG. Dodatkowo, otrzymujesz 100% praw autorskich do projektu."
              },
              q5: {
                question: "Czy pracujesz na gotowych szablonach?",
                answer: "Nigdy. Każdy projekt powstaje od czystej kartki (Figma), dopasowany do Twojej marki i celów biznesowych. Moja praca to unikalne rozwiązanie, które pozycjonuje Cię jako lidera w Twojej branży."
              }
            }
          },
          contact: {
            badge: "Dostępność w: {{month}}",
            title: {
              line1: "Zróbmy coś",
              highlight: "wyjątkowego."
            },
            subtext: "Masz konkretny cel biznesowy? Opisz go, a ja pomogę Ci go dowieźć wykorzystując najnowsze technologie i precyzję AI.",
            form: {
              labels: {
                name: "Imię",
                email: "E-mail",
                message: "Wiadomość",
                consent: "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności (RODO) w celu obsługi zapytania."
              },
              placeholders: {
                name: "Jak się nazywasz?",
                message: "Opisz krótko swój cel projektowy..."
              },
              success: {
                title: "Wiadomość wysłana.",
                desc: "Dziękuję za zaufanie. Odpowiem w ciągu 4 godzin roboczych.",
                cta: "Wyślij kolejną"
              },
              submit: "Wyślij wiadomość",
              directEmail: "Lub napisz bezpośrednio:"
            }
          },
          footer: {
            status: "Dostępna na nowe zlecenia",
            brandDesc: "Projektuję cyfrowe doświadczenia, które przekładają się na realne wyniki biznesowe.",
            sections: {
              services: "Usługi",
              nav: "Nawigacja",
              social: "Social"
            },
            navPoints: {
              about: "O mnie",
              process: "Proces",
              portfolio: "Portfolio",
              pricing: "Cennik",
              faq: "FAQ",
              contact: "Kontakt"
            },
            servicesList: {
              audit: "Audyt Konwersji"
            },
            legal: {
              privacy: "Polityka prywatności",
              terms: "Regulamin",
              rights: "Wszelkie prawa zastrzeżone."
            }
          },
          floatingCta: {
            btn: "Umów darmową konsultację"
          },
          a11y: {
            title: "Dostępność",
            subtitle: "Dostosuj stronę do swoich potrzeb",
            reset: "Resetuj ustawienia",
            sections: {
              visual: "Wizualna personalizacja",
              cog: "Wsparcie poznawcze",
              nav: "Nawigacja i Interakcja"
            },
            labels: {
              contrast: "Kontrast",
              fontSize: "Rozmiar czcionki",
              fontFamily: "Rodzaj czcionki",
              stopAnimations: "Zatrzymaj animacje",
              readingMask: "Maska czytania",
              readingLine: "Linia prowadząca",
              minimalistMode: "Tryb minimalistyczny",
              enhancedFocus: "Wizualny Fokus",
              largeCursor: "Powiększony kursor",
              highlightLinks: "Podświetl linki",
              highlightHeaders: "Podświetl nagłówki"
            },
            options: {
              contrast: {
                normal: "Normalny",
                high: "Wysoki",
                dark: "Ciemny",
                mono: "Monochromatyczny"
              },
              fontFamily: {
                default: "Domyślna",
                readable: "Bezszeryfowa",
                dyslexic: "Dla dyslektyków"
              }
            }
          }
        }
      },
      en: {
        translation: {
          common: {
            loading: "Loading...",
            error: "An error occurred",
            investment: "Investment",
            timeline: "Timeline",
            wynik: "DELIVERABLE",
            availableIn: "Available in: {{month}}"
          },
          app: {
            error: {
              sectionFailed: "Section \"{{name}}\" failed to load",
              checkConnection: "Please check your connection or backend status."
            }
          },
          nav: {
            skipToContent: "Skip to content",
            cta: "BOOK A CALL",
            links: {
              about: "About",
              process: "Process",
              portfolio: "Portfolio",
              offer: "Offer",
              faq: "FAQ",
              contact: "Contact"
            }
          },
          hero: {
            availability: "Available in: {{month}}",
            qualityBadge: {
              label: "Satisfaction Guarantee",
              tooltip: "100% refund in 14 days"
            },
            headline: {
              line1: "Your Website",
              highlight1: "Not Selling?",
              line2: "I'll Design a",
              highlight2: "Conversion Path",
              line3: "That Your Customers Will",
              highlight3: "Love."
            },
            subtext: "Recover time and stop burning budget. As a UX/UI Designer & AI-Powered Strategist, I combine 10 years of experience with AI precision. I create sites that not only look premium but, above all, earn.",
            cta: {
              primary: "Book a Free Consultation"
            }
          },
          valueProp: {
            badge: "Expert Execution",
            title: {
              line1: "Digital craftsmanship,",
              highlight: "no compromises."
            },
            subtext: "I deliver premium digital products that combine visionary design with engineering precision.",
            pillars: {
              strategy: {
                label: "Strategy",
                title: "Goal-driven Design",
                desc: "Every pixel has a business purpose. I design to convert visitors into your loyal customers."
              },
              stack: {
                label: "Modern Stack",
                title: "Under-the-hood perfection",
                desc: "Your site will be lightning-fast, secure, and easy to scale thanks to technologies of the future."
              },
              delivering: {
                label: "Global Score",
                title: "Delivering tomorrow today",
                desc: "WCAG, SEO, and UX standards at a world-class level. I build sites that set trends."
              }
            }
          },
          about: {
            badge: "About Me",
            title: {
              line1: "I design with passion,",
              highlight: "optimize with AI."
            },
            fallbackBio: "Reclaim your time and stop burning your budget. As a UX/UI Designer & AI-Powered Strategist, I combine 10 years of experience with the precision of AI.",
            stats: {
              experience: "Years Experience",
              projects: "Projects Completed",
              clients: "Happy Clients"
            }
          },
          offer: {
            badge: "What I Offer",
            title: {
              line1: "Ready solutions,",
              highlight: "crafted just for you."
            },
            subtext: "My offering is not just packages. It's a foundation for your company's growth, executed at the highest technological level.",
            popularChoice: "Popular Choice",
            scopeLabel: "Service Scope:",
            investmentLabel: "Investment",
            timelineLabel: "Timeline",
            fallback: {
              landing: {
                name: "Premium Landing Page",
                desc: "Instant sales and image. Perfect for new products or services that need a strong entry.",
                price: "from 4,900 PLN",
                timeline: "3-5 days",
                feat1: "UX Strategy & Copywriting",
                feat2: "Dedicated Premium Design",
                feat3: "Basic Analytics (GA4)",
                feat4: "CMS Management System",
                feat5: "AI Process Automations"
              },
              business: {
                name: "Business Portal 3.0",
                desc: "Your digital headquarters. Scalable platform for companies that want to dominate the market.",
                price: "from 12,000 PLN",
                timeline: "10-14 days",
                feat1: "Dedicated Architecture (Payload)",
                feat2: "Modular Build (Scalability)",
                feat3: "Advanced SEO (Semantics)",
                feat4: "Interactive Components",
                feat5: "AI Modeling / AI Agents"
              },
              ecommerce: {
                name: "E-commerce Elite",
                desc: "The money-making machine. A store that removes all purchase barriers for your customers.",
                price: "from 20,000 PLN",
                timeline: "21-30 days",
                feat1: "High-Conversion Checkout Flow",
                feat2: "Marketing Automation (Email)",
                feat3: "Loyalty System / Coupons",
                feat4: "AI Integration: Recommendations",
                feat5: "Sales Management Panel"
              }
            },
            cta: {
              start: "Start Project Now",
              discuss: "Discuss Project"
            },
            custom: {
              badge: "Custom Requests",
              name: "Dedicated Systems & AI",
              desc: "Tailor-made solutions. From advanced web applications to process automations and AI agents.",
              price: "Individual Quote",
              timeline: "Depends on scope",
              feat1: "System architecture",
              feat2: "API & external integrations",
              feat3: "AI Automations / Scrapers",
              feat4: "Security & UX audits",
              cta: "Discuss Project"
            },
            aiModel: {
              badge: "Working Model",
              title: {
                line1: "AI as a tool,",
                highlight: "human as a strategist."
              },
              subtext: "AI gives us a flawless start, I deliver a perfect finish. This way we don't start from zero, and you get a premium website in a fraction of the standard time.",
              ai: {
                title: "AI (30%)",
                subtitle: "Automation and speed",
                feat1: "Lightning-fast market research and competitor analysis",
                feat2: "Rapid prototyping of layouts and structure",
                feat3: "Performance optimization"
              },
              human: {
                title: "Human (70%)",
                subtitle: "Strategy and creativity",
                feat1: "My eye for detail and sales psychology",
                feat2: "Design decisions that an algorithm won't make",
                feat3: "Brand strategy and unique character"
              },
              progress: {
                ai: "AI: Foundations (30%)",
                human: "Human: Premium Value (70%)"
              }
            }
          },
          portfolio: {
            badge: "My Case Studies",
            title: {
              line1: "Projects that",
              highlight: "build tomorrow."
            },
            subtext: "Every project is proof that technology in the service of design creates unparalleled experiences.",
            viewCaseStudy: "View Case Study",
            filters: {
              all: "All",
              landing: "Landing Page",
              business: "Business Portal",
              ecommerce: "E-commerce"
            },
            fallback: {
              landing: {
                desc: "Conversional landing page for a premium jewelry brand."
              },
              portal: {
                desc: "Extensive corporate portal with Payload CMS content management system."
              },
              shop: {
                desc: "Modern online store with full payment integration and cart logic."
              }
            }
          },
          process: {
            badge: "Process",
            title: {
              line1: "Your Path To",
              highlight: "Success.",
              subtitle: "A proven workflow."
            },
            subtext: "Instead of endless revisions - a concrete plan. You know exactly what you will receive at every stage of cooperation.",
            deliverableLabel: "DELIVERABLE",
            steps: {
              s1: {
                stage: "Stage 1",
                title: "Workshop & Strategy",
                desc: "I don't draw without a plan. We start with a deep understanding of your business and goals.",
                deliverable: "Conversion Strategy"
              },
              s2: {
                stage: "Stage 2",
                title: "Architecture & Copywriting",
                desc: "Words sell, design frames. We create a structure that leads the customer hand-in-hand to purchase.",
                deliverable: "Wireframes & Content"
              },
              s3: {
                stage: "Stage 3",
                title: "Visual Design",
                desc: "Pixel-perfect UI. I design interfaces that build trust and position you as a leader.",
                deliverable: "Graphic Design"
              },
              s4: {
                stage: "Stage 4",
                title: "No-Code Development",
                desc: "You get a ready, lightning-fast product (Framer/Webflow), not just pretty pictures.",
                deliverable: "Working Website"
              },
              s5: {
                stage: "Stage 5",
                title: "Optimization",
                desc: "I teach you how to operate your new money-making machine and squeeze the maximum out of it.",
                deliverable: "Training & Handover"
              }
            }
          },
          testimonials: {
            badge: "Voices of Trust",
            title: "Relationships built on results.",
            fallback: {
              f1: {
                content: "Working with Katarzyna is pure pleasure. The website looks like it's from an agency for $50k — and we closed the whole project in two weeks. Conversion increased by 40%."
              },
              f2: {
                content: "Katarzyna designed a store that not only looks great but actually sells. Revenue increased by 65% in the first quarter after implementation."
              },
              f3: {
                content: "The new site sets us apart from the competition. The quality of execution is at a level I haven't encountered before. I recommend it without reservation."
              }
            }
          },
          faq: {
            badge: "Expert Q&A",
            title: {
              line1: "Everything you need",
              highlight: "to know."
            },
            subtext: "Have other questions? I'm at your service. Write to me directly and let's clear up any doubts.",
            askQuestion: "Ask a Question",
            faqs: {
              q1: {
                question: "How long does a project take?",
                answer: "I treat each project individually, but I stick to proven timeframes: Landing Page (3–5 days), Business Portal (10–14 days), E-commerce Store (21–30 days). My agentic methodology allows me to deliver agency quality in a fraction of their time."
              },
              q2: {
                question: "Can I manage the site myself?",
                answer: "Absolutely. I base every project on a modern CMS system (Payload or Framer). After implementation, you receive full video training from me, thanks to which editing texts or photos will be as simple as editing a document."
              },
              q3: {
                question: "What does the payment process look like?",
                answer: "I base the cooperation model on clear rules: 50% deposit before starting work and 50% after acceptance of the final product, and before transferring copyrights and access. I issue VAT invoices."
              },
              q4: {
                question: "What quality guarantees do I have?",
                answer: "I guarantee a Lighthouse score of 90+ for performance and SEO. My sites are built according to the latest UX and WCAG standards. Additionally, you receive 100% copyright to the project."
              },
              q5: {
                question: "Do you work on ready-made templates?",
                answer: "Never. Each project is created from a blank page (Figma), tailored to your brand and business goals. My work is a unique solution that positions you as a leader in your industry."
              }
            }
          },
          contact: {
            badge: "Available in: {{month}}",
            title: {
              line1: "Let's build something",
              highlight: "exceptional."
            },
            subtext: "Have a specific business goal? Describe it, and I'll help you deliver it using the latest technology and AI precision.",
            form: {
              labels: {
                name: "Name",
                email: "E-mail",
                message: "Message",
                consent: "I agree to the processing of my personal data in accordance with the privacy policy (GDPR) to handle this inquiry."
              },
              placeholders: {
                name: "Your name",
                message: "Briefly describe your project goal..."
              },
              success: {
                title: "Message sent.",
                desc: "Thank you for your trust. I'll respond within 4 business hours.",
                cta: "Send another"
              },
              submit: "Send message",
              directEmail: "Or mail me directly:"
            }
          },
          footer: {
            status: "Available for work",
            brandDesc: "I design digital experiences that translate into real business results.",
            sections: {
              services: "Services",
              nav: "Navigation",
              social: "Social"
            },
            navPoints: {
              about: "About",
              process: "Process",
              portfolio: "Portfolio",
              pricing: "Pricing",
              faq: "FAQ",
              contact: "Contact"
            },
            servicesList: {
              audit: "Conversion Audit"
            },
            legal: {
              privacy: "Privacy Policy",
              terms: "Terms of Service",
              rights: "All rights reserved."
            }
          },
          floatingCta: {
            btn: "Book a free consultation"
          },
          a11y: {
            title: "Accessibility",
            subtitle: "Customize the page to your needs",
            reset: "Reset settings",
            sections: {
              visual: "Visual customization",
              cog: "Cognitive support",
              nav: "Navigation & Interaction"
            },
            labels: {
              contrast: "Contrast",
              fontSize: "Font size",
              fontFamily: "Font family",
              stopAnimations: "Stop animations",
              readingMask: "Reading mask",
              readingLine: "Reading line",
              minimalistMode: "Minimalist mode",
              enhancedFocus: "Enhanced focus",
              largeCursor: "Large cursor",
              highlightLinks: "Highlight links",
              highlightHeaders: "Highlight headers"
            },
            options: {
              contrast: {
                normal: "Normal",
                high: "High",
                dark: "Dark",
                mono: "Monochrome"
              },
              fontFamily: {
                default: "Default",
                readable: "Sans-serif",
                dyslexic: "For dyslexics"
              }
            }
          }
        }
      }
    },
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
