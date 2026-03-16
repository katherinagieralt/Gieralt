import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfService({ isOpen, onClose }: TermsOfServiceProps) {
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
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-rose-500/10 overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-lg font-display font-semibold text-slate-900 dark:text-white">Regulamin <span className="text-gradient">Serwisu</span></h2>
              <button
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto text-slate-600 dark:text-slate-300 space-y-6 text-sm font-light leading-relaxed bg-slate-50 dark:bg-slate-950/50">
              <p>
                <strong className="font-semibold text-slate-900 dark:text-white block mb-2">1. Postanowienia Ogólne</strong>
                Niniejszy regulamin określa zasady korzystania ze strony internetowej katarzynagieralt.pl.
              </p>
              <p>
                <strong className="font-semibold text-slate-900 dark:text-white block mb-2">2. Usługi</strong>
                Strona służy do prezentacji portfolio projektowego oraz umożliwia kontakt w celu nawiązania współpracy.
              </p>
              <p>
                <strong className="font-semibold text-slate-900 dark:text-white block mb-2">3. Prawa Autorskie</strong>
                Wszystkie materiały zawarte na stronie są chronione prawem autorskim. Kopiowanie bez zgody autora jest zabronione.
              </p>
              <p>
                <strong className="font-semibold text-slate-900 dark:text-white block mb-2">4. Odpowiedzialność</strong>
                Dokładamy wszelkich starań, aby informacje na stronie były aktualne, jednak nie ponosimy odpowiedzialności za ewentualne błędy.
              </p>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
              <button
                onClick={onClose}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Rozumiem
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
