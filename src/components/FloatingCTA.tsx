import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FloatingCTAProps {
  onOpenCalendly: () => void;
}

export function FloatingCTA({ onOpenCalendly }: FloatingCTAProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 600px (approx Hero height)
      // Hide if near bottom (footer) to avoid overlap
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isPastHero = scrollY > 600;
      const isNearBottom = (windowHeight + scrollY) >= (documentHeight - 200);

      setIsVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6 pt-4 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90"
        >
          <button
            onClick={onOpenCalendly}
            className="w-full bg-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-rose-500/25 flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] border border-rose-500"
          >
            <Calendar className="h-5 w-5" />
            <span className="uppercase tracking-widest text-sm">{t('floatingCta.btn')}</span>
            
            {/* Ping animation for attention */}
            <span className="absolute top-4 right-6 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
