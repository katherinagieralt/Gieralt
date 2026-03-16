import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { generatePersonalizedWelcome } from "../services/aiLeadService";

export function PersonalizedGreeting() {
  const [greeting, setGreeting] = useState<{ message: string, cta: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const trackBehavior = () => {
      const behaviorStr = localStorage.getItem("user_behavior");
      const behavior = behaviorStr ? JSON.parse(behaviorStr) : { visitedSections: [], lastVisit: new Date().toISOString() };
      
      // Update last visit on mount
      const now = new Date().toISOString();
      behavior.lastVisit = now;
      localStorage.setItem("user_behavior", JSON.stringify(behavior));

      // If they've visited at least 2 sections, generate a greeting
      if (behavior.visitedSections.length >= 2) {
        generateGreeting(behavior);
      }
    };

    const generateGreeting = async (behavior: any) => {
      // Check if we already showed a greeting in this session
      if (sessionStorage.getItem("greeting_shown")) return;

      setIsGenerating(true);
      const result = await generatePersonalizedWelcome(behavior);
      if (result) {
        setGreeting(result);
        setIsVisible(true);
        sessionStorage.setItem("greeting_shown", "true");
      }
      setIsGenerating(false);
    };

    // Delay tracking to allow user to explore
    const timer = setTimeout(trackBehavior, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !greeting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-24 left-8 z-[60] max-w-sm"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-rose-100 dark:border-rose-500/20 relative overflow-hidden group">
          {/* Background Glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full group-hover:bg-rose-500/20 transition-colors" />
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Dla Ciebie (AI)</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-4">
                {greeting.message}
              </p>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                  setIsVisible(false);
                }}
                className="flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors group/btn"
              >
                {greeting.cta}
                <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
