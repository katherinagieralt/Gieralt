import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithBlur } from "./ImageWithBlur";
import { useProjects } from "../hooks/usePayload";

type Category = "Wszystkie" | "Landing Page" | "Portal Biznesowy" | "E-commerce";

const ProjectCard = ({ project }: { project: any }) => {
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const imageUrl = typeof project.image === 'string' ? project.image : project.image?.url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      whileHover={{ y: -10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="project-card glass-card p-0 group"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <ImageWithBlur 
            src={imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&fm=webp'} 
            alt={project.title}
            aspectRatio="aspect-[16/10]"
            width="800"
            height="500"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-6 left-6 flex gap-2 z-10">
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((item: any, i: number) => (
              <span key={i} className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.tag?.trim()}</span>
            ))}
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-rose-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 font-light text-sm line-clamp-2 mb-8 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800 pointer-events-auto">
            <a 
              href={project.link || '#'}
              className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 group/link after:absolute after:inset-0 after:z-10"
            >
              {t('portfolio.viewCaseStudy')}
              <ArrowUpRight className="h-4 w-4 text-rose-500 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </a>
            <a 
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 bg-zinc-50 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white rounded-2xl transition-all z-20"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export const Portfolio = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category>("Wszystkie");
  const { data: projects } = useProjects();

  const fallbackProjects = [
    {
      id: 'fallback-1',
      title: 'Aura Luxury Landing',
      category: 'Landing Page',
      description: t('portfolio.fallback.landing.desc', 'Konwersyjna strona typu landing page dla marki biżuterii premium.'),
      tags: [{ tag: 'Framer Motion' }, { tag: 'Conversion' }, { tag: 'UI/UX' }]
    },
    {
      id: 'fallback-2',
      title: 'Nexus Business Portal',
      category: 'Portal Biznesowy',
      description: t('portfolio.fallback.portal.desc', 'Rozbudowany portal korporacyjny z systemem zarządzania treścią Payload CMS.'),
      tags: [{ tag: 'Payload CMS' }, { tag: 'TypeScript' }, { tag: 'Multi-page' }]
    },
    {
      id: 'fallback-3',
      title: 'Veloce E-shop',
      category: 'E-commerce',
      description: t('portfolio.fallback.shop.desc', 'Nowoczesny sklep internetowy z pełną integracją płatności i logiką koszyka.'),
      tags: [{ tag: 'E-commerce' }, { tag: 'Stripe' }, { tag: 'Next.js' }]
    }
  ];

  const categories = [
    { key: "Wszystkie", label: t('portfolio.filters.all') },
    { key: "Landing Page", label: t('portfolio.filters.landing') },
    { key: "Portal Biznesowy", label: t('portfolio.filters.business') },
    { key: "E-commerce", label: t('portfolio.filters.ecommerce') }
  ];

  const displayProjects = (projects && projects.length > 0) ? projects : fallbackProjects;

  const filteredProjects = displayProjects.filter(
    (project: any) => filter === "Wszystkie" || project.category === filter
  );

  return (
    <section className="transition-colors duration-500 relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-sm"
          >
            <span>{t('portfolio.badge')}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-10"
          >
            {t('portfolio.title.line1')} <br />
            <span className="font-bold text-gradient">{t('portfolio.title.highlight')}</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-4xl mx-auto"
          >
            {t('portfolio.subtext')}
          </motion.p>
        </div>

        {/* Minimal Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 sm:gap-6 mb-20 flex-wrap"
        >
          {categories.map((cat) => {
            const isSelected = filter === cat.key;
            
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key as Category)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 m-1.5 ${
                  isSelected
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl scale-105"
                    : "bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:text-rose-500 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        </div>
      </div>
    </section>
  );
};
