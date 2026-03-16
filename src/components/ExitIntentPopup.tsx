import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("newsletter_popup_shown");
    if (shown) setHasShown(true);

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem("newsletter_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, [hasShown, isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addDoc(collection(db, "newsletterSignups"), {
        email,
        source: "exit_intent_popup",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error) {
      console.error("Error signing up:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl shadow-rose-500/10 dark:shadow-2xl overflow-hidden p-8 sm:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50/50 via-transparent to-transparent dark:from-rose-900/20 dark:via-transparent dark:to-transparent pointer-events-none" />
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-10 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 mb-6 shadow-sm">
                <Mail className="h-10 w-10" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-display font-light text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                Zanim <span className="font-bold text-gradient">odejdziesz...</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-10 font-light leading-relaxed">
                Zapisz się na mój newsletter, aby otrzymywać ekskluzywne wskazówki dotyczące designu i strategii UX bezpośrednio na swoją skrzynkę.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-blue-600 dark:text-blue-400 py-6 bg-blue-50 dark:bg-blue-500/10 rounded-3xl border border-blue-100 dark:border-blue-500/20"
                >
                  <CheckCircle2 className="h-12 w-12" />
                  <p className="font-medium">Dziękuję! Sprawdź swoją skrzynkę.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="Twój adres e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 bg-rose-600 rounded-2xl hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5"
                  >
                    {status === "loading" ? "Zapisywanie..." : "Chcę otrzymywać wskazówki"}
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  {status === "error" && (
                    <p className="text-rose-500 text-sm font-medium">Coś poszło nie tak. Spróbuj ponownie.</p>
                  )}
                </form>
              )}
              
              <p className="mt-8 text-xs text-slate-500 dark:text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
                Szanuję Twoją prywatność. Zero spamu, tylko wartościowa wiedza. 
                Możesz się wypisać w każdej chwili.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
