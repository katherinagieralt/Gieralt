import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, query, orderBy, Timestamp, addDoc, deleteDoc, doc, serverTimestamp, writeBatch, updateDoc, onSnapshot, limit } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Loader2, LogOut, Mail, Users, Calendar, DollarSign, Clock, Plus, Trash2, BookOpen, Briefcase, Database, Edit2, Star, Download, MessageSquare, Send, Sparkles, X, Bell, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateBlogDraft, generatePortfolioDraft, generateFollowUpEmail, generateTopicIdeas, generateSocialPosts, generateImagePrompt, TopicIdea, SocialPosts, translateToEnglish, generateSEOMeta, generateAnalyticsSummary, generateWeeklyReport, generateABTestSuggestions } from "../services/aiLeadService";
import { fetchSearchConsoleData, SearchConsoleData } from "../services/googleSearchConsoleService";
import { useTheme } from "./ThemeProvider";
import toast from "react-hot-toast";
import { TripleDocGenerator } from "./TripleDocGenerator";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  budget: string;
  timeline: string;
  message: string;
  variant?: "quick" | "detailed";
  status?: "new" | "contacted" | "completed" | "rejected";
  notes?: string;
  aiInsights?: {
    summary: string;
    score: number;
    intent: string;
    sentiment: string;
    tags: string[];
  };
  createdAt: Timestamp;
}

interface LeadMagnetSignup {
  id: string;
  email: string;
  createdAt: Timestamp;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  imageAlt?: string;
  readTime: string;
  tags?: string[];
  createdAt: Timestamp;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  gallery?: string[];
  link: string;
  caseStudyLink?: string;
  tags?: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  createdAt: Timestamp;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  createdAt: Timestamp;
}

