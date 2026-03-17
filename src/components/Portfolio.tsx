import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithBlur } from "./ImageWithBlur";

type Category = "Wszystkie" | "SaaS" | "FinTech" | "eCommerce" | "AI Tools" | "Mobile App";
type CategoryEN = "All" | "SaaS" | "FinTech" | "eCommerce" | "AI Tools" | "Mobile App";

// Mocking static data to replace Firebase
const staticProjects = [
  {
    id: "1",
    title: "Nexus AI Core",
    category: "AI Tools",
    description: "Kompleksowy Design System i ekosystem platformy dla innowacyjnego rozwiązania sztucznej inteligencji.",
    descriptionEn: "Comprehensive Design System and platform ecosystem for an innovative artificial intelligence solution.",
    image: "https://images.unsplash.com/photo-1574677244910-c2a41d771b3e?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    tags: ["ECOSYSTEM", "DESIGN SYSTEM"]
  },
  {
    id: "2",
    title: "FinFlow App",
    category: "FinTech",
    description: "Aplikacja mobilna do zarządzania finansami osobistymi z wbudowanym asystentem AI.",
    descriptionEn: "Mobile app for personal finance management with a built-in AI assistant.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    link: "#",
    tags: ["MOBILE", "UX/UI"]
  },
  {
    id: "3",
    title: "CloudSync Pro",
    category: "SaaS",
    description: "Platforma SaaS do synchronizacji plików w chmurze dla dużych zespołów rozproszonych.",
    descriptionEn: "SaaS platform for cloud file synchronization for large distributed teams.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: "#",
    tags: ["WEB APP", "DASHBOARD"]
  },
  {
    id: "4",
    title: "EcoStore Platform",
    category: "eCommerce",
    description: "Nowoczesna platforma sklepowa dla globalnej marki ekologicznych produktów.",
    descriptionEn: "Modern e-commerce platform for a global organic products brand.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1528&auto=format&fit=crop",
    link: "#",
    tags: ["ECOMMERCE", "SYSTEM"]
  }
];

export const Portfolio = () => {
  const { i18n } = useTranslation();
  const [filter, setFilter] = useState<Category>("Wszystkie");

  const categoriesPL: Category[] = ["Wszystkie", "SaaS", "FinTech", "eCommerce", "AI Tools", "Mobile App"];
  const categoriesEN: CategoryEN[] = ["All", "SaaS", "FinTech", "eCommerce", "AI Tools", "Mobile App"];

  const currentCategories = i18n.language === 'pl' ? categoriesPL : categoriesEN;

  // We map the English "All" filter to "Wszystkie" for filtering logic
  const activeFilterValue = filter === "All" as unknown as Category ? "Wszystkie" : filter;

  const filteredProjects = staticProjects.filter(
    (project) => activeFilterValue === "Wszystkie" || project.category === activeFilterValue
  );

  return (
    <section className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" id="portfolio">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            {i18n.language === 'pl' ? 'Wyróżnione Prace' : 'Featured Work'}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight relative"
          >
            {i18n.language === 'pl' ? (
              <>Zobasz, jak projektuję <br />
              <span className="font-bold text-gradient">Design Systems</span> dla liderów branży.</>
            ) : (
              <>See how I design <br />
              <span className="font-bold text-gradient">Design Systems</span> for industry leaders.</>
            )}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {i18n.language === 'pl' 
              ? "Projekty, które przyniosły realne wyniki biznesowe."
              : "Projects that brought real business results."}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {currentCategories.map((cat, index) => {
            const catValue = (i18n.language === 'pl' ? cat : categoriesPL[index]) as Category;
            const isSelected = activeFilterValue === catValue;
            
            return (
              <button
                key={cat}
                onClick={() => setFilter(catValue)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ImageWithBlur 
                    src={project.image} 
                    alt={project.title}
                    aspectRatio="aspect-[16/10]"
                    width="800"
                    height="500"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 flex gap-2 z-10">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tag.trim()}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-rose-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 font-light text-sm line-clamp-2 mb-8 leading-relaxed">
                    {i18n.language === 'pl' ? project.description : project.descriptionEn}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a 
                      href={project.link}
                      className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 group/link"
                    >
                      {i18n.language === 'pl' ? 'Zobacz Case Study' : 'View Case Study'}
                      <ArrowUpRight className="h-4 w-4 text-rose-500 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-2xl transition-all"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
