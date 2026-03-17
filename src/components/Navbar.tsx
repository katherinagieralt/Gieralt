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
  const { i18n } = useTranslation();
  const { setIsPanelOpen } = useAccessibility();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'process', 'portfolio', 'pricing', 'faq', 'contact'];
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
    { id: 'about', label: i18n.language === 'pl' ? 'O mnie' : 'About' },
    { id: 'process', label: i18n.language === 'pl' ? 'Proces' : 'Process' },
    { id: 'portfolio', label: i18n.language === 'pl' ? 'Portfolio' : 'Portfolio' },
    { id: 'pricing', label: i18n.language === 'pl' ? 'Cennik' : 'Pricing' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: i18n.language === 'pl' ? 'Kontakt' : 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6 shadow-none"
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        {i18n.language === 'pl' ? 'Przejdź do treści' : 'Skip to content'}
      </a>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1"
          >
            Katarzyna<span className="text-gradient">Gierałt</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium ${activeSection === link.id ? 'text-rose-500 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'} hover:text-rose-500 dark:hover:text-white transition-colors uppercase tracking-wider relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 dark:bg-rose-400 transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
            
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={toggleLanguage}
                className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
              </button>

              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center justify-center"
                aria-label="Accessibility settings"
                onClick={() => setIsPanelOpen(true)}
              >
                <span className="text-[10px] font-bold leading-none border border-current rounded-[4px] px-1 py-0.5">AA</span>
              </button>

              <div
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                aria-label="Strefa Klienta"
              >
                <User className="h-4 w-4" />
              </div>
            </div>

            <button
              aria-label="Umów darmową konsultację"
              className="bg-rose-500 text-white hover:bg-rose-600 text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full transition-all ml-2 shadow-lg shadow-rose-500/20 hover:-translate-y-0.5"
            >
              {i18n.language === 'pl' ? 'UMÓW ROZMOWĘ' : 'BOOK A CALL'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 flex items-center justify-center"
              aria-label="Accessibility settings"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPanelOpen(true);
              }}
            >
              <span className="text-xs font-bold leading-none border-2 border-current rounded-md px-1 py-0.5">AA</span>
            </button>
            <div
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2 cursor-pointer"
              aria-label="Strefa Klienta"
            >
              <User className="h-5 w-5" />
            </div>
            <button
              className="text-slate-900 dark:text-white p-2"
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
            className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium ${activeSection === link.id ? 'text-rose-500 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'} hover:text-rose-500 dark:hover:text-white py-2 uppercase tracking-wider`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-center font-bold uppercase tracking-widest px-5 py-4 rounded-xl transition-all mt-4 w-full shadow-lg shadow-rose-500/20"
              >
                {i18n.language === 'pl' ? 'UMÓW ROZMOWĘ' : 'BOOK A CALL'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
