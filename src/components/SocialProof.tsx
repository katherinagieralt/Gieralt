import { motion } from "motion/react";
import { Search, Activity, CheckCircle2, TrendingUp } from "lucide-react";

export function SocialProof() {
  return (
    <section className="bg-slate-900 dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-900/0 to-slate-900/0 dark:from-rose-900/10 dark:via-slate-950/0 dark:to-slate-950/0 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700/50 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm"
          >
            Case Study
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-white mb-8 leading-tight tracking-tight"
          >
            Anatomia <span className="font-bold text-gradient">Decyzji</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Zobacz, jak przekuwam problemy w wyniki. Analiza projektu dla branży FinTech.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left: The Problem/Solution Cards */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 dark:border-red-500/30 p-8 rounded-3xl hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors duration-500 backdrop-blur-sm group"
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-red-500/10 dark:bg-red-500/20 rounded-2xl text-red-400 shrink-0 border border-red-500/20 dark:border-red-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-3">Problem</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Niska konwersja na stronie głównej (0.8%). Użytkownicy gubili się w skomplikowanej ofercie i opuszczali stronę po 15 sekundach.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              className="bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 dark:border-rose-500/30 p-8 rounded-3xl hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors duration-500 backdrop-blur-sm group"
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-rose-500/10 dark:bg-rose-500/20 rounded-2xl text-rose-500 shrink-0 border border-rose-500/20 dark:border-rose-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-3">Diagnoza</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Zbyt techniczny język, brak jasnego CTA above-the-fold, wolne ładowanie grafik.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 p-8 rounded-3xl hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors duration-500 backdrop-blur-sm group"
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0 border border-emerald-500/20 dark:border-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-3">Rozwiązanie</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Uproszczenie nawigacji, wdrożenie sekcji "Jak to działa" w 3 krokach, optymalizacja grafik WebP, nowe copy językiem korzyści.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: The Result */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-slate-800/50 dark:bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-700/50 dark:border-slate-800 relative overflow-hidden shadow-2xl shadow-black/50 hover:border-emerald-500/30 transition-colors duration-500 group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <TrendingUp className="h-64 w-64 text-emerald-500" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
                Wynik po 30 dniach
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-5xl font-display font-semibold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-500">2.4%</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Konwersja (+200%)</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-semibold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-500">48h</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Czas wdrożenia</div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-slate-700/0 via-slate-700 to-slate-700/0 dark:via-slate-800 mb-10" />

              <blockquote className="text-slate-300 italic mb-8 text-lg font-light leading-relaxed relative">
                <span className="absolute -top-4 -left-4 text-4xl text-slate-700 dark:text-slate-800 font-serif leading-none">"</span>
                <span className="relative z-10">Projekt dostarczony błyskawicznie. Nowa struktura od razu przełożyła się na więcej zapytań ofertowych.</span>
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 dark:bg-slate-800 border-2 border-slate-600 dark:border-slate-700 flex items-center justify-center font-display font-bold text-white shadow-sm group-hover:border-rose-500/50 transition-colors duration-500">
                  MK
                </div>
                <div>
                  <div className="font-display font-semibold text-white">Michał K.</div>
                  <div className="text-xs text-slate-400 font-light uppercase tracking-wider mt-1">Founder, FinTech Startup</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
