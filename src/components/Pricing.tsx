import React from 'react';
import { motion } from "motion/react";
import { Check, Zap, Rocket, Crown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Pricing = () => {
  const { i18n } = useTranslation();

  const plans = [
    {
      name: i18n.language === 'pl' ? "Pakiet MVP" : "MVP Package",
      desc: i18n.language === 'pl' 
        ? "Dla startupów testujących rynek. Szybki start i weryfikacja pomysłu."
        : "For startups testing the market. Quick launch and idea verification.",
      price: i18n.language === 'pl' ? "2 500 PLN" : "€600",
      time: i18n.language === 'pl' ? "3 dni" : "3 days",
      features: i18n.language === 'pl' 
        ? [
            "Landing Page (do 3 sekcji)",
            "Wdrożenie No-Code (Framer)",
            "Formularz kontaktowy",
            "Podstawowa optymalizacja"
          ]
        : [
            "Landing Page (up to 3 sections)",
            "No-Code Development (Framer)",
            "Contact form",
            "Basic optimization"
          ],
      icon: Zap,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/20",
      cta: i18n.language === 'pl' ? "Wybieram MVP" : "Choose MVP",
    },
    {
      name: i18n.language === 'pl' ? "Pakiet Growth" : "Growth Package",
      desc: i18n.language === 'pl'
        ? "Kompletny ekosystem sprzedaży dla Twojej firmy. Pełna optymalizacja pod konwersję."
        : "A complete sales ecosystem for your company. Full conversion optimization.",
      price: i18n.language === 'pl' ? "6 000 PLN" : "€1 400",
      time: i18n.language === 'pl' ? "7 dni" : "7 days",
      popular: true,
      features: i18n.language === 'pl'
        ? [
            "Pełny Landing Page (do 8 sekcji)",
            "Wdrożenie No-Code (Framer/Webflow)",
            "Copywriting sprzedażowy (AI+Human)",
            "Integracja z CRM/Mailingiem",
            "Konfiguracja analityki (GA4)"
          ]
        : [
            "Full Landing Page (up to 8 sections)",
            "No-Code Development (Framer/Webflow)",
            "Sales copywriting (AI+Human)",
            "CRM/Mailing integration",
            "Analytics setup (GA4)"
          ],
      icon: Rocket,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/50",
      cta: i18n.language === 'pl' ? "Wybieram Growth" : "Choose Growth",
    },
    {
      name: i18n.language === 'pl' ? "Pakiet Market Leader" : "Market Leader",
      desc: i18n.language === 'pl'
        ? "Pełne wsparcie strategiczne, Design System i audyt UX. Dla liderów branży."
        : "Full strategic support, Design System, and UX audit. For industry leaders.",
      price: i18n.language === 'pl' ? "16 000 PLN" : "€3 800",
      time: i18n.language === 'pl' ? "14 dni" : "14 days",
      features: i18n.language === 'pl'
        ? [
            "Multi-page Website / Portal",
            "Design System + Style Guide",
            "Customowe ilustracje/ikony",
            "Zaawansowane interakcje (WebGL)",
            "3 miesiące wsparcia technicznego",
            "Audyt UX po 30 dniach"
          ]
        : [
            "Multi-page Website / Portal",
            "Design System + Style Guide",
            "Custom illustrations/icons",
            "Advanced interactions (WebGL)",
            "3 months of technical support",
            "UX audit after 30 days"
          ],
      icon: Crown,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/20",
      cta: i18n.language === 'pl' ? "Wybieram Premium" : "Choose Premium",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="pricing">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            {i18n.language === 'pl' ? 'Cennik' : 'Pricing'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight relative"
          >
            {i18n.language === 'pl' ? (
              <>Inwestycja w Twój Wzrost. <br />
              <span className="font-bold text-gradient">Przejrzyste zasady.</span></>
            ) : (
              <>Investment in Your Growth. <br />
              <span className="font-bold text-gradient">Transparent rules.</span></>
            )}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {i18n.language === 'pl'
              ? 'Wybierz pakiet dopasowany do etapu Twojego biznesu. Bez ukrytych kosztów.'
              : 'Choose a package tailored to your business stage. No hidden costs.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-end">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col p-8 sm:p-8 rounded-[2.5rem] border transition-all duration-500 bg-white dark:bg-slate-900/40 backdrop-blur-sm ${
                plan.popular 
                  ? 'border-rose-200 dark:border-rose-500/30 shadow-2xl shadow-rose-500/10 dark:shadow-rose-500/20 md:-translate-y-4 z-10 bg-rose-50/30 dark:bg-rose-900/10' 
                  : 'border-slate-200 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-rose-500/5 hover:-translate-y-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/30 whitespace-nowrap">
                  {i18n.language === 'pl' ? 'Najczęściej wybierany' : 'Most popular'}
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl ${plan.bg} flex items-center justify-center mb-6 shadow-sm border border-white/50 dark:border-slate-700/50`}>
                  <plan.icon className={`h-7 w-7 ${plan.color}`} />
                </div>
                <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-3">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed h-12">{plan.desc}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl sm:text-5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-500 text-sm font-medium uppercase tracking-wider">netto</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  {i18n.language === 'pl' ? 'Realizacja:' : 'Delivery:'} {plan.time}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 font-light">
                    <Check className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 px-6 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 relative overflow-hidden group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-slate-900 ${
                plan.popular 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1' 
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:-translate-y-1'
              }`}>
                <span className="relative z-10 flex items-center gap-2">
                  {plan.cta}
                  {plan.popular && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
                {plan.popular && (
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Project Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16 p-8 sm:p-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] shadow-xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-blue-500/5 dark:from-rose-500/10 dark:to-blue-500/10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-3">
                {i18n.language === 'pl' ? (
                  <>Potrzebujesz czegoś <span className="text-gradient font-bold">innego?</span></>
                ) : (
                  <>Need something <span className="text-gradient font-bold">different?</span></>
                )}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base font-light leading-relaxed max-w-xl">
                {i18n.language === 'pl'
                  ? 'Tworzę również dedykowane aplikacje webowe, rozbudowane platformy i niestandardowe rozwiązania. Opowiedz mi o swoim pomyśle, a przygotuję indywidualną wycenę.'
                  : 'I also create dedicated web applications, complex platforms, and custom solutions. Tell me about your idea, and I will prepare an individual quote.'}
              </p>
            </div>
            
            <a 
              href="#contact"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-rose-500/25 hover:-translate-y-1"
            >
              {i18n.language === 'pl' ? 'Skontaktuj się' : 'Contact me'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
