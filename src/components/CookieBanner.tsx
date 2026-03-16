import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-40 flex justify-center pointer-events-none"
        >
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col sm:flex-row items-center gap-5 pointer-events-auto">
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl text-rose-500 shrink-0 border border-rose-100 dark:border-rose-500/20 shadow-sm">
              <Cookie className="h-6 w-6" />
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 flex-1 text-center sm:text-left font-light leading-relaxed">
              Ta strona używa ciasteczek, aby zapewnić Ci najlepsze doświadczenie.{" "}
              <span className="text-slate-500 dark:text-slate-400 block sm:inline mt-1 sm:mt-0">Bez agresywnego śledzenia, tylko niezbędna analityka.</span>
            </div>
            <button
              onClick={handleAccept}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 whitespace-nowrap w-full sm:w-auto"
            >
              Akceptuję
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
