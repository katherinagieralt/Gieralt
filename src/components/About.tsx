import { motion } from "motion/react";
import { Linkedin, Twitter, Globe } from "lucide-react";
import { ImageWithBlur } from "./ImageWithBlur";

export function About() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" id="about">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-24 max-w-7xl mx-auto">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-5/12 relative group"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl shadow-rose-500/10 dark:shadow-none">
              <ImageWithBlur 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Katarzyna Gierałt" 
                aspectRatio="aspect-[4/5]"
                width="800"
                height="1000"
                className="grayscale group-hover:grayscale-0 transition-all duration-700 object-cover w-full h-full scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              O Mnie
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
              Projektuję z pasją, <span className="font-bold text-gradient">optymalizuję dzięki AI.</span>
            </h2>
            <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-8 font-light">
              <p>
                Przez 10 lat ewoluowałam od grafika do stratega UX. Nie jestem tylko wykonawcą poleceń – jestem Twoim partnerem biznesowym, który dowozi konkretne wyniki.
              </p>
              <p>
                Moją supermocą jest łączenie estetyki z matematyczną precyzją narzędzi AI. Jestem designerem nowej generacji. Nie tylko rysuję ładne obrazki, ale projektuję rozwiązania, które zarabiają.
              </p>
              <p>
                Dostarczam strony "na wczoraj", ale bez kompromisów w jakości. Szanuję Twój czas, dlatego mój proces jest szybki, decyzyjny i nastawiony na maksymalną konwersję.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12 border-t border-slate-200 dark:border-slate-800/50 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="text-5xl font-display font-light text-slate-900 dark:text-white mb-2">10+</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest font-bold">Lat w branży</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="text-5xl font-display font-light text-slate-900 dark:text-white mb-2">50+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Projektów</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-5xl font-display font-light text-slate-900 dark:text-white mb-2">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Terminowość</div>
              </motion.div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://katarzynagieralt.pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
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
}
