import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LeadInsights {
  summary: string;
  score: number;
  intent: string;
  sentiment: string;
  tags: string[];
}

export async function analyzeLead(leadData: {
  name: string;
  email: string;
  budget: string;
  timeline: string;
  message: string;
}): Promise<LeadInsights | null> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set. Skipping lead analysis.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following lead from a contact form and provide insights in JSON format.
      
      Lead Data:
      Name: ${leadData.name}
      Email: ${leadData.email}
      Budget: ${leadData.budget}
      Timeline: ${leadData.timeline}
      Message: ${leadData.message}
      
      Provide:
      1. A short summary (max 2 sentences).
      2. A quality score (0-100) based on budget, timeline, and message clarity.
      3. Primary intent (e.g., "New Project", "Consultation", "Job Inquiry", "Spam").
      4. Sentiment (e.g., "Positive", "Neutral", "Urgent").
      5. Up to 3 relevant tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            score: { type: Type.NUMBER },
            intent: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "score", "intent", "sentiment", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as LeadInsights;
  } catch (error) {
    console.error("Error analyzing lead with Gemini:", error);
    return null;
  }
}

export interface BlogDraft {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export async function generateBlogDraft(topic: string): Promise<BlogDraft | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jesteś ekspertem UX i AI. Wygeneruj szkic artykułu blogowego na temat: "${topic}". 
      Artykuł powinien być w języku polskim, profesjonalny, merytoryczny i zoptymalizowany pod SEO.
      Zwróć odpowiedź w formacie JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "excerpt", "content", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as BlogDraft;
  } catch (error) {
    console.error("Error generating blog draft:", error);
    return null;
  }
}

export interface PortfolioDraft {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
}

export async function generatePortfolioDraft(projectNotes: string): Promise<PortfolioDraft | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jesteś ekspertem UX. Na podstawie poniższych notatek o projekcie, wygeneruj profesjonalny opis do portfolio.
      Notatki: "${projectNotes}"
      Zwróć odpowiedź w formacie JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            fullDescription: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["title", "description", "fullDescription", "category"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as PortfolioDraft;
  } catch (error) {
    console.error("Error generating portfolio draft:", error);
    return null;
  }
}

export async function generateFollowUpEmail(leadData: { name: string; message: string; insights: LeadInsights }) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jesteś ekspertem od sprzedaży i UX. Napisz spersonalizowaną odpowiedź na poniższe zapytanie od klienta.
      Klient: ${leadData.name}
      Wiadomość: "${leadData.message}"
      Analiza AI: ${JSON.stringify(leadData.insights)}
      
      Odpowiedź powinna być:
      - Profesjonalna, ale pomocna
      - Odnosić się do konkretnych potrzeb klienta
      - Proponować darmową 15-minutową konsultację
      - W języku polskim
      
      Zwróć odpowiedź w formacie JSON:
      {
        "subject": "Temat wiadomości",
        "body": "Treść wiadomości (może zawierać Markdown)"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["subject", "body"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as { subject: string; body: string };
  } catch (error) {
    console.error("Error generating follow-up email:", error);
    return null;
  }
}

export interface TopicIdea {
  topic: string;
  reasoning: string;
  keywords: string[];
  targetAudience: string;
}

export async function generateTopicIdeas(): Promise<TopicIdea[] | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jesteś strategiem treści SEO dla agencji UX/AI. Wygeneruj 5 innowacyjnych pomysłów na artykuły blogowe, które przyciągną klientów biznesowych (SaaS, FinTech).
      Skup się na trendach: AI w designie, automatyzacja procesów, UX dla produktów AI.
      Zwróć odpowiedź w formacie JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              targetAudience: { type: Type.STRING }
            },
            required: ["topic", "reasoning", "keywords", "targetAudience"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as TopicIdea[];
  } catch (error) {
    console.error("Error generating topic ideas:", error);
    return null;
  }
}

export interface SocialPosts {
  linkedin: string;
  twitter: string;
  instagram: string;
}

