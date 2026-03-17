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
  const { i18n } = useTranslation();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-24 pb-8 border-t border-slate-200 dark:border-slate-800/50 relative overflow-hidden transition-colors duration-300">
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {i18n.language === 'pl' ? 'Dostępna na nowe zlecenia' : 'Available for work'}
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 dark:text-white mb-6">
              Katarzyna Gierałt
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-light leading-relaxed mb-8 max-w-sm">
              {i18n.language === 'pl' 
                ? 'Projektuję cyfrowe doświadczenia, które przekładają się na realne wyniki biznesowe.'
                : 'I design digital experiences that translate into real business results.'}
            </p>
            <a 
              href="mailto:hello@gieralt.com"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1 transition-all duration-300 group font-medium text-sm sm:text-base"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-rose-500 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-colors">
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
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-2">
                {i18n.language === 'pl' ? 'Usługi' : 'Services'}
              </h4>
              {[
                'Design Systems',
                'No-Code (Framer/Webflow)',
                'AI-Powered UX',
                i18n.language === 'pl' ? 'Audyt Konwersji' : 'Conversion Audit'
              ].map((item) => (
                <span key={item} className="text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-colors cursor-pointer w-fit text-sm font-medium">
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-2">
                {i18n.language === 'pl' ? 'Nawigacja' : 'Navigation'}
              </h4>
              {[
                { label: i18n.language === 'pl' ? 'O mnie' : 'About', href: '#about' },
                { label: i18n.language === 'pl' ? 'Proces' : 'Process', href: '#process' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: i18n.language === 'pl' ? 'Cennik' : 'Pricing', href: '#pricing' },
                { label: 'FAQ', href: '#faq' },
                { label: i18n.language === 'pl' ? 'Kontakt' : 'Contact', href: '#contact' }
              ].map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-colors inline-flex items-center gap-1 group w-fit text-sm font-medium"
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
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5 col-span-2 sm:col-span-1"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-2">
                Social
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
                    className="inline-flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1 w-fit pr-4"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:block text-slate-700 dark:text-slate-300 group-hover:text-rose-500">{social.label}</span>
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
          className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Katarzyna Gierałt. {i18n.language === 'pl' ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onOpenPrivacy} className="hover:text-rose-500 transition-colors">
              {i18n.language === 'pl' ? 'Polityka prywatności' : 'Privacy Policy'}
            </button>
            <span className="hidden sm:inline opacity-30">|</span>
            <button onClick={onOpenTerms} className="hover:text-rose-500 transition-colors">
              {i18n.language === 'pl' ? 'Regulamin' : 'Terms of Service'}
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
