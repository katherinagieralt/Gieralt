import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTestimonials } from "../hooks/usePayload";
import { ImageWithBlur } from "./ImageWithBlur";

export const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials } = useTestimonials();

  const fallbackTestimonials = [
    {
      id: 'f1',
      name: 'Marek Jankowski',
      role: 'CEO, TechFlow',
      content: t('testimonials.fallback.f1.content'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150&fm=webp',
    },
    {
      id: 'f2',
      name: 'Aleksandra Nowak',
      role: 'Head of Marketing, Lumino',
      content: t('testimonials.fallback.f2.content'),
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150&fm=webp',
    },
    {
      id: 'f3',
      name: 'Piotr Wiśniewski',
      role: 'Founder, Nexus Digital',
      content: t('testimonials.fallback.f3.content'),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150&fm=webp',
    }
  ];

  const list = (testimonials && testimonials.length > 0) ? testimonials : fallbackTestimonials;
  const current = list[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % list.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);

  return (
    <section className="text-zinc-900 dark:text-white relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Editorial Label */}
        <div className="flex flex-col items-center mb-24">
           <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 uppercase tracking-[0.3em] font-bold text-[10px] mb-10 shadow-sm"
          >
            <span>{t('testimonials.badge')}</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter text-center mb-6">
             {t('testimonials.title')}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
           <Quote className="absolute -top-12 -left-12 h-24 w-24 text-white/5 hidden lg:block" />
           
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIndex}
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.05, y: -10 }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
             >
                {/* Visual Image / Avatar area */}
                <div className="lg:col-span-4 flex justify-center">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-white/10 relative z-10 shadow-2xl">
                         <ImageWithBlur 
                           src={(typeof current.avatar === 'string' ? current.avatar : (current.avatar as any)?.url) || `https://ui-avatars.com/api/?name=${current.name}&background=random`} 
                           alt={current.name}
                           aspectRatio="aspect-square"
                           width="256"
                           height="256"
                           className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                         />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl z-20 flex items-center justify-center p-4">
                         <Quote className="text-rose-500 w-full h-full fill-rose-500/20" />
                      </div>
                   </div>
                </div>

                {/* Content area */}
                <div className="lg:col-span-8">
                   <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-light leading-snug text-zinc-800 dark:text-zinc-100 italic mb-10">
                      „{current.content}”
                   </p>
                   
                   <div className="flex items-center gap-6">
                      <div className="h-px w-12 bg-rose-500" />
                      <div>
                         <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{current.name}</h4>
                         <p className="text-sm font-bold text-rose-500 uppercase tracking-widest">{current.role}</p>
                      </div>
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>

           {/* Navigation Editorial controls */}
           <div className="flex items-center justify-between mt-24 pt-12 border-t border-white/5 px-4 lg:px-0">
              <div className="flex items-center gap-6">
                 <span className="font-mono text-xs font-bold tracking-[0.3em] text-zinc-500">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                 </span>
                 <div className="w-32 h-px bg-zinc-800 relative overflow-hidden rounded-full">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-rose-500 rounded-full"
                      animate={{ width: `${((currentIndex + 1) / list.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    />
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                   onClick={prev}
                   className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 hover:border-rose-500 transition-all duration-500 group"
                 >
                    <ArrowLeft className="h-5 w-5 text-zinc-500 group-hover:text-rose-500 transition-colors" />
                 </button>
                 <button 
                   onClick={next}
                   className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 hover:border-rose-500 transition-all duration-500 group"
                 >
                    <ArrowRight className="h-5 w-5 text-zinc-500 group-hover:text-rose-500 transition-colors" />
                 </button>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};
