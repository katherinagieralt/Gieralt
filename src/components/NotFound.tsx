import { motion } from "motion/react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 dark:bg-rose-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-rose-500/10 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-lg w-full relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-16 shadow-2xl shadow-rose-500/5 dark:shadow-none border border-slate-200/50 dark:border-slate-800/50"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-24 h-24 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner shadow-rose-500/20"
          >
            <AlertTriangle className="h-12 w-12 text-rose-500" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-8xl font-display font-bold text-slate-900 dark:text-white mb-4 leading-none tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Strona nie znaleziona
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 font-light leading-relaxed">
            Ups! Strona, której szukasz, nie istnieje, została przeniesiona lub adres URL jest nieprawidłowy.
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:-translate-y-0.5 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Wróć na stronę główną
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