export async function generateSocialPosts(content: string): Promise<SocialPosts | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Na podstawie poniższej treści artykułu, wygeneruj 3 posty do mediów społecznościowych (LinkedIn, Twitter, Instagram).
      Treść: "${content.substring(0, 2000)}"
      
      Posty powinny być angażujące, zawierać odpowiednie hashtagi i zachęcać do dyskusji.
      Zwróć odpowiedź w formacie JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            linkedin: { type: Type.STRING },
            twitter: { type: Type.STRING },
            instagram: { type: Type.STRING }
          },
          required: ["linkedin", "twitter", "instagram"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as SocialPosts;
  } catch (error) {
    console.error("Error generating social posts:", error);
    return null;
  }
}

export async function generateImagePrompt(content: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Na podstawie poniższej treści, wygeneruj profesjonalny prompt do Midjourney/DALL-E, aby stworzyć okładkę artykułu.
      Styl: Minimalistyczny, futurystyczny, techniczny, wysoka jakość, oświetlenie kinowe.
      Treść: "${content.substring(0, 1000)}"
      
      Zwróć tylko tekst promptu w języku angielskim.`,
    });

    return response.text || null;
  } catch (error) {
    console.error("Error generating image prompt:", error);
    return null;
  }
}

export async function translateToEnglish(content: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Przetłumacz poniższą treść na język angielski (British English). Zachowaj strukturę HTML jeśli występuje.
      Treść: "${content.substring(0, 5000)}"
      
      Zwróć tylko przetłumaczony tekst.`,
    });

    return response.text || null;
  } catch (error) {
    console.error("Error translating content:", error);
    return null;
  }
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
}

export async function generateSEOMeta(content: string): Promise<SEOMeta | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Na podstawie poniższej treści wygeneruj optymalne meta-tagi SEO (Tytuł, Opis, Słowa kluczowe).
      Treść: "${content.substring(0, 2000)}"
      
      Zwróć odpowiedź w formacie JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "description", "keywords"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as SEOMeta;
  } catch (error) {
    console.error("Error generating SEO meta:", error);
    return null;
  }
}

export async function generateAnalyticsSummary(leads: any[]): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jesteś analitykiem biznesowym. Przeanalizuj poniższe dane o leadach i wygeneruj krótkie, konkretne podsumowanie trendów, jakości zapytań i rekomendacje działań.
      Dane: ${JSON.stringify(leads.map(l => ({ 
        budget: l.budget, 
        intent: l.aiInsights?.intent, 
        score: l.aiInsights?.score,
        date: l.createdAt?.toDate().toLocaleDateString()
      })))}
      
      Zwróć podsumowanie w języku polskim.`,
    });

    return response.text || null;
  } catch (error) {
    console.error("Error generating analytics summary:", error);
    return null;
  }
}

export async function generateChatbotResponse(message: string, projectContext: any, history: { role: string, text: string }[]) {
  if (!process.env.GEMINI_API_KEY) return "Przepraszam, ale usługa AI jest obecnie niedostępna.";

  try {
    const systemInstruction = `Jesteś inteligentnym asystentem wsparcia klienta dla studia projektowego UX/AI Katarzyny Gierałt. 
Twoim zadaniem jest odpowiadanie na pytania klienta dotyczące jego projektu, procesu projektowego oraz ogólnych zagadnień UX/AI.
Kontekst projektu klienta:
- Nazwa projektu: ${projectContext.name}
- Status: ${projectContext.status}
- Postęp: ${projectContext.progress}%
- Obecna faza: ${projectContext.currentPhase}
- Fazy projektu: ${JSON.stringify(projectContext.phases)}

Zasady:
1. Bądź profesjonalny, pomocny i uprzejmy.
2. Odpowiadaj zwięźle i konkretnie.
3. Jeśli nie znasz odpowiedzi na specyficzne pytanie techniczne dotyczące wdrożenia, poproś o kontakt bezpośredni z administratorem.
4. Zachęcaj do zostawiania feedbacku w sekcji wiadomości.
5. Używaj języka polskiego.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Przepraszam, nie mogłem wygenerować odpowiedzi.";
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "Wystąpił błąd podczas komunikacji z AI.";
  }
}

export async function generateWeeklyReport(project: any) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Wygeneruj profesjonalny, tygodniowy raport postępu projektu dla klienta.
Dane projektu:
- Nazwa: ${project.name}
- Status: ${project.status}
- Postęp: ${project.progress}%
- Obecna faza: ${project.currentPhase}
- Fazy: ${JSON.stringify(project.phases)}

