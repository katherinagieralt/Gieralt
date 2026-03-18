import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, MessageSquare, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageWithBlur } from './ImageWithBlur';
import { useAbout } from '../hooks/usePayload';

export const About = () => {
  const { t } = useTranslation();
  const { data: about } = useAbout();

  // Fallback data if CMS is empty or errors
  const fallbackAbout = {
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000&fm=webp",
    stats: [
      { label: t('about.stats.experience'), value: '10+' },
      { label: t('about.stats.projects'), value: '150+' },
      { label: t('about.stats.clients'), value: '98%' }
    ]
  };

  const displayAbout = about || fallbackAbout;
  const profileImageUrl = typeof displayAbout.profileImage === 'string' ? displayAbout.profileImage : displayAbout.profileImage?.url;

  return (
    <section className="relative overflow-hidden transition-colors duration-300" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-5 relative group"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl shadow-rose-500/10 dark:shadow-none">
              <ImageWithBlur 
                src={profileImageUrl || fallbackAbout.profileImage} 
                alt="Katarzyna Gierałt" 
                aspectRatio="aspect-[4/5]"
                width="800"
                height="1000"
                loading="eager"
                className="grayscale group-hover:grayscale-0 transition-all duration-700 object-cover w-full h-full scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-rose-200 dark:border-rose-500/20 rounded-[2.5rem] z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-blue-200 dark:border-blue-500/20 rounded-[2.5rem] z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              {t('about.badge')}
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8">
              {t('about.title.line1')} <span className="font-bold text-gradient">{t('about.title.highlight')}</span>
            </h2>
            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed mb-8 font-light">
              <div className="prose dark:prose-invert">
                {about?.biography || t('about.fallbackBio')}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12 border-t border-zinc-200 dark:border-zinc-800/50 pt-6">
              {displayAbout.stats?.map((stat: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 + (index * 0.1) }}
                >
                  <div className="text-5xl font-display font-light text-zinc-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://katarzynagieralt.pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
