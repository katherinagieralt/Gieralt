import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faq.faqs.q1.question'),
      answer: t('faq.faqs.q1.answer'),
    },
    {
      question: t('faq.faqs.q2.question'),
      answer: t('faq.faqs.q2.answer'),
    },
    {
      question: t('faq.faqs.q3.question'),
      answer: t('faq.faqs.q3.answer'),
    },
    {
      question: t('faq.faqs.q4.question'),
      answer: t('faq.faqs.q4.answer'),
    },
    {
      question: t('faq.faqs.q5.question'),
      answer: t('faq.faqs.q5.answer'),
    },
  ];

  return (
    <section className="transition-colors duration-500 relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Editorial Header */}
          <div className="lg:col-span-5 flex flex-col items-start">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-sm"
             >
               <span>{t('faq.badge')}</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8"
             >
               {t('faq.title.line1')} <span className="font-bold text-gradient italic">{t('faq.title.highlight')}</span>
             </motion.h2>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12 max-w-md"
             >
               {t('faq.subtext')}
             </motion.p>

             <motion.a 
               href="#contact"
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="group flex items-center gap-4 text-zinc-950 dark:text-white font-bold group"
             >
                <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-500">
                   <ArrowRight className="h-5 w-5 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm uppercase tracking-widest">{t('faq.askQuestion')}</span>
             </motion.a>
          </div>

          {/* Right Column: Minimalist Architect Accordion */}
          <div className="lg:col-span-7">
             <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 border-t border-zinc-100 dark:border-zinc-800/60">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="py-2">
                       <button
                         onClick={() => setOpenIndex(isOpen ? null : index)}
                         className="w-full flex items-center justify-between text-left py-8 group transition-all"
                       >
                          <span className={`text-xl font-display font-medium transition-colors duration-300 ${
                            isOpen ? "text-rose-500" : "text-zinc-900 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                          }`}>
                            {faq.question}
                          </span>
                          <div className={`shrink-0 h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                            isOpen ? "bg-rose-500 border-rose-500 text-white rotate-180" : "border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:border-rose-500/50"
                          }`}>
                             {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4 group-hover:text-rose-500" />}
                          </div>
                       </button>

                       <AnimatePresence>
                         {isOpen && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                             className="overflow-hidden"
                           >
                              <div className="pb-10 text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                                 {faq.answer}
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  );
                })}
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};