Raport powinien zawierać:
1. Podsumowanie wykonanych prac w tym tygodniu (na podstawie faz).
2. Plan na kolejny tydzień.
3. Krótki komentarz ekspercki dotyczący jakości i tempa prac.
4. Zachętę do kontaktu w razie pytań.

Użyj profesjonalnego, ale przyjaznego tonu. Język polski.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Jesteś Project Managerem w studiu UX/AI. Twoim zadaniem jest dbanie o transparentność i zadowolenie klienta poprzez jasne raportowanie postępów.",
        temperature: 0.7,
      },
    });

    return response.text || null;
  } catch (error) {
    console.error("Error generating weekly report:", error);
    return null;
  }
}

export async function generatePersonalizedWelcome(behavior: { visitedSections: string[], lastVisit?: string }) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Wygeneruj krótkie, spersonalizowane powitanie dla użytkownika powracającego na stronę agencji UX/AI.
Dane o zachowaniu:
- Odwiedzone sekcje: ${behavior.visitedSections.join(", ")}
- Ostatnia wizyta: ${behavior.lastVisit || "pierwszy raz w tej sesji"}

Zasady:
1. Powitanie powinno być bardzo krótkie (max 2 zdania).
2. Nawiąż do zainteresowań użytkownika (np. jeśli był w portfolio, wspomnij o nowych projektach).
3. Bądź profesjonalny, ale ciepły i zapraszający.
4. Język polski.
5. Zwróć odpowiedź w formacie JSON: { "message": "treść powitania", "cta": "krótka zachęta do akcji" }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ["message", "cta"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as { message: string, cta: string };
  } catch (error) {
    console.error("Error generating personalized welcome:", error);
    return null;
  }
}

export async function generatePersonalizedHeroMessage(behavior: { visitedSections: string[], lastVisit?: string }) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Wygeneruj spersonalizowany nagłówek (title), podtytuł (subtitle) i wezwanie do akcji (cta) dla sekcji Hero na stronie agencji projektującej interfejsy z użyciem AI.
Dane o zachowaniu użytkownika:
- Odwiedzone sekcje podczas poprzednich wizyt: ${behavior.visitedSections.join(", ")}
- Ostatnia wizyta: ${behavior.lastVisit || "pierwszy raz w tej sesji"}

Zasady:
1. Tytuł (title) powinien mieć maksymalnie 5-7 słów, być konkretny i odnosić się (subtelnie) do tego, czego użytkownik szukał (np. portfolio = dowody na jakość, pricing = zwrot z inwestycji, faq/contact = szybkość realizacji). Zawieraj w nim tagi <strong> aby pogrubić kluczowe słowo.
2. Podtytuł (subtitle) powinien stanowić jedno mocne zdanie wspierające, podkreślające korzyść biznesową, także dostosowaną do zachowania.
3. Przycisk (cta) - max 3-4 słowa.
4. Zwróć odpowiedź w formacie JSON { "title": "...", "subtitle": "...", "cta": "..." }. Język polski, innowacyjny ton.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ["title", "subtitle", "cta"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as { title: string, subtitle: string, cta: string };
  } catch (error) {
    console.error("Error generating personalized hero message:", error);
    return null;
  }
}

