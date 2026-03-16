import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useAnalytics } from "./AnalyticsProvider";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";


export function Hero() {
  const { trackEvent } = useAnalytics();
  const { i18n } = useTranslation();
  
  const currentMonth = new Date().toLocaleString(i18n.language === 'pl' ? 'pl-PL' : 'en-US', { month: 'long' });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-12 sm:pt-40 sm:pb-8 transition-colors duration-300">
      {/* Premium Background Effects */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-rose-500/20 dark:bg-rose-500/30 blur-[180px] rounded-full pointer-events-none opacity-50 dark:opacity-40" 
      />
      <div className="absolute -top-[100px] -right-[100px] w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/15 blur-[150px] rounded-full pointer-events-none opacity-30" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xKSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          style={{ y: y2, opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {i18n.language === 'pl' ? `Dostępność w: ${currentMonth}` : `Available in: ${currentMonth}`}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6 text-slate-900 dark:text-white leading-[1.05]"
          >
            Twoja Strona <strong>Nie Sprzedaje?</strong> <br className="hidden sm:block" />
            Zaprojektuję ścieżkę konwersji, którą Twoi klienci <strong>pokochają.</strong>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Odzyskaj czas i przestań przepalać budżet. Jako UX/UI Designer & AI-Powered Strategist łączę 10 lat doświadczenia z precyzją sztucznej inteligencji, by stworzyć stronę, którą Twoi klienci <strong>pokochają</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <button 
              onClick={() => trackEvent('hero_cta_click', { label: 'Sprawdź dostępność' })}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-sm uppercase tracking-widest font-bold text-white transition-all duration-300 bg-rose-500 rounded-full hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-slate-900 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Sprawdź dostępność w tym miesiącu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Subtle shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white text-sm uppercase tracking-widest font-bold px-8 py-5 transition-colors flex items-center gap-3 w-full sm:w-auto justify-center group">
              <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              Zaprojektujmy Twój sukces
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
