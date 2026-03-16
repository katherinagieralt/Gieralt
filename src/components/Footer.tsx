import { Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "motion/react";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 py-16 transition-colors duration-300 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/5 dark:bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-2">
              Katarzyna Gierałt
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-light uppercase tracking-widest">
              UX/UI Designer <span className="text-rose-500 mx-2">•</span> AI-Powered Workflow
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#about" className="hover:text-rose-500 transition-colors">O mnie</a>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="/client" className="hover:text-rose-500 transition-colors">Strefa Klienta</a>
              <button onClick={onOpenPrivacy} className="hover:text-rose-500 transition-colors">
                Polityka Prywatności
              </button>
              <button onClick={onOpenTerms} className="hover:text-rose-500 transition-colors">
                Regulamin
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#process" className="hover:text-rose-500 transition-colors">Proces</a>
              <a href="#portfolio" className="hover:text-rose-500 transition-colors">Portfolio</a>
              <a href="#pricing" className="hover:text-rose-500 transition-colors">Cennik</a>
              <a href="#faq" className="hover:text-rose-500 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-rose-500 transition-colors">Kontakt</a>
            </div>
          </motion.nav>

          {/* Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <a href="#" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Twitter className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/50 text-center text-xs text-slate-500 dark:text-slate-400 font-light uppercase tracking-widest"
        >
          &copy; {new Date().getFullYear()} Katarzyna Gierałt. Wszelkie prawa zastrzeżone.
        </motion.div>
      </div>
    </footer>
  );
}
