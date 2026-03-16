import { motion } from "motion/react";
import { PhoneCall, FileText, PenTool, Code, HeadphonesIcon } from "lucide-react";

export function CollaborationProcess() {
  const steps = [
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: "Bezpłatna konsultacja (20 min)",
      description: "Poznajemy się, omawiamy cele i wymagania"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Wycena i harmonogram (24h)",
      description: "Dostajesz szczegółowy kosztorys i harmonogram"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Projekt i akceptacja (3-5 dni)",
      description: "Pracuję nad designem, pokazuję Ci wersje do akceptacji"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Wdrożenie i testy (1 dzień)",
      description: "Kodowanie, testy, optymalizacja szybkości"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "Wsparcie po wdrożeniu (30 dni)",
      description: "30 dni na drobne poprawki bez dodatkowych kosztów"
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-16 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden" id="collaboration">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-50/50 via-white to-white dark:from-rose-900/10 dark:via-slate-900 dark:to-slate-900 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            Proces
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
          >
            Jak Wygląda <span className="font-bold text-gradient">Współpraca</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Krok po kroku do Twojego nowego Landing Page'a
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-slate-200 via-rose-200 to-slate-200 dark:from-slate-800 dark:via-rose-500/30 dark:to-slate-800 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-8 group ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="bg-white/80 dark:bg-slate-800/30 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 p-8 sm:p-10 rounded-[2.5rem] hover:border-rose-200 dark:hover:border-rose-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 dark:hover:shadow-rose-500/20 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-20 text-rose-500">
                      {step.icon}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6 md:hidden relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-500/20 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                    </div>
                    <h3 className="hidden md:block text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4 relative z-10">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed relative z-10">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 items-center justify-center z-10 group-hover:border-rose-200 dark:group-hover:border-rose-500/50 group-hover:text-rose-500 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                  {step.icon}
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
