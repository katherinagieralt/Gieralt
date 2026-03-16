import React, { useEffect } from "react";
import { useClientOSStore } from "../hooks/useClientOSStore";
import { Loader2, Zap, Layers, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ErrorBoundary } from "../../../components/ErrorBoundary";

import { AIProjectNarrator } from "./AIProjectNarrator";
import { MicroLearningCard } from "./MicroLearningCard";
import { ScopeConfigurator } from "./ScopeConfigurator";

interface ClientDashboardProps {
  projectId: string;
  userId: string;
  defaultMode?: 'focus' | 'pro';
  children?: React.ReactNode; 
}

export function ClientDashboard({ projectId, userId, defaultMode, children }: ClientDashboardProps) {
  const { clientOSMode, setMode, hydrateFromFirestore } = useClientOSStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      // Simulate fetch preferences from Firebase
      setTimeout(() => {
        if (defaultMode && !clientOSMode) {
          setMode(defaultMode, userId);
        }
        setLoading(false);
      }, 500);
    };

    fetchPreferences();
  }, [userId, defaultMode, setMode, clientOSMode]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-24 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800" />
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800" />
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800" />
          </div>
          <div className="space-y-6">
            <div className="h-40 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800" />
            <div className="h-80 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Mode Toggle Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <div>
            <h1 className="text-2xl font-display font-bold">Witaj w CLIENT-OS</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {clientOSMode === 'focus' ? 'Tryb Skupienia: Wyświetlam tylko najważniejsze zadania.' : 'Tryb Pro: Pełny podgląd narzędzi, statystyk i analiz.'}
            </p>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setMode('focus', userId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                clientOSMode === 'focus' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Zap className="w-4 h-4" />
              Focus
            </button>
            <button
              onClick={() => setMode('pro', userId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                clientOSMode === 'pro' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              Pro
            </button>
          </div>
        </div>

        {/* Dynamic Layout based on Mode */}
        {clientOSMode === 'focus' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key="focus-mode"
            className="flex flex-col gap-6"
          >
            {/* Focus Mode: Only Narrative & Current Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <AIProjectNarrator projectId={projectId} />
               <MicroLearningCard triggerEvent="wireframe_review" userId={userId} onDismiss={() => {}} />
            </div>

            {children}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key="pro-mode"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Pro Mode: Full Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl relative flex items-center justify-center text-slate-400">
                  <p className="absolute top-4 left-4 font-semibold text-xs uppercase tracking-wider">Project Timeline</p>
                  <p>Tutaj znajdzie się oś czasu całego projektu (istniejący układ)</p>
              </div>
              
              <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl relative flex flex-col items-center justify-center text-slate-400 p-2">
                  <ScopeConfigurator projectId={projectId} currentPrice={15000} currentDays={30} />
              </div>
              
              {children}
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  AI Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-sm">
                    Estymujemy oszczędność 3 godzin dzięki natychmiastowym zatwierdzeniom scope'u.
                  </div>
                </div>
              </div>

              <AIProjectNarrator projectId={projectId} />
            </div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}
