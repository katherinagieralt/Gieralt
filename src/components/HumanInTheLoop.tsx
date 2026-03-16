import { motion } from "motion/react";
import { BrainCircuit, UserCheck } from "lucide-react";

export function HumanInTheLoop() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-16 relative overflow-hidden transition-colors duration-300">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 dark:from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            Model Pracy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            AI jako narzędzie, <span className="font-bold text-gradient">człowiek jako strateg.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            AI daje nam bezbłędny start, ja dowożę perfekcyjny finisz. Dzięki temu nie zaczynamy od zera, a Ty zyskujesz stronę premium w ułamku standardowego czasu.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Part */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/80 dark:bg-slate-800/40 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/50 shadow-xl dark:shadow-2xl backdrop-blur-md hover:-translate-y-2 hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-500 group"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-1">AI (30%)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider font-bold">Automatyzacja i szybkość</p>
              </div>
            </div>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300 font-light">
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                Błyskawiczny research rynku i analiza konkurencji
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-75" />
                Szybkie prototypowanie layoutów i struktury
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-150" />
                Optymalizacja pod kątem wydajności
              </li>
            </ul>
          </motion.div>

          {/* Human Part */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-slate-900 dark:bg-slate-800/80 rounded-3xl p-10 border border-slate-800 dark:border-slate-700 shadow-xl dark:shadow-2xl backdrop-blur-md relative overflow-hidden hover:-translate-y-2 hover:shadow-rose-500/10 hover:border-rose-500/30 transition-all duration-500 group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <UserCheck className="h-40 w-40 text-white" />
            </div>
            
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-white mb-1">Human (70%)</h3>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-bold">Strategia i kreatywność</p>
              </div>
            </div>
            <ul className="space-y-4 text-slate-300 font-light relative z-10">
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                Moje oko do detalu i psychologia sprzedaży
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-75" />
                Decyzje projektowe, których nie podejmie algorytm
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-150" />
                Strategia marki i unikalny charakter
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Visual Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div className="w-[30%] bg-blue-500 h-full relative group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="w-[70%] bg-rose-500 dark:bg-rose-600 h-full relative group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span>AI: Fundamenty</span>
            <span>Human: Wartość Premium</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
