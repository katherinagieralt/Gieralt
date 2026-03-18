import React from 'react';
import { motion } from "motion/react";
import { Linkedin, Dribbble, Mail, ArrowUpRight, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const BehanceIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 12.5h3c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5H6.5v9H11c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5" />
    <path d="M16 9h3.5" />
    <path d="M14.5 13c0-2.5 1.5-3.5 3.5-3.5s3.5 1 3.5 3.5-1.5 4-3.5 4-3.5-1-3.5-4z" />
    <path d="M14.6 13h6.8" />
  </svg>
);

export const Footer = ({ onOpenPrivacy, onOpenTerms }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="pt-24 pb-8 border-t border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 uppercase tracking-[0.3em] font-bold text-[10px] mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('footer.status')}
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-display font-medium text-zinc-900 dark:text-white mb-6">
              Katarzyna Gierałt
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed mb-8 max-w-md">
              {t('footer.brandDesc')}
            </p>
            <a 
              href="mailto:hello@gieralt.com"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1 transition-all duration-300 group font-medium text-sm sm:text-base"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-rose-500 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <span className="break-all">hello@gieralt.com</span>
            </a>
          </motion.div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
                {t('footer.sections.services')}
              </h4>
              {[
                'Design Systems',
                'No-Code (Framer/Webflow)',
                'AI-Powered UX',
                t('footer.servicesList.audit')
              ].map((item) => (
                <span key={item} className="text-zinc-600 dark:text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer w-fit text-sm font-medium">
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
                {t('footer.sections.nav')}
              </h4>
              {[
                { label: t('footer.navPoints.about'), href: '#about' },
                { label: t('footer.navPoints.process'), href: '#process' },
                { label: t('footer.navPoints.portfolio'), href: '#portfolio' },
                { label: t('footer.navPoints.pricing'), href: '#pricing' },
                { label: t('footer.navPoints.faq'), href: '#faq' },
                { label: t('footer.navPoints.contact'), href: '#contact' }
              ].map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-rose-500 transition-colors inline-flex items-center gap-1 group w-fit text-sm font-medium"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </a>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="flex flex-col gap-5 col-span-2 sm:col-span-1"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
                {t('footer.sections.social')}
              </h4>
              <div className="flex flex-row sm:flex-col gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Dribbble, label: 'Dribbble' },
                  { icon: BehanceIcon, label: 'Behance' },
                  { icon: Github, label: 'GitHub' }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href="#" 
                    className="inline-flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1 w-fit pr-4"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:block text-zinc-700 dark:text-zinc-300 group-hover:text-rose-500">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Legal Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            &copy; {new Date().getFullYear()} Katarzyna Gierałt. {t('footer.legal.rights')}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <button onClick={onOpenPrivacy} className="hover:text-rose-500 transition-colors">
              {t('footer.legal.privacy')}
            </button>
            <span className="hidden sm:inline opacity-30">|</span>
            <button onClick={onOpenTerms} className="hover:text-rose-500 transition-colors">
              {t('footer.legal.terms')}
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
