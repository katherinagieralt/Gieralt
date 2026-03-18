import React from "react";
import { motion } from "motion/react";
import { Figma, Code2, Bot, Layers, Zap, Database, Palette, Cpu, Globe, Rocket, ShieldCheck, Award, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const tools = [
  { name: "Figma", icon: Figma, color: "text-purple-500" },
  { name: "Framer", icon: Layers, color: "text-blue-400" },
  { name: "Adobe Suite", icon: Palette, color: "text-red-500" },
  { name: "Gemini AI", icon: Bot, color: "text-blue-600" },
  { name: "React", icon: Code2, color: "text-cyan-400" },
  { name: "Tailwind CSS", icon: Database, color: "text-sky-500" },
  { name: "Next.js", icon: Zap, color: "text-yellow-500" },
  { name: "Payload CMS", icon: Database, color: "text-zinc-400" },
];

export const ValueProp = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      label: t('valueProp.pillars.strategy.label'),
      title: t('valueProp.pillars.strategy.title'),
      desc: t('valueProp.pillars.strategy.desc'),
    },
    {
      label: t('valueProp.pillars.stack.label'),
      title: t('valueProp.pillars.stack.title'),
      desc: t('valueProp.pillars.stack.desc'),
    },
    {
      label: t('valueProp.pillars.delivering.label'),
      title: t('valueProp.pillars.delivering.title'),
      desc: t('valueProp.pillars.delivering.desc'),
    }
  ];

  return (
    <section className="transition-colors duration-500 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header - Aligned with the site's design system */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-end mb-20">
           <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 uppercase tracking-[0.3em] font-bold text-[10px] mb-8 shadow-sm"
            >
              <span>{t('valueProp.badge')}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-0"
            >
              {t('valueProp.title.line1')} <br/><span className="font-bold text-gradient italic">{t('valueProp.title.highlight')}</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right"
          >
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-6">
              {t('valueProp.subtext')}
            </p>
            <div className="h-px w-12 bg-rose-500 hidden lg:block" />
          </motion.div>
        </div>

        {/* The Three Pillars - Specialist Edge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 rounded-[3rem] hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-700 hover:-translate-y-2 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <span className="text-8xl font-display font-black text-rose-500 italic">0{i+1}</span>
              </div>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.4em] font-mono block mb-6">[{pillar.label}]</span>
              <h3 className="text-2xl font-display font-bold text-zinc-950 dark:text-white mb-4 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed relative z-10">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The Tech Stack Carousel - Horizontal Proof */}
        <div className="relative py-12 border-y border-zinc-100 dark:border-zinc-800/50 mb-20 overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 py-2 pr-16 w-max"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {[...tools, ...tools, ...tools].map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 shrink-0 px-6 py-2 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                >
                  <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  <span className="text-zinc-400 dark:text-zinc-300 font-display font-medium text-lg tracking-wide">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};
