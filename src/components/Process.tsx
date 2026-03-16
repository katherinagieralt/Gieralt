import { motion } from "motion/react";
import { FileText, Layout, Code, Rocket, Palette } from "lucide-react";

const steps = [
  {
    stage: "Etap 1",
    title: "Warsztat i Strategia",
    desc: "Nie rysuję bez planu. Zaczynamy od głębokiego zrozumienia Twojego biznesu i celów.",
    deliverable: "Strategia Konwersji",
    icon: FileText,
    theme: {
      bg: "bg-blue-600",
      text: "text-blue-700 dark:text-blue-300",
      lightBg: "bg-blue-100/50 dark:bg-blue-500/20",
      hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-500/30",
      groupHoverText: "group-hover:text-blue-800 dark:group-hover:text-blue-200",
      shadow: "hover:shadow-blue-500/20",
    },
  },
  {
    stage: "Etap 2",
    title: "Architektura i Copywriting",
    desc: "Słowa sprzedają, design oprawia. Tworzymy strukturę, która prowadzi klienta za rękę do zakupu.",
    deliverable: "Makieta i Treści",
    icon: Layout,
    theme: {
      bg: "bg-purple-600",
      text: "text-purple-700 dark:text-purple-300",
      lightBg: "bg-purple-100/50 dark:bg-purple-500/20",
      hoverBg: "group-hover:bg-purple-100 dark:group-hover:bg-purple-500/30",
      groupHoverText: "group-hover:text-purple-800 dark:group-hover:text-purple-200",
      shadow: "hover:shadow-purple-500/20",
    },
  },
  {
    stage: "Etap 3",
    title: "Visual Design",
    desc: "Pixel-perfect UI. Projektuję interfejsy, które budują zaufanie i pozycjonują Cię jako lidera.",
    deliverable: "Projekt Graficzny",
    icon: Palette,
    theme: {
      bg: "bg-rose-600",
      text: "text-rose-700 dark:text-rose-300",
      lightBg: "bg-rose-100/50 dark:bg-rose-500/20",
      hoverBg: "group-hover:bg-rose-100 dark:group-hover:bg-rose-500/30",
      groupHoverText: "group-hover:text-rose-800 dark:group-hover:text-rose-200",
      shadow: "hover:shadow-rose-500/20",
    },
  },
  {
    stage: "Etap 4",
    title: "Wdrożenie No-Code",
    desc: "Dostajesz gotowy, błyskawicznie działający produkt (Framer/Webflow), a nie tylko ładne obrazki.",
    deliverable: "Działająca Strona",
    icon: Code,
    theme: {
      bg: "bg-amber-600",
      text: "text-amber-800 dark:text-amber-300",
      lightBg: "bg-amber-100/50 dark:bg-amber-500/20",
      hoverBg: "group-hover:bg-amber-100 dark:group-hover:bg-amber-500/30",
      groupHoverText: "group-hover:text-amber-900 dark:group-hover:text-amber-200",
      shadow: "hover:shadow-amber-500/20",
    },
  },
  {
    stage: "Etap 5",
    title: "Optymalizacja",
    desc: "Uczę Cię, jak obsługiwać Twoją nową maszynę do zarabiania i wyciskać z niej maksimum.",
    deliverable: "Szkolenie i Przekazanie",
    icon: Rocket,
    theme: {
      bg: "bg-emerald-600",
      text: "text-emerald-700 dark:text-emerald-300",
      lightBg: "bg-emerald-100/50 dark:bg-emerald-500/20",
      hoverBg: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/30",
      groupHoverText: "group-hover:text-emerald-800 dark:group-hover:text-emerald-200",
      shadow: "hover:shadow-emerald-500/20",
    },
  },
];

export function Process() {
  return (
    <section className="bg-white dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="process">
      {/* Premium Background Effects */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            Proces
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            Twój projekt w 5 kluczowych etapach. <br />
            <span className="font-bold text-gradient">Metoda Design Sprint.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Zamiast niekończących się poprawek – konkretny plan. Wiesz dokładnie, co otrzymasz na każdym etapie współpracy.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Steps Container */}
          <div className="flex overflow-x-auto md:overflow-visible md:flex-col gap-6 md:gap-16 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className={`relative flex-none w-[85vw] sm:w-[320px] md:w-auto md:flex items-center md:justify-between snap-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon Marker (Desktop only) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-50 dark:border-slate-900 shadow-sm z-10 transition-transform duration-500 hover:scale-110">
                  <div className={`w-4 h-4 rounded-full ${step.theme.bg} shadow-lg`} />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] p-8 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 rounded-3xl hover:shadow-2xl ${step.theme.shadow} md:hover:-translate-y-2 transition-all duration-500 group backdrop-blur-sm h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${step.theme.text} ${step.theme.lightBg}`}>
                      {step.stage}
                    </span>
                    <div className={`w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${step.theme.hoverBg} transition-colors duration-300`}>
                      <step.icon className={`h-5 w-5 text-slate-400 ${step.theme.groupHoverText} transition-colors`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-light leading-relaxed mb-6 flex-grow">{step.desc}</p>
                  <div className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-wider ${step.theme.text} ${step.theme.lightBg} px-4 py-3 rounded-xl w-fit ${step.theme.hoverBg} transition-colors duration-300 mt-auto`}>
                    <step.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">Deliverable: {step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