export async function recommendProjects(behavior: { visitedSections: string[] }, projects: any[]) {
  if (!process.env.GEMINI_API_KEY) return [];

  try {
    const projectSummary = projects.map(p => ({ id: p.id, title: p.title, category: p.category, tags: p.tags })).slice(0, 10);
    
    const prompt = `Na podstawie zachowania użytkownika na stronie agencji UX/AI, zarekomenduj 2 najbardziej odpowiednie projekty z portfolio.
Zachowanie: Odwiedzone sekcje: ${behavior.visitedSections.join(", ")}
Dostępne projekty: ${JSON.stringify(projectSummary)}

Zasady:
1. Wybierz dokładnie 2 projekty.
2. Dopasuj je do zainteresowań (np. jeśli był w sekcji Pricing, wybierz projekty z wyraźnym ROI/wynikami).
3. Zwróć tylko tablicę ID projektów w formacie JSON: ["id1", "id2"]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error recommending projects:", error);
    return [];
  }
}

export async function generateABTestSuggestions(pageContext: string) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Zaproponuj 3 konkretne testy A/B dla landing page agencji UX/AI, aby zwiększyć konwersję.
Kontekst strony: ${pageContext}

Zasady:
1. Każdy test powinien zawierać: Hipotezę, Zmianę (Wersja B) oraz Metrykę sukcesu.
2. Skup się na elementach takich jak: Hero section, CTA, Social Proof, Formularz.
3. Język polski.
4. Zwróć odpowiedź w formacie JSON: 
[
  { "title": "Tytuł testu", "hypothesis": "Hipoteza...", "change": "Co zmieniamy...", "metric": "Metryka..." }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              hypothesis: { type: Type.STRING },
              change: { type: Type.STRING },
              metric: { type: Type.STRING }
            },
            required: ["title", "hypothesis", "change", "metric"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as { title: string, hypothesis: string, change: string, metric: string }[];
  } catch (error) {
    console.error("Error generating A/B test suggestions:", error);
    return null;
  }
}

export async function generateProjectNarrative(project: any, logs: any[]) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Jako Project Manager, napisz krótką (max 3 zdania) narrację bezpośrednio do klienta o aktualnym stanie jego projektu i co powinno być kolejnym krokiem.
Dane projektu: Faza: ${project?.currentPhase || 'Planowanie'}, Postęp: ${project?.progress || 0}%.
Ostatnie akcje: ${JSON.stringify(logs.slice(0, 3).map(l => l.action))}

Zasady:
1. Pierwsze zdanie powinno podsumowywać co się ostatnio wydarzyło lub na jakim jesteśmy etapie. Przykładowo: "Wczoraj zaakceptowałeś makiety." albo "Obecnie skupiam się na projektowaniu interfejsu."
2. Drugie zdanie powinno informować co i jak długo to zajmie.
3. Trzecie zdanie (opcjonalne) to wezwanie do akcji, jeśli jest wymagana, np. "Twoja kolej na akceptację."
4. Język polski, profesjonalny i ciepły (ton: Senior UX Designer).
5. Format wyjściowy JSON: {"status": "success|warning|info", "narrative": "treść...", "actionLabel": "krótki tekst przycisku", "actionUrl": "url_opcjonalnie"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING },
            narrative: { type: Type.STRING },
            actionLabel: { type: Type.STRING },
            actionUrl: { type: Type.STRING }
          },
          required: ["status", "narrative", "actionLabel"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as { status: 'success' | 'warning' | 'info'; narrative: string; actionLabel: string; actionUrl?: string };
  } catch (error) {
    console.error("Error generating project narrative:", error);
    return null;
  }
}

export interface TripleDocResult {
  technical: string;
  caseStudy: string;
  lessonsLearned: string;
}

export async function generateTripleDoc(projectData: any, logs: any[]): Promise<TripleDocResult | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const prompt = `Na podstawie poniższych danych projektu i historii jego logów wygeneruj potrójną dokumentację: Dokumentację Techniczną, Case Study (Studium Przypadku) oraz Lessons Learned (Wnioski po projekcie).
Dane projektu:
Nazwa: ${projectData.name}
Status: ${projectData.status}
Zakończone fazy: ${projectData.phases?.filter((p: any) => p.completed).map((p: any) => p.name).join(', ') || 'Brak'}
Logi aktywności (akcje z projektu):
${logs.map(log => `- [${new Date(log.timestamp?.toMillis() || Date.now()).toLocaleDateString()}] ${log.action} ${log.isPrivate ? '(Prywatne przemyślenia)' : ''}`).join('\n')}

Wymagania dla wyników:
1. 'technical': Krótka, zwięzła dokumentacja techniczna użytych rozwiązań (możesz zgadywać popularny stack dla UX/UI np. React/Figma, dopasowując do logów). Używaj formatowania Markdown.
2. 'caseStudy': Profesjonalne studium przypadku składające się z: Wyzwanie, Rozwiązanie, Wyniki. Używaj formatowania Markdown.
3. 'lessonsLearned': Lista min. 3 wniosków i nauk wyniesionych z projektu (zarówno technologicznych jak i z zarządzania). Używaj formatowania Markdown.

Całość powinna być w języku polskim. Format odpowiedzi wymuszony w JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            technical: { type: Type.STRING },
            caseStudy: { type: Type.STRING },
            lessonsLearned: { type: Type.STRING }
          },
          required: ["technical", "caseStudy", "lessonsLearned"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as TripleDocResult;
  } catch (error) {
    console.error("Error generating Triple Doc:", error);
    return null;
  }
}
