import { motion, useScroll, useTransform } from "motion/react";
import { useAnalytics } from "./AnalyticsProvider";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

// Extracted UI Components
import { HeroBackground } from "./HeroBackground";
import { PremiumButton } from "./PremiumButton";
import { GuaranteeBadge } from "./GuaranteeBadge";

export function Hero() {
  const { trackEvent } = useAnalytics();
  const { i18n, t } = useTranslation();

  const currentMonth = new Date().toLocaleString(i18n.language === 'pl' ? 'pl-PL' : 'en-US', { month: 'long' });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-x-hidden text-zinc-900 dark:text-white pt-32 pb-12 sm:pt-40 sm:pb-8 transition-colors duration-300">

      {/* Background Layer */}
      <HeroBackground y1={y1} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: y2, opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {t('hero.availability', { month: currentMonth })}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6 text-zinc-900 dark:text-white leading-tight sm:leading-[1.05]"
          >
            {t('hero.headline.line1')} <span className="text-rose-500">{t('hero.headline.highlight1')}</span> <br className="hidden sm:block" />
            {t('hero.headline.line2')} <strong>{t('hero.headline.highlight2')}</strong> <br className="hidden sm:block" />
            {t('hero.headline.line3')} <span className="text-rose-500">{t('hero.headline.highlight3')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed max-w-2xl mx-auto font-light"
          >
            {t('hero.subtext')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="flex flex-col items-center mb-8"
          >
            {/* CTA's */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <PremiumButton
                onClick={() => trackEvent('hero_cta_click', { label: t('hero.cta.primary') })}
                className="w-full sm:w-auto"
              >
                {t('hero.cta.primary')}
              </PremiumButton>
              <GuaranteeBadge />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
