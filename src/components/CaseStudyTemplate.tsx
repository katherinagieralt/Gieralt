import React from 'react';
import { motion } from 'motion/react';
import { ImageWithBlur } from './ImageWithBlur';

interface CaseStudyProps {
  title: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
}

export const CaseStudyTemplate: React.FC<CaseStudyProps> = ({ title, challenge, solution, results, image }) => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
      >
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <ImageWithBlur src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-500 text-xs font-bold mb-4 uppercase tracking-widest backdrop-blur-md">
              Case Study
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight">{title}</h1>
          </div>
        </div>
        
        <div className="p-8 sm:p-12 md:p-16 space-y-16">
          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-lg">1</span>
              Wyzwanie
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 font-light leading-relaxed pl-14">{challenge}</p>
          </section>
          
          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-lg">2</span>
              Rozwiązanie
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed pl-14">{solution}</p>
          </section>
          
          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-lg">3</span>
              Wyniki
            </h2>
            <div className="pl-14">
              <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 rounded-3xl p-8">
                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{results}</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
