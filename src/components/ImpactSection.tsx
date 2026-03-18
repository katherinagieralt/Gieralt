import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Figma, Code2, Bot, Layers, Zap, Database, Palette, Slack, Github, Trello, MessageSquare, Eye, LayoutGrid, Plug } from "lucide-react";

const tools = [
  { name: "Figma", icon: Figma, color: "text-purple-500" },
  { name: "Framer", icon: Layers, color: "text-blue-400" },
  { name: "Adobe Suite", icon: Palette, color: "text-red-500" },
  { name: "Gemini AI", icon: Bot, color: "text-blue-600" },
  { name: "Midjourney", icon: Zap, color: "text-amber-500" },
  { name: "React", icon: Code2, color: "text-cyan-400" },
  { name: "Tailwind CSS", icon: Database, color: "text-sky-500" },
  { name: "Vite", icon: Zap, color: "text-yellow-500" },
];

export function ImpactSection() {
  const { i18n } = useTranslation();

  const stats = [
    { number: "WCAG 2.1", label: i18n.language === 'pl' ? "Standard dostępności" : "Accessibility Standard", icon: Eye },
    { number: "Rapid", label: i18n.language === 'pl' ? "Prototyping & Iteracje" : "Prototyping & Iterations", icon: Zap },
    { number: "Pixel", label: i18n.language === 'pl' ? "Perfect Quality" : "Perfect Quality", icon: LayoutGrid },
    { number: "Zero", label: i18n.language === 'pl' ? "Handoff Friction" : "Handoff Friction", icon: Plug }
  ];

  return (
    <section className="transition-colors duration-500 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-rose-500/[0.02] dark:bg-rose-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust & Stats Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
            >
              {i18n.language === 'pl' ? 'Strategia & Zaufanie' : 'Strategy & Trust'}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8"
            >
              {i18n.language === 'pl' ? (
                <>Projektuję <span className="font-bold text-gradient">ścieżki konwersji</span>, które Twoi klienci pokochają. Wdrożenie No-Code (Framer/Webflow) i Design Systems.</>
              ) : (
                <>I design <span className="font-bold text-gradient">conversion paths</span> that your clients will love. No-Code Implementation (Framer/Webflow) and Design Systems.</>
              )}
            </motion.h2>

            {/* Trust Bar / Workflow */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-8 opacity-60 transition-all duration-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block w-full mb-2">
                {i18n.language === 'pl' ? 'Workflow dostosowany do:' : 'Workflow tailored for:'}
              </span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <Slack className="h-4 w-4" /> SLACK
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                  <Figma className="h-4 w-4" /> FIGMA
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                  <Github className="h-4 w-4" /> GITHUB
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                  <MessageSquare className="h-4 w-4" /> NOTION
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                  <Trello className="h-4 w-4" /> JIRA
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full lg:w-auto">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative group flex flex-col p-6 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/5"
              >
                {/* Subtle gradient border overlay */}
                <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-display font-thin text-zinc-900 dark:text-white tracking-tighter">
                    {stat.number}
                  </span>
                  <stat.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 stroke-[1.2px]" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-300 uppercase tracking-widest leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scrolling Tech Stack */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />
          
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex gap-12 py-8 pr-12 w-max"
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {[...tools, ...tools, ...tools].map((tool, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 px-8 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:border-rose-500/30 transition-all duration-500 group/item shrink-0"
                >
                  <tool.icon className={`h-6 w-6 ${tool.color} opacity-70 group-hover/item:opacity-100 transition-opacity`} />
                  <span className="text-zinc-600 dark:text-zinc-300 font-display font-light text-lg tracking-wide">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


