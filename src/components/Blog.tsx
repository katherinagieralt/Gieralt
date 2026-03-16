import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, ArrowRight, Loader2, Search, Filter, Share2 } from "lucide-react";
import { db } from "../firebase";
import { collection, query, orderBy, Timestamp, limit } from "firebase/firestore";
import { ImageWithBlur } from "./ImageWithBlur";
import { SEO } from "./SEO";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: Timestamp;
  readTime: string;
  category: string;
  image: string;
  tags?: string[];
}

export function Blog() {
  const { data: articles = [], isLoading } = useFirestoreQuery<Article>(['blogPosts'], 'blogPosts', [orderBy('createdAt', 'desc'), limit(12)]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  // Fallback data for categories if articles are still loading or empty
  const allCategories = ["Wszystkie", ...new Set(articles.map(a => a.category))];
  const categories = allCategories.length > 1 ? allCategories : ["Wszystkie", "AI & Design", "Optymalizacja"]; // Example fallback categories

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Wszystkie" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" id="blog">
      {selectedArticle && (
        <SEO 
          title={selectedArticle.title}
          description={selectedArticle.excerpt}
          image={selectedArticle.image}
          ogType="article"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": selectedArticle.title,
            "image": [selectedArticle.image],
            "datePublished": selectedArticle.createdAt.toDate().toISOString(),
            "author": [{
              "@type": "Person",
              "name": "Katarzyna Gierałt",
              "url": "https://katarzynagieralt.pl"
            }]
          }}
        />
      )}
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-blue-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            Wiedza i Przemyślenia
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            Blog & <span className="font-bold text-gradient">Artykuły</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Dzielę się tym, czego nauczyłam się przez lata pracy w designie. Bez lania wody, same konkrety.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
            <input 
              type="text"
              placeholder="Szukaj artykułów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar items-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                    : "bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-rose-500/30 hover:text-rose-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-500 group cursor-pointer flex flex-col"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="h-56 overflow-hidden relative">
                  <ImageWithBlur 
                    src={article.image} 
                    alt={article.title}
                    aspectRatio="aspect-video"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-rose-500 border border-slate-200 dark:border-slate-700 shadow-sm z-10">
                    {article.category}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mb-5 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.createdAt?.toDate().toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-rose-500 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                    Czytaj dalej <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-light mb-4">Nie znaleziono artykułów pasujących do Twoich kryteriów.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("Wszystkie"); }}
              className="text-rose-500 hover:text-rose-500 font-medium transition-colors"
            >
              Wyczyść filtry
            </button>
          </motion.div>
        )}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2.5 bg-white/20 hover:bg-white/40 dark:bg-slate-900/50 dark:hover:bg-slate-800 text-white rounded-full transition-all backdrop-blur-md"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-72 sm:h-96 relative shrink-0">
                <ImageWithBlur 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-semibold tracking-wide mb-4 shadow-sm">
                    {selectedArticle.category}
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white mb-4 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {selectedArticle.createdAt?.toDate().toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
                <div 
                  className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-a:text-rose-500 dark:prose-a:text-rose-500 hover:prose-a:text-rose-500"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />

                {/* Related Articles */}
                <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-2xl font-display font-light text-slate-900 dark:text-white mb-8">Podobne artykuły</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {articles
                      .filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id)
                      .slice(0, 2)
                      .map(ra => (
                        <div 
                          key={ra.id} 
                          className="group cursor-pointer"
                          onClick={() => setSelectedArticle(ra)}
                        >
                          <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                            <ImageWithBlur src={ra.image} alt={ra.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug">{ra.title}</h4>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      Autor: Katarzyna Gierałt
                    </div>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedArticle.title,
                            text: selectedArticle.excerpt,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white rounded-full transition-colors"
                      title="Udostępnij"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-rose-500 hover:text-rose-500 font-semibold text-sm transition-colors"
                  >
                    Zamknij artykuł
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
