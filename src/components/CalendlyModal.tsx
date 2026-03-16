import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-rose-500/10 overflow-hidden flex flex-col h-[80vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl text-rose-500 border border-rose-100 dark:border-rose-500/20 shadow-sm">
                  <Calendar className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white">Wybierz termin konsultacji</h2>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-50 dark:bg-slate-950 relative">
              {/* Placeholder for Calendly iframe */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400">
                <div className="text-center p-8">
                  <p className="mb-4 font-light text-slate-700 dark:text-slate-300">Tutaj będzie widoczny kalendarz Calendly.</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto font-light leading-relaxed">
                    W wersji produkcyjnej wklej tutaj kod embed z Calendly.
                    Na potrzeby demo, to tylko placeholder.
                  </p>
                  <div className="mt-12 animate-pulse flex flex-col items-center">
                    <div className="h-64 w-full max-w-md bg-slate-200 dark:bg-slate-800 rounded-3xl mb-6 shadow-sm"></div>
                    <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
