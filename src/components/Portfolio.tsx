import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Layout, Smartphone, ShoppingCart, Loader2 } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, Timestamp, limit } from "firebase/firestore";
import { useAnalytics } from "./AnalyticsProvider";
import { ImageWithBlur } from "./ImageWithBlur";

type Category = "Wszystkie" | "SaaS" | "FinTech" | "eCommerce" | "AI Tools" | "Mobile App";

interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  imageAlt?: string;
  link: string;
  tags?: string[];
  createdAt: Timestamp;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface ProjectCardProps {
  project: Project;
  trackEvent: any;
  key?: string | number;
}

function ProjectCard({ project, trackEvent }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={project.image} 
          alt={project.imageAlt || project.title}
          loading="lazy"
          decoding="async"
          width="800"
          height="500"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 flex gap-2">
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
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <Link 
            to={`/portfolio/${project.id}`}
            onClick={() => trackEvent('view_project_details', { id: project.id })}
            className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 group/link"
          >
            Zobacz Case Study
            <ArrowUpRight className="h-4 w-4 text-rose-500 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </Link>
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('view_live_demo', { id: project.id })}
            className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-2xl transition-all"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Category>("Wszystkie");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "portfolioItems"), orderBy("createdAt", "desc"), limit(12));
        const querySnapshot = await getDocs(q);
        
        let fetchedProjects: Project[] = [];

        if (querySnapshot.empty) {
          // Fallback static data if database is empty
          fetchedProjects = [
            {
              id: "1",
              title: "FinFlow Dashboard",
              category: "FinTech",
              description: "Redesign panelu klienta dla bankowości mobilnej. Wzrost retencji o 15%.",
              image: "https://picsum.photos/seed/fintech/800/600",
              link: "#",
              tags: ["Dashboard", "Mobile", "Banking"],
              createdAt: Timestamp.now(),
              beforeAfter: {
                before: "Skomplikowany proces logowania, wysoki churn rate",
                after: "Uproszczony UX, wzrost retencji o 15%, ocena 4.8 w App Store"
              }
            },
            {
              id: "2",
              title: "SaaS Analytics",
              category: "SaaS",
              description: "Platforma analityczna B2B. Uproszczenie onboardingu skróciło czas aktywacji o 40%.",
              image: "https://picsum.photos/seed/saas/800/600",
              link: "#",
              tags: ["Analytics", "B2B", "Onboarding"],
              createdAt: Timestamp.now(),
              beforeAfter: {
                before: "Onboarding trwający 15 minut, 60% porzuceń",
                after: "Onboarding skrócony do 4 minut, wzrost aktywacji o 40%"
              }
            },
            {
              id: "3",
              title: "Sklep Premium",
              category: "eCommerce",
              description: "Redesign checkoutu dla marki odzieżowej. Redukcja porzuceń koszyka o 35%.",
              image: "https://picsum.photos/seed/ecommerce/800/600",
              link: "#",
              tags: ["SHOPIFY", "KONWERSJA", "RWD"],
              createdAt: Timestamp.now(),
              beforeAfter: {
                before: "Zbyt długi checkout, brak optymalizacji mobile",
                after: "Redukcja porzuceń koszyka o 35%, wzrost sprzedaży mobile o 50%"
              }
            },
            {
              id: "4",
              title: "AI Content Tool",
              category: "AI Tools",
              description: "Narzędzie do generowania treści marketingowych z wykorzystaniem LLM.",
              image: "https://picsum.photos/seed/aitool/800/600",
              link: "#",
              tags: ["AI", "LLM", "SaaS"],
              createdAt: Timestamp.now(),
              beforeAfter: {
                before: "Brak spójnego UI, trudna nawigacja",
                after: "Intuicyjny edytor, 10k aktywnych użytkowników w 2 miesiące"
              }
            }
          ];
        } else {
          fetchedProjects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Project[];
        }
        
        setProjects(fetchedProjects);

      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === "Wszystkie" || project.category === filter
  );

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" id="portfolio">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            Case Studies
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            Wybrane <span className="font-bold text-gradient">Realizacje</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Projekty, które przyniosły realne wyniki biznesowe.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-10 flex-wrap"
        >
          {(["Wszystkie", "SaaS", "FinTech", "eCommerce", "AI Tools", "Mobile App"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                filter === cat
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                trackEvent={trackEvent} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
