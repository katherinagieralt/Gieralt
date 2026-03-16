import React from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowLeft, Download, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ThankYou() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-12 transition-colors duration-300 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 dark:bg-rose-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-16 shadow-2xl shadow-rose-500/5 dark:shadow-none border border-slate-200/50 dark:border-slate-800/50 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner shadow-emerald-500/20"
          >
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </motion.div>

          <h1 className="text-4xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Dziękuję za wiadomość!
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 font-light leading-relaxed max-w-lg mx-auto">
            Twoje zgłoszenie zostało przyjęte. Skontaktuję się z Tobą w ciągu najbliższych 24 godzin roboczych.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-rose-50/50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 rounded-[2rem] p-8 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">Prezent dla Ciebie</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 font-light leading-relaxed">
                Pobierz mój darmowy przewodnik: "7 kroków do skutecznego Landing Page".
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 text-rose-500 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-sm border border-slate-200 dark:border-slate-700">
                <Download className="h-4 w-4" />
                Pobierz PDF
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-[2rem] p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">Co dalej?</h3>
              <ul className="text-slate-600 dark:text-slate-400 space-y-3 font-light">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Analiza Twoich potrzeb
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Bezpłatna konsultacja
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Wstępna wycena
                </li>
              </ul>
            </motion.div>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:-translate-y-0.5 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Wróć do strony głównej
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