interface ClientProject {
  id: string;
  clientEmail: string;
  name: string;
  status: string;
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  currentPhase: string;
  phases: { name: string; completed: boolean }[];
  links: { name: string; url: string; icon: string }[];
  createdAt: Timestamp;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [signups, setSignups] = useState<LeadMagnetSignup[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clientProjects, setClientProjects] = useState<ClientProject[]>([]);
  const [feedbackMessages, setFeedbackMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"dashboard" | "analytics" | "submissions" | "signups" | "blog" | "portfolio" | "testimonials" | "client_projects" | "messages" | "ai_strategy" | "seo_monitoring">("dashboard");
  const [seoData, setSeoData] = useState<SearchConsoleData | null>(null);
  const [loadingSeo, setLoadingSeo] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({});
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [newLeadToast, setNewLeadToast] = useState<{ name: string; email: string } | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [followUpDraft, setFollowUpDraft] = useState<{ subject: string; body: string } | null>(null);
  const [topicIdeas, setTopicIdeas] = useState<TopicIdea[]>([]);
  const [abTestSuggestions, setAbTestSuggestions] = useState<{ title: string, hypothesis: string, change: string, metric: string }[]>([]);
  const [selectedSocialPosts, setSelectedSocialPosts] = useState<{ id: string; posts: SocialPosts } | null>(null);
  const [selectedImagePrompt, setSelectedImagePrompt] = useState<{ id: string; prompt: string } | null>(null);
  const [analyticsSummary, setAnalyticsSummary] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<ContactSubmission[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTripleDocProject, setSelectedTripleDocProject] = useState<ClientProject | null>(null);
  
  // Activity Log State
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [selectedActivityProject, setSelectedActivityProject] = useState<ClientProject | null>(null);
  const [newActivityLog, setNewActivityLog] = useState({ title: '', description: '', isPrivate: false });

  const { theme, setTheme, isDark } = useTheme();
  const navigate = useNavigate();

  // Form states for adding content
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", category: "", image: "", imageAlt: "", readTime: "", tags: "" });
  const [newPortfolio, setNewPortfolio] = useState({ title: "", category: "", description: "", image: "", imageAlt: "", gallery: "", link: "", caseStudyLink: "", tags: "", beforeImage: "", afterImage: "" });
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", content: "", avatar: "", rating: 5, projectImage: "", projectLink: "", linkedInUrl: "" });
  const [newClientProject, setNewClientProject] = useState({ 
    clientEmail: "", 
    name: "", 
    status: "in-progress", 
    progress: 0, 
    startDate: "", 
    estimatedCompletion: "", 
    currentPhase: "",
    phases: [
      { name: "Strategia i UX", completed: false },
      { name: "Projektowanie UI", completed: false },
      { name: "Wdrożenie (Development)", completed: false },
      { name: "Testy i Optymalizacja", completed: false },
      { name: "Uruchomienie", completed: false }
    ],
    links: [
      { name: "Makiety Figma", url: "", icon: "figma" },
      { name: "Dokumentacja", url: "", icon: "doc" }
    ]
  });

  useEffect(() => {
    let unsubscribeData: (() => void) | void;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      if (user.email?.toLowerCase() !== "katherina338@gmail.com") {
        console.error("Brak uprawnień administratora.");
        await signOut(auth);
        navigate("/login", { state: { error: "Brak uprawnień administratora. Użyj poprawnego konta." } });
        return;
      }

      unsubscribeData = await fetchData();
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeData) unsubscribeData();
    };
  }, [navigate]);

  // Lazy fetch data depending on the activeTab
  useEffect(() => {
    if (activeTab === "seo_monitoring" && !seoData) {
      const loadSeoData = async () => {
        setLoadingSeo(true);
        const data = await fetchSearchConsoleData();
        setSeoData(data);
        setLoadingSeo(false);
      };
      loadSeoData();
    }
    
    // Lazy load the collections to prevent UI freeze on initial render
    const loadTabData = async () => {
       if (loadedTabs[activeTab]) return;

       const markTabLoaded = () => setLoadedTabs(prev => ({ ...prev, [activeTab]: true }));

       try {
         switch (activeTab) {
           case "submissions":
           case "dashboard":
             if (!loadedTabs.submissions) {
                const subSnapshot = await getDocs(query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"), limit(50)));
                setSubmissions(subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactSubmission[]);
                setLoadedTabs(prev => ({ ...prev, submissions: true, dashboard: true }));
             }
             break;
           case "signups":
             const signupsSnapshot = await getDocs(query(collection(db, "leadMagnetSignups"), orderBy("createdAt", "desc"), limit(50)));
             setSignups(signupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LeadMagnetSignup[]);
             markTabLoaded();
             break;
           case "blog":
             const blogSnapshot = await getDocs(query(collection(db, "blogPosts"), orderBy("createdAt", "desc"), limit(50)));
             setBlogPosts(blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);
             markTabLoaded();
             break;
           case "portfolio":
             const portSnapshot = await getDocs(query(collection(db, "portfolioItems"), orderBy("createdAt", "desc"), limit(50)));
             setPortfolioItems(portSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PortfolioItem[]);
             markTabLoaded();
             break;
           case "testimonials":
             const testSnapshot = await getDocs(query(collection(db, "testimonials"), orderBy("createdAt", "desc"), limit(50)));
             setTestimonials(testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[]);
             markTabLoaded();
             break;
           case "client_projects":
             const projSnapshot = await getDocs(query(collection(db, "client_projects"), orderBy("createdAt", "desc"), limit(50)));
             setClientProjects(projSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ClientProject[]);
             markTabLoaded();
             break;
         }
       } catch (error) {
         console.error(`Error loading data for tab ${activeTab}:`, error);
       }
    };
    
    loadTabData();
  }, [activeTab, seoData, loadedTabs]);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    console.log("handleFirestoreError called", { error, operationType, path });
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    toast.error(`Błąd uprawnień (${operationType} na ${path}). Sprawdź konsolę.`);
    throw new Error(JSON.stringify(errInfo));
  };

  const fetchData = async () => {
    try {
      // Wykorzystanie Promise.allSettled do ucinania wąskiego gardła sekwencyjnego pobierania dla każdej kolekcji (zwiększy szybkość ladowania x6)
      const fetchPromises = [
        getDocs(query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"), limit(50))),
        getDocs(query(collection(db, "client_projects"), orderBy("createdAt", "desc"), limit(50)))
      ];

      const results = await Promise.allSettled(fetchPromises);

      if (results[0].status === 'fulfilled') {
        const subData = results[0].value.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactSubmission[];
        setSubmissions(subData);
        setNotifications(subData.filter(s => s.status === 'new'));
      }
      
      if (results[1].status === 'fulfilled') {
        setClientProjects(results[1].value.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ClientProject[]);
      }
      
      setLoadedTabs(prev => ({ ...prev, dashboard: true, submissions: true, client_projects: true }));
      
      // Real-time Feedback Messages
      const messagesQuery = query(collection(db, "client_feedback"), orderBy("createdAt", "asc"), limit(100));
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setFeedbackMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (e) => handleFirestoreError(e, OperationType.LIST, "client_feedback"));


      // Real-time listener for new leads
      const submissionsRef = collection(db, "contactSubmissions");
      const latestSubmissionsQuery = query(submissionsRef, orderBy("createdAt", "desc"), limit(50));
      
      const unsubscribeLeads = onSnapshot(latestSubmissionsQuery, (snapshot) => {
        const newSubmissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactSubmission[];
        
        // Update notifications (unread leads)
        const unread = newSubmissions.filter(s => s.status === 'new');
        setNotifications(unread);

        // Only show toast if it's a real new lead (not initial load)
        if (submissions.length > 0 && newSubmissions.length > submissions.length) {
          const newest = newSubmissions[0];
          if (newest.status === 'new') {
            setNewLeadToast({ name: newest.name, email: newest.email });
            // Auto-hide after 5 seconds
            setTimeout(() => setNewLeadToast(null), 5000);
          }
        }
        
        setSubmissions(newSubmissions);
      }, (e) => handleFirestoreError(e, OperationType.LIST, "contactSubmissions"));

      return () => {
        unsubscribeMessages();
        unsubscribeLeads();
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateSubmission = async (id: string, data: Partial<ContactSubmission>) => {
    try {
      await updateDoc(doc(db, "contactSubmissions", id), data);
      setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, ...data } : sub));
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  const handleExportSignups = () => {
    const headers = ["Email", "Data zapisu"];
    const rows = signups.map(s => [s.email, s.createdAt?.toDate().toISOString()]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter_signups_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSeedData = async () => {
    console.log("handleSeedData called");
    setSeeding(true);
    const errors: string[] = [];
    try {
      // Seed Blog Posts
      const blogData = [
        {
          title: "Dlaczego AI nie zastąpi UX Designera (jeszcze)",
          excerpt: "Sztuczna inteligencja generuje makiety w sekundy, ale czy rozumie emocje użytkownika?",
          content: "<p>Wszyscy słyszeliśmy te prognozy: 'AI zabierze nam pracę'. Jako projektant z 10-letnim stażem mam inną perspektywę...</p>",
          category: "AI & Design",
          image: "https://picsum.photos/seed/ai-ux/800/600",
          readTime: "5 min",
          tags: ["AI", "UX", "Future"],
          createdAt: serverTimestamp()
        },
        {
          title: "5 błędów na Landing Page, które zabijają konwersję",
          excerpt: "Twoja strona jest piękna, ale nie sprzedaje? Sprawdź te krytyczne błędy.",
          content: "<p>Piękny design to za mało. Landing page musi być maszyną do sprzedaży...</p>",
          category: "Optymalizacja",
          image: "https://picsum.photos/seed/conversion/800/600",
          readTime: "7 min",
          tags: ["Conversion", "Landing Page", "UX"],
          createdAt: serverTimestamp()
        }
      ];

      // Seed Portfolio Items
      const portfolioData = [
        {
          title: "Aplikacja FinTech",
          category: "Mobile App",
          description: "Projektowanie intuicyjnego interfejsu dla aplikacji bankowej.",
          image: "https://picsum.photos/seed/fintech/800/600",
          link: "https://example.com",
          tags: ["UX", "UI", "FinTech"],
          createdAt: serverTimestamp()
        }
      ];

      // Seed Testimonials
      const testimonialData = [
        {
          name: "Jan Kowalski",
          role: "CEO, TechCorp",
          content: "Świetna współpraca, profesjonalne podejście.",
          rating: 5,
          createdAt: serverTimestamp()
        }
      ];

      // Seed Client Projects
      const clientProjectData = [
        {
          clientEmail: "client@example.com",
          name: "Projekt X",
          status: "in-progress",
          progress: 50,
          startDate: "2026-01-01",
          estimatedCompletion: "2026-06-01",
          currentPhase: "Projektowanie UI",
          phases: [
            { name: "Strategia i UX", completed: true },
            { name: "Projektowanie UI", completed: false },
            { name: "Wdrożenie (Development)", completed: false },
            { name: "Testy i Optymalizacja", completed: false },
            { name: "Uruchomienie", completed: false }
          ],
          links: [
            { name: "Makiety Figma", url: "https://figma.com", icon: "figma" }
          ],
          createdAt: serverTimestamp()
        }
      ];

      const seedPromises = [
        ...blogData.map(post => addDoc(collection(db, "blogPosts"), post).catch(e => {
          console.error("Error adding blog post:", e);
          errors.push("Blog Posts");
        })),
        ...portfolioData.map(item => addDoc(collection(db, "portfolioItems"), item).catch(e => {
          console.error("Error adding portfolio item:", e);
          errors.push("Portfolio Items");
        })),
        ...testimonialData.map(testimonial => addDoc(collection(db, "testimonials"), testimonial).catch(e => {
          console.error("Error adding testimonial:", e);
          errors.push("Testimonials");
        })),
        ...clientProjectData.map(project => addDoc(collection(db, "client_projects"), project).catch(e => {
          console.error("Error adding client project:", e);
          errors.push("Client Projects");
        }))
      ];
      
      await Promise.allSettled(seedPromises);
      
      if (errors.length > 0) {
        // Unique errors only
        const uniqueErrors = [...new Set(errors)];
        toast.error("Błąd podczas dodawania danych w: " + uniqueErrors.join(", "));
      } else {
        toast.success("Dane zostały dodane pomyślnie!");
      }
      fetchData();
    } catch (error) {
      toast.error("Błąd podczas dodawania danych: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSeeding(false);
    }
  };

  const handleClearData = async () => {
    console.log("handleClearData called");
    setSeeding(true);
    try {
      const collectionsToClear = [
        "blogPosts", "portfolioItems", "testimonials", 
        "contactSubmissions", "leadMagnetSignups", 
        "client_projects", "client_feedback"
      ];
      
      const clearPromises = collectionsToClear.map(async (colName) => {
        const querySnapshot = await getDocs(collection(db, colName)).catch(e => {
          handleFirestoreError(e, OperationType.LIST, colName);
          return null;
        });

        if (!querySnapshot || querySnapshot.empty) return;
        
        let batch = writeBatch(db);
        let batchedCount = 0;
        
        for (const document of querySnapshot.docs) {
           batch.delete(doc(db, colName, document.id));
           batchedCount++;
           if (batchedCount === 500) {
              await batch.commit();
              batch = writeBatch(db);
              batchedCount = 0;
           }
        }
        
        if (batchedCount > 0) {
           await batch.commit();
        }
      });
      
      await Promise.allSettled(clearPromises);
      
      console.log("Dane zostały usunięte!");
      toast.success("Wszystkie dane zostały usunięte.");
      fetchData();
    } catch (error) {
      console.error("Error clearing data:", error);
      // handleFirestoreError already sets statusMessage and throws
    } finally {
      setSeeding(false);
    }
  };

  const handleAddActivityLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivityProject) return;

    try {
      await addDoc(collection(db, `projects/${selectedActivityProject.id}/activityLog`), {
        ...newActivityLog,
        timestamp: Date.now()
      });
      toast.success("Aktywność została dodana!");
      setShowActivityLogModal(false);
      setNewActivityLog({ title: '', description: '', isPrivate: false });
    } catch (error) {
      console.error("Błąd podczas zapisywania aktywności:", error);
      toast.error("Wystąpił błąd podczas zapisywania.");
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = newBlog.tags.split(",").map(t => t.trim()).filter(t => t !== "");
      if (editingId) {
        await updateDoc(doc(db, "blogPosts", editingId), { ...newBlog, tags });
      } else {
        await addDoc(collection(db, "blogPosts"), { ...newBlog, tags, createdAt: serverTimestamp() });
      }
      setNewBlog({ title: "", excerpt: "", content: "", category: "", image: "", imageAlt: "", readTime: "", tags: "" });
      setShowAddModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating blog post:", error);
    }
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = newPortfolio.tags.split(",").map(t => t.trim()).filter(t => t !== "");
      const gallery = newPortfolio.gallery.split(",").map(img => img.trim()).filter(img => img !== "");
      const portfolioData = {
        ...newPortfolio,
        tags,
        gallery,
        beforeAfter: newPortfolio.beforeImage && newPortfolio.afterImage ? {
          before: newPortfolio.beforeImage,
          after: newPortfolio.afterImage
        } : undefined
      };
      
      if (editingId) {
        await updateDoc(doc(db, "portfolioItems", editingId), portfolioData);
      } else {
        await addDoc(collection(db, "portfolioItems"), { ...portfolioData, createdAt: serverTimestamp() });
      }
      setNewPortfolio({ title: "", category: "", description: "", image: "", imageAlt: "", gallery: "", link: "", caseStudyLink: "", tags: "", beforeImage: "", afterImage: "" });
      setShowAddModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating portfolio item:", error);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "testimonials", editingId), newTestimonial);
      } else {
        await addDoc(collection(db, "testimonials"), { ...newTestimonial, createdAt: serverTimestamp() });
      }
      setNewTestimonial({ name: "", role: "", content: "", avatar: "", rating: 5, projectImage: "", projectLink: "", linkedInUrl: "" });
      setShowAddModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating testimonial:", error);
    }
  };

  const handleAddClientProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...newClientProject,
        clientEmail: newClientProject.clientEmail.toLowerCase()
      };
      
      if (editingId) {
        await updateDoc(doc(db, "client_projects", editingId), projectData);
      } else {
        await addDoc(collection(db, "client_projects"), { ...projectData, createdAt: serverTimestamp() });
      }
      setNewClientProject({ 
        clientEmail: "", 
        name: "", 
        status: "in-progress", 
        progress: 0, 
        startDate: "", 
        estimatedCompletion: "", 
        currentPhase: "",
        phases: [
          { name: "Strategia i UX", completed: false },
          { name: "Projektowanie UI", completed: false },
          { name: "Wdrożenie (Development)", completed: false },
          { name: "Testy i Optymalizacja", completed: false },
          { name: "Uruchomienie", completed: false }
        ],
        links: [
          { name: "Makiety Figma", url: "", icon: "figma" },
          { name: "Dokumentacja", url: "", icon: "doc" }
        ]
      });
      setShowAddModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating client project:", error);
    }
  };

  const handleAIBlogGenerate = async () => {
    if (!newBlog.title) {
      toast.error("Wpisz temat lub roboczy tytuł w polu 'Tytuł', aby AI wiedziało o czym pisać.");
      return;
    }
    
    setIsGeneratingAI(true);
    try {
      const draft = await generateBlogDraft(newBlog.title);
      if (draft) {
        setNewBlog({
          ...newBlog,
          title: draft.title,
          excerpt: draft.excerpt,
          content: draft.content,
          tags: draft.tags.join(", ")
        });
      }
    } catch (error) {
      console.error("Error generating blog draft:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAIPortfolioGenerate = async () => {
    if (!newPortfolio.title && !newPortfolio.description) {
      toast.error("Wpisz nazwę projektu lub krótkie notatki w opisie, aby AI mogło wygenerować treść.");
      return;
    }

    setIsGeneratingAI(true);
    try {
      const draft = await generatePortfolioDraft(newPortfolio.description || newPortfolio.title);
      if (draft) {
        setNewPortfolio({
          ...newPortfolio,
          title: draft.title,
          description: draft.description,
          category: draft.category
        });
      }
    } catch (error) {
      console.error("Error generating portfolio draft:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateFollowUp = async () => {
    if (!selectedSubmission || !selectedSubmission.aiInsights) return;

    setIsGeneratingAI(true);
    try {
      const draft = await generateFollowUpEmail({
        name: selectedSubmission.name,
        message: selectedSubmission.message,
        insights: selectedSubmission.aiInsights
      });
      setFollowUpDraft(draft);
    } catch (error) {
      console.error("Error generating follow-up:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSendFollowUp = async () => {
    if (!selectedSubmission || !followUpDraft) return;

    try {
      // Simulate sending by adding to a 'mail' collection (Firebase Email Extension pattern)
      await addDoc(collection(db, "mail"), {
        to: selectedSubmission.email,
        message: {
          subject: followUpDraft.subject,
          text: followUpDraft.body,
          html: followUpDraft.body.replace(/\n/g, '<br>')
        },
        createdAt: serverTimestamp()
      });
      
      toast.success("Wiadomość została zakolejkowana do wysyłki!");
      setFollowUpDraft(null);
    } catch (error) {
      console.error("Error sending follow-up:", error);
    }
  };

  const handleGenerateTopicIdeas = async () => {
    setIsGeneratingAI(true);
    try {
      const ideas = await generateTopicIdeas();
      if (ideas) setTopicIdeas(ideas);
    } catch (error) {
      console.error("Error generating topic ideas:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateSocialPosts = async (post: BlogPost) => {
    setIsGeneratingAI(true);
    try {
      const posts = await generateSocialPosts(post.content);
      if (posts) setSelectedSocialPosts({ id: post.id, posts });
    } catch (error) {
      console.error("Error generating social posts:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateImagePrompt = async (post: BlogPost) => {
    setIsGeneratingAI(true);
    try {
      const prompt = await generateImagePrompt(post.content);
      if (prompt) setSelectedImagePrompt({ id: post.id, prompt });
    } catch (error) {
      console.error("Error generating image prompt:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateAnalytics = async () => {
    setIsGeneratingAI(true);
    try {
      const summary = await generateAnalyticsSummary(submissions);
      if (summary) setAnalyticsSummary(summary);
    } catch (error) {
      console.error("Error generating analytics:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateABTests = async () => {
    setIsGeneratingAI(true);
    try {
      const context = "Landing page agencji UX/AI oferującej projektowanie interfejsów, audyty UX i wdrażanie rozwiązań AI. Główne sekcje: Hero, Portfolio, Pricing, Blog, Kontakt.";
      const suggestions = await generateABTestSuggestions(context);
      if (suggestions) setAbTestSuggestions(suggestions);
    } catch (error) {
      console.error("Error generating A/B tests:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateWeeklyReport = async (project: any) => {
    setIsGeneratingAI(true);
    try {
      const report = await generateWeeklyReport(project);
      if (report) {
        setWeeklyReport(report);
        setShowReportModal(true);
      }
    } catch (error) {
      console.error("Error generating weekly report:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleTranslateContent = async (type: 'blog' | 'portfolio', id: string, content: string) => {
    setIsTranslating(id);
    try {
      const translated = await translateToEnglish(content);
      if (translated) {
        const collectionName = type === 'blog' ? 'blogPosts' : 'portfolioItems';
        await updateDoc(doc(db, collectionName, id), { 
          content_en: translated,
          translatedAt: serverTimestamp() 
        });
        toast.success("Treść została przetłumaczona i zapisana!");
        fetchData();
      }
    } catch (error) {
      console.error("Error translating:", error);
    } finally {
      setIsTranslating(null);
    }
  };

  const handleGenerateSEO = async (type: 'blog' | 'portfolio', id: string, content: string) => {
    setIsGeneratingAI(true);
    try {
      const meta = await generateSEOMeta(content);
      if (meta) {
        const collectionName = type === 'blog' ? 'blogPosts' : 'portfolioItems';
        await updateDoc(doc(db, collectionName, id), { 
          seo: meta,
          seoUpdatedAt: serverTimestamp() 
        });
        toast.success("Meta-tagi SEO zostały wygenerowane i zapisane!");
        fetchData();
      }
    } catch (error) {
      console.error("Error generating SEO:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const startEdit = (type: "blog" | "portfolio" | "testimonial" | "client_projects", item: any) => {
    setEditingId(item.id);
    if (type === "blog") {
      setNewBlog({
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        category: item.category,
        image: item.image,
        imageAlt: item.imageAlt || "",
        readTime: item.readTime,
        tags: item.tags ? item.tags.join(", ") : ""
      });
    } else if (type === "portfolio") {
      setNewPortfolio({
        title: item.title,
        category: item.category,
        description: item.description,
        image: item.image,
        imageAlt: item.imageAlt || "",
        gallery: item.gallery ? item.gallery.join(", ") : "",
        link: item.link,
        caseStudyLink: item.caseStudyLink || "",
        tags: item.tags ? item.tags.join(", ") : "",
        beforeImage: item.beforeAfter?.before || "",
        afterImage: item.beforeAfter?.after || ""
      });
    } else if (type === "testimonial") {
      setNewTestimonial({
        name: item.name,
        role: item.role,
        content: item.content,
        avatar: item.avatar || "",
        rating: item.rating,
        projectImage: item.projectImage || "",
        projectLink: item.projectLink || "",
        linkedInUrl: item.linkedInUrl || ""
      });
    } else if (type === "client_projects") {
      setNewClientProject({
        clientEmail: item.clientEmail,
        name: item.name,
        status: item.status,
        progress: item.progress,
        startDate: item.startDate,
        estimatedCompletion: item.estimatedCompletion,
        currentPhase: item.currentPhase,
        phases: item.phases || [
          { name: "Strategia i UX", completed: false },
          { name: "Projektowanie UI", completed: false },
          { name: "Wdrożenie (Development)", completed: false },
          { name: "Testy i Optymalizacja", completed: false },
          { name: "Uruchomienie", completed: false }
        ],
        links: item.links || [
          { name: "Makiety Figma", url: "", icon: "figma" },
          { name: "Dokumentacja", url: "", icon: "doc" }
        ]
      });
    }
    setShowAddModal(true);
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten element?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleSendAdminReply = async (projectId: string) => {
    if (!adminReply.trim()) return;
    try {
      await addDoc(collection(db, "client_feedback"), {
        projectId,
        message: adminReply,
        sender: "admin",
        createdAt: serverTimestamp()
      });
      setAdminReply("");
    } catch (error) {
      console.error("Error sending admin reply:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 sm:p-8 font-sans">
      {/* Dashboard Header */}

      <div className="max-w-7xl mx-auto">
        {/* Real-time Notification Toast */}
        <AnimatePresence>
          {newLeadToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 20, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className="fixed top-0 left-1/2 z-[200] bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-500/30 p-4 rounded-2xl shadow-2xl shadow-rose-500/20 flex items-center gap-4 min-w-[320px]"
            >
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 dark:text-white">Nowy Lead!</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{newLeadToast.name} &bull; {newLeadToast.email}</div>
              </div>
              <button 
                onClick={() => setNewLeadToast(null)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 rotate-45 text-slate-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-1">Panel <span className="text-gradient">Administratora</span></h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-light">Zarządzaj treścią i zgłoszeniami</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleClearData}
              disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {seeding ? <Loader2 className="h-4 w-4 animate-spin text-rose-500" /> : <Trash2 className="h-4 w-4 text-rose-500" />}
              Wyczyść Dane
            </button>
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {seeding ? <Loader2 className="h-4 w-4 animate-spin text-rose-500" /> : <Database className="h-4 w-4 text-rose-500" />}
              Seeduj Dane
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm relative"
              >
                <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 dark:text-white">Powiadomienia</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{notifications.length} nowe</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800 cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedSubmission(n);
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="h-4 w-4 text-rose-500" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{n.name}</div>
                                <p className="text-xs text-slate-500 line-clamp-1">{n.message}</p>
                                <div className="text-[10px] text-slate-400 mt-1">Nowe zgłoszenie</div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-slate-500 text-sm">
                          Brak nowych powiadomień
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('submissions')}
                        className="w-full p-3 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-colors"
                      >
                        Zobacz wszystkie zgłoszenia
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {(activeTab === "blog" || activeTab === "portfolio" || activeTab === "testimonials" || activeTab === "client_projects") && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5 text-sm font-semibold"
              >
                <Plus className="h-4 w-4" />
                Dodaj {activeTab === "blog" ? "Artykuł" : activeTab === "portfolio" ? "Projekt" : activeTab === "client_projects" ? "Klienta" : "Opinię"}
              </button>
            )}
            
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm"
              title="Przełącz motyw"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              Wyloguj
            </button>
          </div>
        </header>

        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto scrollbar-hide">
          {[
            { id: "dashboard", icon: Database, label: "Przegląd" },
            { id: "analytics", icon: Database, label: "Analityka" },
            { id: "client_projects", icon: Briefcase, label: `Klienci (${clientProjects.length})` },
            { 
              id: "messages", 
              icon: MessageSquare, 
              label: (
                <div className="flex items-center gap-2">
                  Wiadomości
                  {feedbackMessages.some(m => m.sender === 'client') && (
                    <span className="w-2 h-2 bg-rose-500 rounded-full" />
                  )}
                </div>
              ) as any
            },
            { id: "submissions", icon: Mail, label: `Zgłoszenia (${submissions.length})` },
            { id: "signups", icon: Users, label: `Newsletter (${signups.length})` },
            { id: "blog", icon: BookOpen, label: `Blog (${blogPosts.length})` },
            { id: "portfolio", icon: Briefcase, label: `Portfolio (${portfolioItems.length})` },
            { id: "testimonials", icon: Star, label: `Opinie (${testimonials.length})` },
            { id: "ai_strategy", icon: Sparkles, label: "AI Strategy" },
            { id: "seo_monitoring", icon: Database, label: "SEO Monitoring" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                activeTab === tab.id 
                  ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500 shadow-sm border border-rose-100 dark:border-rose-500/20" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
            {/* Project List */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">Projekty</h3>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {clientProjects.map((project) => {
                  const projectMessages = feedbackMessages.filter(m => m.projectId === project.id);
                  const lastMessage = projectMessages[projectMessages.length - 1];
                  const hasUnread = lastMessage && lastMessage.sender === 'client';
                  return (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`w-full p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative ${selectedProjectId === project.id ? 'bg-rose-50 dark:bg-rose-500/5 border-l-4 border-rose-500' : ''}`}
                    >
                      {hasUnread && (
                        <div className="absolute top-6 right-6 w-2 h-2 bg-rose-500 rounded-full shadow-sm shadow-rose-500/50" />
                      )}
                      <div className="font-medium text-slate-900 dark:text-white mb-1">{project.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{project.clientEmail}</div>
                      {lastMessage && (
                        <div className="text-sm text-slate-600 dark:text-slate-300 truncate italic">
                          {lastMessage.sender === 'admin' ? 'Ty: ' : ''}{lastMessage.message}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
              {selectedProjectId ? (
                <>
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                        {clientProjects.find(p => p.id === selectedProjectId)?.name}
                      </h3>
                      <p className="text-xs text-slate-500">{clientProjects.find(p => p.id === selectedProjectId)?.clientEmail}</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {feedbackMessages
                      .filter(m => m.projectId === selectedProjectId)
                      .map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                              msg.sender === "admin"
                                ? "bg-rose-600 text-white rounded-tr-none"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none"
                            }`}
                          >
                            <p>{msg.message}</p>
                            <span className={`text-[10px] mt-1 block ${msg.sender === "admin" ? "text-rose-200" : "text-slate-400"}`}>
                              {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendAdminReply(selectedProjectId);
                      }}
                      className="flex gap-3"
                    >
                      <input
                        type="text"
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        placeholder="Wpisz odpowiedź..."
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                      />
                      <button
                        type="submit"
                        disabled={!adminReply.trim()}
                        className="bg-rose-600 hover:bg-rose-700 text-white p-2.5 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-rose-500/20"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-2">Wybierz projekt</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">Wybierz projekt z listy po lewej, aby zobaczyć historię wiadomości i odpowiedzieć klientowi.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">AI Business Insights</h2>
                <button 
                  onClick={handleGenerateAnalytics}
                  disabled={isGeneratingAI}
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAI ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Generuj raport AI
                </button>
              </div>
              
              {analyticsSummary ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-light">
                      {analyticsSummary}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                  <p className="text-slate-400 font-light">Kliknij przycisk powyżej, aby przeanalizować trendy w Twoich leadach.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">Średni Lead Score</div>
                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white">
                  {submissions.length > 0 ? Math.round(submissions.reduce((acc, s) => acc + (s.aiInsights?.score || 0), 0) / submissions.length) : 0}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">Konwersja Newsletter</div>
                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white">
                  {signups.length}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">Aktywne Projekty</div>
                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white">
                  {clientProjects.filter(p => p.status !== 'completed').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client_projects" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {clientProjects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-1">{project.name}</h3>
                      <p className="text-sm text-slate-500 font-light">{project.clientEmail}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleGenerateWeeklyReport(project)}
                        disabled={isGeneratingAI}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                        title="Generuj raport tygodniowy AI"
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                      <button onClick={() => {
                        setNewClientProject(project as any);
                        setEditingId(project.id);
                        setShowAddModal(true);
                      }} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete("client_projects", project.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Roadmap Visualization */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Roadmap</h4>
                        <span className="text-xs font-bold text-rose-500">{project.progress}%</span>
                      </div>
                      <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          className="absolute inset-y-0 left-0 bg-rose-500 rounded-full shadow-sm shadow-rose-500/50"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.phases?.map((phase: any, idx: number) => (
                          <div key={idx} className={`p-4 rounded-2xl border transition-all ${phase.completed ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${phase.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                                {idx + 1}
                              </div>
                              <span className={`text-xs font-medium ${phase.completed ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                {phase.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex flex-wrap gap-4">
                        {project.links?.map((link: any, idx: number) => (
                          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors border border-slate-100 dark:border-slate-800">
                            <Database className="h-3.5 w-3.5" />
                            {link.name}
                          </a>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                           onClick={() => {
                             setSelectedActivityProject(project);
                             setShowActivityLogModal(true);
                           }}
                           className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl text-xs font-bold transition-colors border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-2"
                        >
                           <Plus className="h-3.5 w-3.5" />
                           Aktywność
                        </button>
                        <button 
                           onClick={() => setSelectedTripleDocProject(project)}
                           className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-xl text-xs font-bold transition-colors border border-indigo-200 dark:border-indigo-500/30 flex items-center gap-2"
                        >
                           <Sparkles className="h-3.5 w-3.5" />
                           Triple Doc
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {clientProjects.length === 0 && <div className="col-span-full text-center py-20 text-slate-500 font-light bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 border-dashed">Brak projektów.</div>}
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Zgłoszenia", value: submissions.length, icon: Mail, color: "rose" },
                { label: "Newsletter", value: signups.length, icon: Users, color: "blue" },
                { label: "Artykuły", value: blogPosts.length, icon: BookOpen, color: "amber" },
                { label: "Projekty", value: portfolioItems.length, icon: Briefcase, color: "violet" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:bg-${stat.color}-500/10 transition-colors`} />
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`p-3 bg-${stat.color}-50 dark:bg-${stat.color}-500/10 rounded-2xl border border-${stat.color}-100 dark:border-${stat.color}-500/20`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                  </div>
                  <div className="text-4xl font-display font-bold text-slate-900 dark:text-white relative z-10">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Ostatnie zgłoszenia</h3>
                  <button onClick={() => setActiveTab("submissions")} className="text-sm text-rose-500 hover:text-rose-500 font-medium transition-colors">Zobacz wszystkie &rarr;</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {submissions.slice(0, 5).map(sub => (
                    <div key={sub.id} className="px-8 py-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">{sub.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-light">{sub.email}</div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{sub.createdAt?.toDate().toLocaleDateString()}</div>
                    </div>
                  ))}
                  {submissions.length === 0 && <div className="px-8 py-12 text-center text-slate-500 font-light">Brak zgłoszeń.</div>}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Ostatnie zapisy do newslettera</h3>
                  <button onClick={() => setActiveTab("signups")} className="text-sm text-rose-500 hover:text-rose-500 font-medium transition-colors">Zobacz wszystkie &rarr;</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {signups.slice(0, 5).map(signup => (
                    <div key={signup.id} className="px-8 py-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <div className="font-medium text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">{signup.email}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{signup.createdAt?.toDate().toLocaleDateString()}</div>
                    </div>
                  ))}
                  {signups.length === 0 && <div className="px-8 py-12 text-center text-slate-500 font-light">Brak zapisów.</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-5">Data</th>
                    <th className="px-6 py-5">Imię i Nazwisko</th>
                    <th className="px-6 py-5">Email</th>
                    <th className="px-6 py-5">Budżet</th>
                    <th className="px-6 py-5">AI Score</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Notatki</th>
                    <th className="px-6 py-5 text-right">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono text-xs">{sub.createdAt?.toDate().toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{sub.name}</td>
                      <td className="px-6 py-4 text-rose-500">{sub.email}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300"><div className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-blue-500" />{sub.budget}</div></td>
                      <td className="px-6 py-4">
                        {sub.aiInsights ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              sub.aiInsights.score >= 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                              sub.aiInsights.score >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                              'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
                            }`}>
                              {sub.aiInsights.score}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{sub.aiInsights.intent}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Brak analizy</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={sub.status || "new"} 
                          onChange={(e) => handleUpdateSubmission(sub.id, { status: e.target.value as any })}
                          className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow cursor-pointer ${
                            sub.status === 'new' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20' :
                            sub.status === 'contacted' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' :
                            sub.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' :
                            'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
                          }`}
                        >
                          <option value="new">Nowe</option>
                          <option value="contacted">W kontakcie</option>
                          <option value="completed">Zrealizowane</option>
                          <option value="rejected">Odrzucone</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="text"
                          placeholder="Dodaj notatkę..."
                          defaultValue={sub.notes || ""}
                          onBlur={(e) => handleUpdateSubmission(sub.id, { notes: e.target.value })}
                          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-700 dark:text-slate-300 transition-shadow placeholder:text-slate-400"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedSubmission(sub)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Szczegóły AI"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete("contactSubmissions", sub.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {submissions.length === 0 && <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-500 font-light">Brak zgłoszeń.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "signups" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={handleExportSignups}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white rounded-xl transition-all shadow-sm border border-slate-200 dark:border-slate-700 text-sm font-medium"
              >
                <Download className="h-4 w-4 text-rose-500" />
                Eksportuj do CSV
              </button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden max-w-4xl shadow-sm">
              <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-8 py-5">Data</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {signups.map((signup) => (
                  <tr key={signup.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono text-xs">{signup.createdAt?.toDate().toLocaleDateString()}</td>
                    <td className="px-8 py-5 text-rose-500 font-medium">{signup.email}</td>
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => handleDelete("leadMagnetSignups", signup.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {signups.length === 0 && <tr><td colSpan={3} className="px-8 py-12 text-center text-slate-500 font-light">Brak zapisów.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {activeTab === "blog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={() => startEdit("blog", post)}
                      className="p-2.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 backdrop-blur-sm rounded-xl transition-colors shadow-sm"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete("blogPosts", post.id)}
                      className="p-2.5 bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm rounded-xl transition-colors shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-rose-500 font-bold mb-3 uppercase tracking-wider">{post.category}</div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">{post.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 font-light leading-relaxed flex-1">{post.excerpt}</p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                    <button 
                      onClick={() => handleGenerateSocialPosts(post)}
                      disabled={isGeneratingAI}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Social Posts
                    </button>
                    <button 
                      onClick={() => handleGenerateImagePrompt(post)}
                      disabled={isGeneratingAI}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3 w-3" />
                      Image Prompt
                    </button>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <button 
                      onClick={() => handleTranslateContent('blog', post.id, post.content)}
                      disabled={!!isTranslating}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isTranslating === post.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Database className="h-3 w-3" />}
                      Tłumacz EN
                    </button>
                    <button 
                      onClick={() => handleGenerateSEO('blog', post.id, post.content)}
                      disabled={isGeneratingAI}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Database className="h-3 w-3" />
                      SEO Meta
                    </button>
                  </div>

                  {selectedSocialPosts?.id === post.id && (
                    <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-500/5 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                      <div className="text-[10px] font-bold text-rose-500 uppercase mb-3">LinkedIn Draft</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap mb-4">{selectedSocialPosts.posts.linkedin}</p>
                      <button 
                        onClick={() => setSelectedSocialPosts(null)}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase"
                      >
                        Zamknij
                      </button>
                    </div>
                  )}

                  {selectedImagePrompt?.id === post.id && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                      <div className="text-[10px] font-bold text-blue-500 uppercase mb-3">Midjourney Prompt</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4">"{selectedImagePrompt.prompt}"</p>
                      <button 
                        onClick={() => setSelectedImagePrompt(null)}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase"
                      >
                        Zamknij
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {blogPosts.length === 0 && <div className="col-span-full text-center py-20 text-slate-500 font-light bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">Brak artykułów.</div>}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={() => startEdit("portfolio", item)}
                      className="p-2.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 backdrop-blur-sm rounded-xl transition-colors shadow-sm"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete("portfolioItems", item.id)}
                      className="p-2.5 bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm rounded-xl transition-colors shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-rose-500 font-bold mb-3 uppercase tracking-wider">{item.category}</div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-3 leading-tight">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 font-light leading-relaxed flex-1">{item.description}</p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                    <button 
                      onClick={() => handleTranslateContent('portfolio', item.id, item.description)}
                      disabled={!!isTranslating}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isTranslating === item.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Database className="h-3 w-3" />}
                      Tłumacz EN
                    </button>
                    <button 
                      onClick={() => handleGenerateSEO('portfolio', item.id, item.description)}
                      disabled={isGeneratingAI}
                      className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Database className="h-3 w-3" />
                      SEO Meta
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {portfolioItems.length === 0 && <div className="col-span-full text-center py-20 text-slate-500 font-light bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">Brak projektów.</div>}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col relative shadow-sm hover:shadow-md transition-shadow group">
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => startEdit("testimonial", testimonial)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete("testimonials", testimonial.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.avatar || `https://ui-avatars.com/api/?name=${testimonial.name}`} 
                    alt={testimonial.name} 
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}`} />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm italic flex-1 font-light leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
            {testimonials.length === 0 && <div className="col-span-full text-center py-20 text-slate-500 font-light bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">Brak opinii.</div>}
          </div>
        )}

        {activeTab === "ai_strategy" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">AI Content Strategy</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light">Generuj innowacyjne tematy i strategie treści wspierane przez Gemini AI.</p>
                </div>
                <button 
                  onClick={handleGenerateTopicIdeas}
                  disabled={isGeneratingAI}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center gap-3 disabled:opacity-50"
                >
                  {isGeneratingAI ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                  Generuj pomysły na content
                </button>
                <button 
                  onClick={handleGenerateABTests}
                  disabled={isGeneratingAI}
                  className="px-8 py-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
                >
                  {isGeneratingAI ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                  Sugestie testów A/B
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {topicIdeas.map((idea, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all group"
                  >
                    <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-4">Pomysł #{idx + 1}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-rose-500 transition-colors">{idea.topic}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-6 leading-relaxed">{idea.reasoning}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Słowa kluczowe</div>
                        <div className="flex flex-wrap gap-2">
                          {idea.keywords.map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] border border-slate-100 dark:border-slate-700">{kw}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Grupa docelowa</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">{idea.targetAudience}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {topicIdeas.length === 0 && !isGeneratingAI && (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                    <Sparkles className="h-12 w-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-400 font-light">Kliknij przycisk powyżej, aby wygenerować strategię treści.</p>
                  </div>
                )}
              </div>

              {abTestSuggestions.length > 0 && (
                <div className="mt-16">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sugestie testów A/B</h3>
                      <p className="text-slate-500 text-sm">AI przeanalizowało strukturę strony i sugeruje następujące eksperymenty.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {abTestSuggestions.map((test, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Sparkles className="h-16 w-16" />
                        </div>
                        
                        <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-6 bg-rose-50 dark:bg-rose-500/10 w-fit px-3 py-1 rounded-full">{test.title}</div>
                        
                        <div className="space-y-6 relative z-10">
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hipoteza</div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{test.hypothesis}</p>
                          </div>
                          
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Zmiana (Wersja B)</div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">{test.change}</p>
                          </div>
                          
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Metryka sukcesu</div>
                            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                              <ArrowUpRight className="h-4 w-4" />
                              {test.metric}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 dark:bg-rose-500/5 rounded-[2.5rem] p-8 border border-slate-800 dark:border-rose-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Content Calendar MVP</h3>
                  <p className="text-slate-400 text-sm font-light">Planuj publikacje i zarządzaj harmonogramem (Wkrótce pełna integracja).</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { date: "15 Mar", title: "AI w UX: Jak automatyzacja zmienia proces projektowy", status: "Planowane" },
                  { date: "22 Mar", title: "Case Study: Redesign platformy FinTech z użyciem AI", status: "Szkic" },
                  { date: "29 Mar", title: "Przyszłość agencji kreatywnych w dobie generatywnej sztucznej inteligencji", status: "Pomysł" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 dark:bg-slate-900/50 rounded-2xl border border-slate-700 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="text-rose-500 font-mono text-sm font-bold">{item.date}</div>
                      <div className="text-slate-300 text-sm font-medium">{item.title}</div>
                    </div>
                    <div className="px-3 py-1 bg-slate-700 dark:bg-rose-500/10 text-slate-400 dark:text-rose-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "seo_monitoring" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">SEO Monitoring</h2>
                <p className="text-slate-500 dark:text-slate-400 font-light">Dane z Google Search Console (Symulacja).</p>
              </div>
              <button 
                onClick={() => { setSeoData(null); }}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <Database className="h-4 w-4" /> Odśwież dane
              </button>
            </div>

            {loadingSeo ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <Loader2 className="h-12 w-12 text-rose-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Pobieranie danych z Search Console...</p>
              </div>
            ) : seoData ? (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Kliknięcia", value: seoData.clicks, icon: ArrowUpRight, color: "rose" },
                    { label: "Wyświetlenia", value: (seoData.impressions / 1000).toFixed(1) + "k", icon: BookOpen, color: "blue" },
                    { label: "CTR", value: seoData.ctr + "%", icon: Star, color: "emerald" },
                    { label: "Pozycja", value: seoData.position, icon: Briefcase, color: "amber" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-4 bg-${stat.color}-50 dark:bg-${stat.color}-500/10 rounded-2xl text-${stat.color}-500`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Queries */}
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Najczęstsze zapytania</h3>
                    <div className="space-y-4">
                      {seoData.topQueries.map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="font-medium text-slate-700 dark:text-slate-300">{q.query}</div>
                          <div className="flex gap-6 text-xs">
                            <div className="text-slate-500"><span className="font-bold text-slate-900 dark:text-white">{q.clicks}</span> kliknięć</div>
                            <div className="text-slate-500"><span className="font-bold text-slate-900 dark:text-white">{(q.impressions / 1000).toFixed(1)}k</span> wyśw.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Pages */}
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Najlepsze strony</h3>
                    <div className="space-y-4">
                      {seoData.topPages.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{p.page}</div>
                          <div className="flex gap-6 text-xs">
                            <div className="text-slate-500"><span className="font-bold text-slate-900 dark:text-white">{p.clicks}</span> kliknięć</div>
                            <div className="text-slate-500"><span className="font-bold text-slate-900 dark:text-white">{(p.impressions / 1000).toFixed(1)}k</span> wyśw.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500">Brak dostępnych danych. Kliknij odśwież, aby pobrać.</p>
              </div>
            )}
          </div>
        )}

        {/* AI Insights Modal */}
        <AnimatePresence>
          {selectedSubmission && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSubmission(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-1">Analiza <span className="text-rose-500">AI Lead</span></h3>
                      <p className="text-slate-500 text-sm">{selectedSubmission.name} &bull; {selectedSubmission.email}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedSubmission(null)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <Plus className="h-6 w-6 rotate-45 text-slate-400" />
                    </button>
                  </div>

                  {selectedSubmission.aiInsights ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Score</div>
                          <div className={`text-2xl font-display font-bold ${
                            selectedSubmission.aiInsights.score >= 80 ? 'text-emerald-500' :
                            selectedSubmission.aiInsights.score >= 50 ? 'text-amber-500' : 'text-rose-500'
                          }`}>
                            {selectedSubmission.aiInsights.score}/100
                          </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Intencja</div>
                          <div className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                            {selectedSubmission.aiInsights.intent}
                          </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Sentyment</div>
                          <div className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                            {selectedSubmission.aiInsights.sentiment}
                          </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Wariant</div>
                          <div className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                            {selectedSubmission.variant || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-rose-500" />
                          Podsumowanie AI
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-rose-50/30 dark:bg-rose-500/5 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-500/10">
                          {selectedSubmission.aiInsights.summary}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Tagi i Kategorie</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubmission.aiInsights.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Oryginalna wiadomość</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs italic bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl">
                          "{selectedSubmission.message}"
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        {!followUpDraft ? (
                          <button 
                            onClick={handleGenerateFollowUp}
                            disabled={isGeneratingAI}
                            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                          >
                            {isGeneratingAI ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                            Generuj odpowiedź AI
                          </button>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-rose-50 dark:bg-rose-500/5 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-500/20">
                              <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Send className="h-3 w-3" />
                                Propozycja odpowiedzi
                              </div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">Temat: {followUpDraft.subject}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {followUpDraft.body}
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => setFollowUpDraft(null)}
                                className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                              >
                                Odrzuć
                              </button>
                              <button 
                                onClick={handleSendFollowUp}
                                className="flex-[2] py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20"
                              >
                                Wyślij odpowiedź
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Loader2 className="h-8 w-8 text-rose-500 animate-spin mx-auto mb-4" />
                      <p className="text-slate-500">Brak szczegółowej analizy dla tego zgłoszenia.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 sm:p-8 shadow-2xl shadow-rose-500/10">
              <h2 className="text-2xl font-display font-semibold mb-8 text-slate-900 dark:text-white">
                {editingId ? "Edytuj" : "Dodaj"} <span className="text-gradient">{activeTab === "blog" ? "Artykuł" : activeTab === "portfolio" ? "Projekt" : "Opinię"}</span>
              </h2>
              
              {activeTab === "blog" ? (
                <form onSubmit={handleAddBlog} className="space-y-5">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Tytuł" required value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <button 
                      type="button"
                      onClick={handleAIBlogGenerate}
                      disabled={isGeneratingAI}
                      className="px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl transition-colors flex items-center justify-center disabled:opacity-50"
                      title="Generuj treść z AI"
                    >
                      {isGeneratingAI ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    </button>
                  </div>
                  <input type="text" placeholder="Kategoria" required value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="URL Obrazka" required value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="text" placeholder="ALT Obrazka (SEO)" value={newBlog.imageAlt} onChange={e => setNewBlog({...newBlog, imageAlt: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  <input type="text" placeholder="Czas czytania (np. 5 min)" required value={newBlog.readTime} onChange={e => setNewBlog({...newBlog, readTime: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="Tagi (oddzielone przecinkami)" value={newBlog.tags} onChange={e => setNewBlog({...newBlog, tags: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <textarea placeholder="Zajawka (excerpt)" required value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light h-24 resize-none" />
                  <textarea placeholder="Treść HTML" required value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-mono text-sm h-48 resize-none" />
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Anuluj</button>
                    <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5">Zapisz</button>
                  </div>
                </form>
              ) : activeTab === "portfolio" ? (
                <form onSubmit={handleAddPortfolio} className="space-y-5">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Tytuł" required value={newPortfolio.title} onChange={e => setNewPortfolio({...newPortfolio, title: e.target.value})} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <button 
                      type="button"
                      onClick={handleAIPortfolioGenerate}
                      disabled={isGeneratingAI}
                      className="px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl transition-colors flex items-center justify-center disabled:opacity-50"
                      title="Generuj treść z AI"
                    >
                      {isGeneratingAI ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    </button>
                  </div>
                  <select required value={newPortfolio.category} onChange={e => setNewPortfolio({...newPortfolio, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light appearance-none">
                    <option value="" disabled>Wybierz kategorię...</option>
                    <option value="SaaS">SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="eCommerce">eCommerce</option>
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="URL Głównego Obrazka" required value={newPortfolio.image} onChange={e => setNewPortfolio({...newPortfolio, image: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="text" placeholder="ALT Obrazka (SEO)" value={newPortfolio.imageAlt} onChange={e => setNewPortfolio({...newPortfolio, imageAlt: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  <input type="text" placeholder="Tagi (oddzielone przecinkami)" value={newPortfolio.tags} onChange={e => setNewPortfolio({...newPortfolio, tags: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="Galeria zdjęć (URL-e oddzielone przecinkami)" value={newPortfolio.gallery} onChange={e => setNewPortfolio({...newPortfolio, gallery: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Link do projektu" required value={newPortfolio.link} onChange={e => setNewPortfolio({...newPortfolio, link: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="text" placeholder="Link do Case Study (opcjonalnie)" value={newPortfolio.caseStudyLink} onChange={e => setNewPortfolio({...newPortfolio, caseStudyLink: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Zdjęcie PRZED (URL, opcjonalnie)" value={newPortfolio.beforeImage} onChange={e => setNewPortfolio({...newPortfolio, beforeImage: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="text" placeholder="Zdjęcie PO (URL, opcjonalnie)" value={newPortfolio.afterImage} onChange={e => setNewPortfolio({...newPortfolio, afterImage: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  <textarea placeholder="Opis projektu" required value={newPortfolio.description} onChange={e => setNewPortfolio({...newPortfolio, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light h-32 resize-none" />
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Anuluj</button>
                    <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5">Zapisz</button>
                  </div>
                </form>
              ) : activeTab === "client_projects" ? (
                <form onSubmit={handleAddClientProject} className="space-y-5">
                  <input type="email" placeholder="Email klienta" required value={newClientProject.clientEmail} onChange={e => setNewClientProject({...newClientProject, clientEmail: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="Nazwa projektu" required value={newClientProject.name} onChange={e => setNewClientProject({...newClientProject, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="date" placeholder="Data startu" required value={newClientProject.startDate} onChange={e => setNewClientProject({...newClientProject, startDate: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="date" placeholder="Planowane zakończenie" required value={newClientProject.estimatedCompletion} onChange={e => setNewClientProject({...newClientProject, estimatedCompletion: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Obecna faza (np. Projektowanie UI)" required value={newClientProject.currentPhase} onChange={e => setNewClientProject({...newClientProject, currentPhase: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                    <input type="number" min="0" max="100" placeholder="Postęp (%)" required value={newClientProject.progress} onChange={e => setNewClientProject({...newClientProject, progress: parseInt(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Fazy Projektu</h3>
                    {newClientProject.phases.map((phase, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={phase.completed}
                          onChange={(e) => {
                            const newPhases = [...newClientProject.phases];
                            newPhases[index].completed = e.target.checked;
                            setNewClientProject({...newClientProject, phases: newPhases});
                          }}
                          className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                        />
                        <input 
                          type="text" 
                          value={phase.name}
                          onChange={(e) => {
                            const newPhases = [...newClientProject.phases];
                            newPhases[index].name = e.target.value;
                            setNewClientProject({...newClientProject, phases: newPhases});
                          }}
                          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Linki i Zasoby</h3>
                    {newClientProject.links.map((link, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input 
                          type="text" 
                          placeholder="Nazwa linku"
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...newClientProject.links];
                            newLinks[index].name = e.target.value;
                            setNewClientProject({...newClientProject, links: newLinks});
                          }}
                          className="w-1/3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                        <input 
                          type="text" 
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...newClientProject.links];
                            newLinks[index].url = e.target.value;
                            setNewClientProject({...newClientProject, links: newLinks});
                          }}
                          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Anuluj</button>
                    <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5">Zapisz</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddTestimonial} className="space-y-5">
                  <input type="text" placeholder="Imię i Nazwisko" required value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="Rola / Firma" required value={newTestimonial.role} onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="URL Awatara (opcjonalnie)" value={newTestimonial.avatar} onChange={e => setNewTestimonial({...newTestimonial, avatar: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="URL LinkedIn (opcjonalnie)" value={newTestimonial.linkedInUrl} onChange={e => setNewTestimonial({...newTestimonial, linkedInUrl: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="URL Zdjęcia Projektu (opcjonalnie)" value={newTestimonial.projectImage} onChange={e => setNewTestimonial({...newTestimonial, projectImage: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <input type="text" placeholder="Link do Projektu (opcjonalnie)" value={newTestimonial.projectLink} onChange={e => setNewTestimonial({...newTestimonial, projectLink: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light" />
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">Ocena:</label>
                    <select value={newTestimonial.rating} onChange={e => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})} className="bg-transparent text-slate-900 dark:text-white focus:outline-none font-medium appearance-none">
                      {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} gwiazdek</option>)}
                    </select>
                  </div>
                  <textarea placeholder="Treść opinii" required value={newTestimonial.content} onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow placeholder:text-slate-400 font-light h-32 resize-none" />
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Anuluj</button>
                    <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5">Zapisz</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        {/* Weekly Report Modal */}
        <AnimatePresence>
          {showReportModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold">Raport Tygodniowy AI</h3>
                  </div>
                  <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap font-light leading-relaxed text-slate-600 dark:text-slate-300">
                      {weeklyReport}
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                  <button 
                    onClick={() => setShowReportModal(false)}
                    className="px-6 py-3 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                  >
                    Zamknij
                  </button>
                  <button 
                    onClick={() => {
                      toast.success("Raport został wysłany do klienta!");
                      setShowReportModal(false);
                    }}
                    className="px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                  >
                    Wyślij do klienta
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Triple Doc Modal */}
        <AnimatePresence>
          {selectedTripleDocProject && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-4xl max-h-[90vh]"
                >
                   <TripleDocGenerator 
                      project={selectedTripleDocProject as any} 
                      onClose={() => setSelectedTripleDocProject(null)} 
                   />
                </motion.div>
             </div>
          )}
        </AnimatePresence>

        {/* Activity Log Modal */}
        <AnimatePresence>
          {showActivityLogModal && selectedActivityProject && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 w-full max-w-2xl p-8 shadow-2xl relative"
                >
                  <button onClick={() => setShowActivityLogModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                  <h3 className="text-2xl font-display font-bold mb-6">Dodaj Aktywność</h3>
                  <form onSubmit={handleAddActivityLog} className="space-y-5">
                    <input type="text" placeholder="Tytuł działania (np. Zakończenie Wireframe'ów)" required value={newActivityLog.title} onChange={e => setNewActivityLog({...newActivityLog, title: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white" />
                    <textarea placeholder="Szczegóły" required value={newActivityLog.description} onChange={e => setNewActivityLog({...newActivityLog, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white h-32" />
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                       <input type="checkbox" id="isPrivate" checked={newActivityLog.isPrivate} onChange={e => setNewActivityLog({...newActivityLog, isPrivate: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                       <label htmlFor="isPrivate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Prywatna notatka (isPrivate)
                          <span className="block text-xs font-light text-slate-500 mt-1">Niewidoczne dla klienta, używane tylko do wewnętrznej analizy i przez generatory AI (np. Triple Doc).</span>
                       </label>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md">Dodaj</button>
                    </div>
                  </form>
                </motion.div>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
