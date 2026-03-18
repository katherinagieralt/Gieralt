import React from "react";
import { motion } from "motion/react";
import { BrainCircuit, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AIHuman = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden transition-colors duration-300">
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
            {t('offer.aiModel.badge')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8"
          >
            {t('offer.aiModel.title.line1')}{' '}
            <span className="font-bold text-gradient">{t('offer.aiModel.title.highlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {t('offer.aiModel.subtext')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Part */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white/80 dark:bg-zinc-900/40 rounded-3xl p-8 border border-zinc-200/80 dark:border-zinc-800/50 shadow-xl dark:shadow-2xl backdrop-blur-md hover:-translate-y-2 hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-500 group"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-display font-medium text-zinc-900 dark:text-white mb-1">{t('offer.aiModel.ai.title')}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 uppercase tracking-wider font-bold">
                  {t('offer.aiModel.ai.subtitle')}
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-300 font-light">
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                {t('offer.aiModel.ai.feat1')}
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-75" />
                {t('offer.aiModel.ai.feat2')}
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-150" />
                {t('offer.aiModel.ai.feat3')}
              </li>
            </ul>
          </motion.div>

          {/* Human Part */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="bg-zinc-900 dark:bg-zinc-900/80 rounded-3xl p-10 border border-zinc-800 dark:border-zinc-800/50 shadow-xl dark:shadow-2xl backdrop-blur-md relative overflow-hidden hover:-translate-y-2 hover:shadow-rose-500/10 hover:border-rose-500/30 transition-all duration-500 group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <UserCheck className="h-40 w-40 text-white" />
            </div>
            
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-white mb-1">{t('offer.aiModel.human.title')}</h3>
                <p className="text-sm text-zinc-400 uppercase tracking-wider font-bold">
                  {t('offer.aiModel.human.subtitle')}
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-zinc-300 font-light relative z-10">
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                {t('offer.aiModel.human.feat1')}
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-75" />
                {t('offer.aiModel.human.feat2')}
              </li>
              <li className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-150 transition-transform duration-300 delay-150" />
                {t('offer.aiModel.human.feat3')}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Visual Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800/50 rounded-full overflow-hidden flex shadow-inner border border-zinc-300/20 dark:border-zinc-700/30">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
              className="bg-blue-500 h-full relative group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }}
              className="bg-rose-500 dark:bg-rose-600 h-full relative group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            >
              {t('offer.aiModel.progress.ai')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
            >
              {t('offer.aiModel.progress.human')}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


