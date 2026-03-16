import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, onSnapshot, Timestamp, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2, FileText, CheckCircle2, Clock, Calendar, ExternalLink, MessageSquare, Send, Sparkles, X, User, Bot, Folder, Lock, Eye, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectHeader } from "./portal/ProjectHeader";
import { ProjectProgress } from "./portal/ProjectProgress";
import { FeedbackChat } from "./portal/FeedbackChat";
import { ResourcesList } from "./portal/ResourcesList";
import { AiAssistant } from "./portal/AiAssistant";
import toast from "react-hot-toast";
import { generateChatbotResponse } from "../services/aiLeadService";
import { useTheme } from "./ThemeProvider";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import { ClientDashboard } from "../features/client-os/components/ClientDashboard";

interface FeedbackMessage {
  id: string;
  message: string;
  sender: "client" | "admin";
  createdAt: Timestamp;
}

export function ClientPortal() {
  const [user, setUser] = useState<any>(null);
  const userEmail = user?.email?.toLowerCase() || "";
  
  const { data: projectDataArray = [], isLoading: loadingProject } = useFirestoreQuery<any>(
    ['clientProject', userEmail], 
    'client_projects', 
    userEmail ? [where("clientEmail", "==", userEmail), limit(1)] : []
  );

  const project = projectDataArray.length > 0 ? projectDataArray[0] : null;
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: string, text: string }[]>([
    { role: 'model', text: 'Cześć! Jestem Twoim asystentem AI. Jak mogę Ci dzisiaj pomóc w związku z Twoim projektem?' }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const { theme, setTheme, isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/client/login");
        return;
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!project?.id) return;
    
    // Real-time messages remains onSnapshot as it's efficient for chat
    const msgQuery = query(
      collection(db, "client_feedback"), 
      where("projectId", "==", project.id),
      orderBy("createdAt", "asc"),
      limit(100)
    );
    
    const unsubscribeMsgs = onSnapshot(msgQuery, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedbackMessage[];
      setMessages(msgs);
    });

    return () => unsubscribeMsgs();
  }, [project?.id]);

  const handleSendMessage = async (e: React.FormEvent, phaseName?: string, directMessage?: string) => {
    if (e) e.preventDefault();
    const messageContent = directMessage || newMessage;
    if (!messageContent.trim() && !phaseName) return;
    if (!project || !user) return;

    setSending(true);
    try {
      await addDoc(collection(db, "client_feedback"), {
        projectId: project.id,
        clientEmail: user.email,
        message: phaseName ? `[Dotyczy fazy: ${phaseName}] ${messageContent}` : messageContent.trim(),
        sender: "client",
        createdAt: serverTimestamp()
      });
      if (!directMessage) {
        setNewMessage("");
        toast.success("Wiadomość wysłana!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Nie udało się wysłać wiadomości.");
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiTyping) return;

    const userMsg = aiInput.trim();
    setAiInput("");
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsAiTyping(true);

    try {
      const response = await generateChatbotResponse(userMsg, project, aiMessages);
      setAiMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error("AI Chat error:", error);
      toast.error("Błąd połączenia z asystentem AI.");
      setAiMessages(prev => [...prev, { role: 'model', text: "Przepraszam, wystąpił problem z moim systemem. Spróbuj ponownie później." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  if (loadingProject) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-sm">Portal Klienta</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-amber-400 transition-colors"
              title="Przełącz motyw"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Wyloguj</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!project ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-2">Brak aktywnych projektów</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Nie znaleźliśmy żadnych projektów przypisanych do Twojego konta. Jeśli uważasz, że to błąd, skontaktuj się ze mną.</p>
            <a 
              href="mailto:kontakt@katarzynagieralt.pl"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              Skontaktuj się ze mną
            </a>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <ProjectHeader project={project} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Progress & Timeline */}
              <div className="lg:col-span-8 space-y-8">
                <ProjectProgress project={project} onSendMessage={handleSendMessage} />
                <FeedbackChat 
                  messages={messages} 
                  sending={sending} 
                  newMessage={newMessage} 
                  setNewMessage={setNewMessage} 
                  onSendMessage={handleSendMessage} 
                />
                {/* Client-OS: AI Narrator + Scope Configurator */}
                {user && (
                  <ClientDashboard 
                    projectId={project.id} 
                    userId={user.uid}
                    defaultMode="focus"
                  />
                )}
              </div>

              {/* Right Column - Resources & Contact */}
              <div className="lg:col-span-4 space-y-8">
                <ResourcesList project={project} />
                {/* Contact */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg"
                >
                  <h2 className="text-lg font-display font-semibold mb-2">Masz pytania?</h2>
                  <p className="text-slate-300 text-sm mb-6">Jestem do Twojej dyspozycji na każdym etapie projektu.</p>
                  <a 
                    href="mailto:kontakt@katarzynagieralt.pl"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-900 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Napisz wiadomość
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Assistant Floating Button */}
      <AiAssistant 
        showAIChat={showAIChat}
        setShowAIChat={setShowAIChat}
        aiMessages={aiMessages}
        aiInput={aiInput}
        setAiInput={setAiInput}
        handleSendAiMessage={handleSendAiMessage}
        isAiTyping={isAiTyping}
      />
    </div>
  );
}

