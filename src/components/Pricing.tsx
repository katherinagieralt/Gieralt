import { motion } from "motion/react";
import { Check, Zap, Rocket, Crown, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumButton } from "./PremiumButton";
import { usePlans } from "../hooks/usePayload";

export const Pricing = () => {
  const { i18n } = useTranslation();
  const { data: plans, isLoading, isError } = usePlans();

  const isPl = i18n.language === 'pl';

  const fallbackPlans = [
    {
      id: 'fallback-1',
      namePL: 'Premium Landing',
      nameEN: 'Premium Landing',
      descriptionPL: 'Błyskawiczna sprzedaż i wizerunek premium.',
      descriptionEN: 'Instant sales and premium branding.',
      price: '4 900 PLN',
      deliveryTime: '3-5 dni',
      isPopular: false,
      features: [
        { feature: 'Strategia UX & Copywriting', status: 'included' },
        { feature: 'Dedykowany Design Premium', status: 'included' },
        { feature: 'Podstawowa Analityka (GA4)', status: 'included' },
        { feature: 'System Zarządzania CMS', status: 'excluded' },
        { feature: 'Automatyzacje procesów AI', status: 'excluded' }
      ]
    },
    {
      id: 'fallback-2',
      namePL: 'Business Portal 3.0',
      nameEN: 'Business Portal 3.0',
      descriptionPL: 'Skalowalna platforma dla Twojej firmy.',
      descriptionEN: 'Scalable platform for your business.',
      price: '12 000 PLN',
      deliveryTime: '10-14 dni',
      isPopular: true,
      features: [
        { feature: 'Dedykowana Architektura (Payload)', status: 'included' },
        { feature: 'Modułowa Budowa (Skalowalność)', status: 'included' },
        { feature: 'Zaawansowane SEO (Semantyka)', status: 'included' },
        { feature: 'Interaktywne Komponenty', status: 'included' },
        { feature: 'Modelowanie AI / Agenci AI', status: 'excluded' }
      ]
    },
    {
      id: 'fallback-3',
      namePL: 'E-commerce Elite',
      nameEN: 'E-commerce Elite',
      descriptionPL: 'Najwyższej klasy sklep internetowy.',
      descriptionEN: 'High-end online store.',
      price: '20 000 PLN',
      deliveryTime: '21-30 dni',
      isPopular: false,
      features: [
        { feature: 'High-Conversion Checkout Flow', status: 'included' },
        { feature: 'Automatyzacja Marketingu (Email)', status: 'included' },
        { feature: 'System Lojalnościowy / Kupony', status: 'included' },
        { feature: 'Integracja AI: Rekomendacje', status: 'included' },
        { feature: 'Panel Zarządzania Sprzedażą', status: 'included' }
      ]
    }
  ];

  const displayPlans = (plans && plans.length > 0) ? plans : fallbackPlans;

  const getIcon = (index: number) => {
    switch (index % 3) {
      case 0: return Zap;
      case 1: return Rocket;
      case 2: return Crown;
      default: return Zap;
    }
  };

  const getColorClasses = (index: number) => {
    switch (index % 3) {
      case 0: return { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20" };
      case 1: return { color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-500/50" };
      case 2: return { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20" };
      default: return { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20" };
    }
  };

  if (isLoading) return <div className="py-24 text-center text-zinc-500">Loading pricing plans...</div>;

  return (
    <section className="relative overflow-hidden transition-colors duration-300" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            {isPl ? 'Cennik' : 'Pricing'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-zinc-900 dark:text-white mb-8 leading-tight tracking-tight relative"
          >
            {isPl ? (
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
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {isPl
              ? 'Wybierz pakiet dopasowany do etapu Twojego biznesu. Bez ukrytych kosztów.'
              : 'Choose a package tailored to your business stage. No hidden costs.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-end">
          {displayPlans.map((plan: any, index: number) => {
            const Icon = getIcon(index);
            const stylisticClasses = getColorClasses(index);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                className={`relative flex flex-col p-8 sm:p-8 rounded-[2.5rem] border transition-all duration-500 bg-white dark:bg-zinc-900/40 backdrop-blur-sm ${
                  plan.isPopular 
                    ? 'border-rose-200 dark:border-rose-500/30 shadow-2xl shadow-rose-500/10 dark:shadow-rose-500/20 md:-translate-y-4 z-10 bg-rose-50/30 dark:bg-rose-900/10' 
                    : 'border-zinc-200 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-rose-500/5 hover:-translate-y-2'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/30 whitespace-nowrap">
                    {isPl ? 'Najczęściej wybierany' : 'Most popular'}
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${stylisticClasses.bg} flex items-center justify-center mb-6 shadow-sm border border-white/50 dark:border-zinc-700/50`}>
                    <Icon className={`h-7 w-7 ${stylisticClasses.color}`} />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-zinc-900 dark:text-white mb-3">
                    {isPl ? plan.namePL : plan.nameEN}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed h-12">
                    {isPl ? plan.descriptionPL : plan.descriptionEN}
                  </p>
                </div>

                <div className="mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl sm:text-5xl font-display font-semibold text-zinc-900 dark:text-white tracking-tight">{plan.price}</span>
                    <span className="text-zinc-500 dark:text-zinc-500 text-sm font-medium uppercase tracking-wider">netto</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    {isPl ? 'Realizacja:' : 'Delivery:'} {plan.deliveryTime}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features?.map((item: any, i: number) => {
                    const isExcluded = item.status === 'excluded';
                    return (
                      <li key={i} className={`flex items-start gap-3 text-sm font-light ${isExcluded ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-600 dark:text-zinc-300'}`}>
                        {isExcluded ? (
                          <XCircle className="h-5 w-5 text-zinc-300 dark:text-zinc-700 shrink-0 mt-0.5" />
                        ) : (
                          <Check className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`leading-relaxed ${isExcluded ? 'line-through decoration-zinc-200 dark:decoration-zinc-800' : ''}`}>
                          {item.feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <PremiumButton 
                  onClick={() => console.log('Plan selected:', plan.id)}
                  className="w-full"
                  showShine={plan.isPopular}
                >
                  {isPl ? 'Wybieram plan' : 'Choose plan'}
                </PremiumButton>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
