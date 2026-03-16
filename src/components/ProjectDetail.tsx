import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, getDocs, collection, query, where, limit, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Layout, Smartphone, ShoppingCart, Loader2, ExternalLink, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SEO } from "./SEO";
import { ImageWithBlur } from "./ImageWithBlur";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsOfService } from "./TermsOfService";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  link: string;
  caseStudyLink?: string;
  tags?: string[];
  createdAt: Timestamp;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "portfolioItems", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const projectData = { id: docSnap.id, ...docSnap.data() } as Project;
          setProject(projectData);
          
          // Fetch related projects
          const q = query(
            collection(db, "portfolioItems"),
            where("category", "==", projectData.category),
            limit(4)
          );
          const querySnapshot = await getDocs(q);
          const related = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Project))
            .filter(p => p.id !== id)
            .slice(0, 3);
          setRelatedProjects(related);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
      <SEO 
        title={project.title} 
        description={project.description} 
        image={project.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
          "image": project.image,
          "genre": project.category,
          "author": {
            "@type": "Person",
            "name": "Katarzyna Gierałt"
          }
        }}
      />
      <Header onOpenCalendly={() => {}} />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors mb-6 group font-medium"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Powrót do strony głównej
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold mb-6 uppercase tracking-widest shadow-sm">
                {project.category}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-display font-bold mb-8 leading-tight text-slate-900 dark:text-white">
                {project.title}
              </h1>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-sm font-medium shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <Calendar className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Data</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{project.createdAt?.toDate().toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    {project.category === "SaaS" && <Layout className="h-5 w-5 text-rose-500" />}
                    {project.category === "FinTech" && <Smartphone className="h-5 w-5 text-rose-500" />}
                    {project.category === "eCommerce" && <ShoppingCart className="h-5 w-5 text-rose-500" />}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Kategoria</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{project.category}</div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-12 font-light leading-relaxed">
                <p className="text-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed mb-8">{project.description}</p>
                <p>
                  Projekt ten wymagał głębokiej analizy potrzeb użytkowników oraz optymalizacji procesów biznesowych. 
                  Głównym celem było stworzenie intuicyjnego interfejsu, który nie tylko wygląda nowocześnie, 
                  ale przede wszystkim realizuje cele biznesowe klienta.
                </p>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-10 mb-4">Wyzwanie</h3>
                <p>
                  Głównym wyzwaniem było uproszczenie skomplikowanych operacji i przedstawienie ich w sposób przystępny dla użytkownika końcowego, 
                  przy zachowaniu pełnej funkcjonalności systemu.
                </p>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-10 mb-4">Rozwiązanie</h3>
                <p>
                  Zastosowano podejście User-Centered Design, przeprowadzając liczne testy użyteczności i iteracje projektowe. 
                  Efektem jest spójny system wizualny i logiczny, który znacząco poprawił wskaźniki konwersji i satysfakcji użytkowników.
                </p>
              </div>

              {project.link && project.link !== "#" && (
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5"
                  >
                    Zobacz projekt na żywo <ExternalLink className="h-5 w-5" />
                  </a>
                  {project.caseStudyLink && (
                    <a 
                      href={project.caseStudyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
                    >
                      Case Study <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group lg:sticky lg:top-32"
            >
              <div className="absolute -inset-4 bg-rose-500/10 rounded-[3rem] blur-3xl group-hover:bg-rose-500/20 transition-all duration-700 opacity-50 dark:opacity-100" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 p-2">
                <ImageWithBlur 
                  src={project.image} 
                  alt={project.title} 
                  aspectRatio="aspect-auto"
                  className="rounded-[2rem] w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>

          {project.beforeAfter && project.beforeAfter.before && project.beforeAfter.after && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-slate-900 dark:text-white">Przed i Po</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 p-2">
                  <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Przed
                  </div>
                  <ImageWithBlur 
                    src={project.beforeAfter.before} 
                    alt={`${project.title} przed`} 
                    aspectRatio="aspect-video"
                    className="rounded-3xl"
                  />
                </div>
                <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 p-2">
                  <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-rose-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Po
                  </div>
                  <ImageWithBlur 
                    src={project.beforeAfter.after} 
                    alt={`${project.title} po`} 
                    aspectRatio="aspect-video"
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-slate-900 dark:text-white">Galeria projektu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 p-2 transition-all duration-300"
                  >
                    <ImageWithBlur 
                      src={img} 
                      alt={`${project.title} gallery ${index + 1}`} 
                      aspectRatio="aspect-video"
                      className="rounded-3xl"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {relatedProjects.length > 0 && (
            <div className="mt-40 border-t border-slate-200 dark:border-slate-800 pt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900 dark:text-white">Podobne Projekty</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-lg">Inne realizacje z kategorii <span className="font-semibold text-rose-500">{project.category}</span></p>
                </div>
                <Link to="/" className="text-rose-500 hover:text-rose-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2 group transition-colors">
                  Zobacz wszystkie <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((rp) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link to={`/portfolio/${rp.id}`} className="block">
                      <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 mb-6 shadow-md group-hover:shadow-xl transition-all duration-500 p-2 bg-white dark:bg-slate-900">
                        <ImageWithBlur src={rp.image} alt={rp.title} className="rounded-3xl group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                      </div>
                      <div className="px-2">
                        <div className="text-xs text-rose-500 font-bold mb-2 uppercase tracking-wider">{rp.category}</div>
                        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">{rp.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer onOpenPrivacy={() => setShowPrivacy(true)} onOpenTerms={() => setShowTerms(true)} />
      
      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <PrivacyPolicy isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        )}
        {showTerms && (
          <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
