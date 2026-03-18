import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sun, Moon, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from './AccessibilityContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const { setIsPanelOpen } = useAccessibility();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'process', 'portfolio', 'offer', 'faq', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: t('nav.links.about') },
    { id: 'process', label: t('nav.links.process') },
    { id: 'portfolio', label: t('nav.links.portfolio') },
    { id: 'offer', label: t('nav.links.offer') },
    { id: 'faq', label: t('nav.links.faq') },
    { id: 'contact', label: t('nav.links.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-zinc-200/50 dark:border-white/5 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6 shadow-none"
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        {t('nav.skipToContent')}
      </a>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1"
          >
            Katarzyna<span className="text-gradient">Gierałt</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium ${activeSection === link.id ? 'text-rose-500 dark:text-rose-400' : 'text-zinc-600 dark:text-zinc-300'} hover:text-rose-500 dark:hover:text-white transition-colors uppercase tracking-wider relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 dark:bg-rose-400 transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
            
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <button
                onClick={toggleLanguage}
                className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
              </button>

              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                className="text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 flex items-center justify-center"
                aria-label="Accessibility settings"
                onClick={() => setIsPanelOpen(true)}
              >
                <span className="text-[10px] font-bold leading-none border border-current rounded-[4px] px-1 py-0.5">AA</span>
              </button>

            </div>

            <button
              aria-label={t('nav.cta')}
              className="bg-rose-500 text-white hover:bg-rose-600 text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full transition-all ml-2 shadow-lg shadow-rose-500/20 hover:-translate-y-0.5"
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 flex items-center justify-center"
              aria-label="Accessibility settings"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPanelOpen(true);
              }}
            >
              <span className="text-xs font-bold leading-none border-2 border-current rounded-md px-1 py-0.5">AA</span>
            </button>
            <div
              className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 cursor-pointer"
              aria-label="Strefa Klienta"
            >
              <User className="h-5 w-5" />
            </div>
            <button
              className="text-zinc-900 dark:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${activeSection === link.id ? 'text-rose-500 dark:text-rose-400' : 'text-zinc-600 dark:text-zinc-300'} hover:text-rose-500 dark:hover:text-white py-2 uppercase tracking-widest`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-center font-bold uppercase tracking-widest px-5 py-5 rounded-2xl transition-all mt-4 w-full shadow-xl shadow-rose-500/20 active:scale-95"
              >
                {t('nav.cta')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
