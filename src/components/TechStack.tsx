import { motion } from "motion/react";
import { Figma, Code2, Bot, Layers, Zap, Database, Palette, Smartphone } from "lucide-react";

const tools = [
  { name: "Figma", icon: Figma, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
  { name: "React", icon: Code2, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { name: "Gemini", icon: Bot, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { name: "Midjourney", icon: Palette, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { name: "Tailwind", icon: Layers, color: "text-cyan-500 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
  { name: "Vite", icon: Zap, color: "text-yellow-500 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  { name: "Firebase", icon: Database, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
  { name: "Mobile First", icon: Smartphone, color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-500/10" },
];

export function TechStack() {
  return (
    <div className="relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-rose-500/5 dark:bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-rose-500 uppercase tracking-[0.4em] mb-6"
        >
          Technologie, których używam
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-700 dark:text-slate-300 font-light max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Nowoczesny stack technologiczny zapewniający najwyższą wydajność, bezpieczeństwo i doskonałe doświadczenia użytkownika.
        </motion.p>
      </div>
      
      <div className="relative flex overflow-hidden group py-4">
        <motion.div
          className="flex gap-12 py-4 pr-12 w-max"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60,
          }}
        >
          {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 px-8 py-5 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-200/30 dark:border-slate-800/30 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-rose-500/20 hover:shadow-xl hover:shadow-rose-500/5 hover:-translate-y-1 transition-all duration-700 shrink-0 group/item cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.bg} transition-transform duration-700 group-hover/item:scale-110 group-hover/item:rotate-3`}>
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <span className="text-slate-600 dark:text-slate-300 font-display font-light text-lg tracking-wide">
                {tool.name}
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient masks for smooth fade */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
