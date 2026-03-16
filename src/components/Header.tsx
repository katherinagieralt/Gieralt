import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, Sun, Moon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

interface HeaderProps {
  onOpenCalendly: () => void;
}

export function Header({ onOpenCalendly }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { setIsPanelOpen } = useAccessibility();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleLanguage = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("header.about"), href: "#about" },
    { name: t("header.process"), href: "#process" },
    { name: t("header.portfolio"), href: "#portfolio" },
    { name: t("header.pricing"), href: "#pricing" },
    { name: t("header.faq"), href: "#faq" },
    { name: t("header.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6 shadow-none"
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        Przejdź do treści
      </a>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity">
            Katarzyna<span className="text-gradient">Gierałt</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 dark:bg-rose-400 transition-all duration-300 group-hover:w-full" />
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
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center justify-center"
                aria-label="Accessibility settings"
                onClick={() => setIsPanelOpen(true)}
              >
                <span className="text-[10px] font-bold leading-none border border-current rounded-[4px] px-1 py-0.5">AA</span>
              </button>

              <a
                href="/client"
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50"
                aria-label="Strefa Klienta"
              >
                <User className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={onOpenCalendly}
              aria-label="Umów darmową konsultację"
              className="bg-rose-500 text-white hover:bg-rose-600 text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full transition-all ml-2 shadow-lg shadow-rose-500/20 hover:-translate-y-0.5"
            >
              {t("header.cta")}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
            <a
              href="/client"
              className="text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors p-2"
              aria-label="Strefa Klienta"
            >
              <User className="h-5 w-5" />
            </a>
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
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white py-2 uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCalendly();
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-center font-bold uppercase tracking-widest px-5 py-4 rounded-xl transition-all mt-4 w-full shadow-lg shadow-rose-500/20"
              >
                Umów rozmowę
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
