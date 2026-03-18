import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Rocket, Crown, Cpu, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOffers } from '../hooks/usePayload';
import { PremiumButton } from './PremiumButton';

const IconMap: Record<string, any> = {
  Zap,
  Rocket,
  Crown,
  Cpu,
  Shield,
};

const OfferNode = ({ offer, index }: { offer: any, index: number }) => {
  const { t } = useTranslation();
  const Icon = IconMap[offer.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="glass-card p-10 group"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 blur-[80px] group-hover:bg-rose-500/20 transition-all duration-700 rounded-full" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-10">
          <div className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 shadow-sm">
            <Icon className="h-10 w-10 text-rose-500" />
          </div>
          {offer.isPopular && (
            <div className="px-4 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-rose-500/20">
              {t('offer.popularChoice')}
            </div>
          )}
        </div>

        <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-rose-500 transition-colors line-height-tight">
          {offer.name}
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 font-light text-base leading-relaxed mb-8 h-20 line-clamp-3">
          {offer.description}
        </p>

        {/* Value Section */}
        <div className="mb-10 space-y-4">
          <span className="text-[10px] font-bold text-rose-500/80 uppercase tracking-[0.2em] block mb-2">
            {t('offer.scopeLabel')}
          </span>
          <ul className="space-y-4">
            {offer.features?.map((feat: any, i: number) => {
              const isExcluded = feat.status === 'excluded';
              return (
                <li key={i} className={`flex items-center gap-4 text-sm font-light group/item ${isExcluded ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-700 dark:text-zinc-300'}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-colors ${
                    isExcluded 
                      ? 'bg-zinc-100 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800' 
                      : 'bg-emerald-500/10 border-emerald-500/20 group-hover/item:bg-emerald-500/20'
                  }`}>
                    {isExcluded ? (
                      <XCircle className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <span className={isExcluded ? 'line-through decoration-zinc-300 dark:decoration-zinc-800' : ''}>
                    {feat.feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">
                {t('offer.investmentLabel')}
              </span>
              <span className="text-3xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter">
                {offer.price}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">
                {t('offer.timelineLabel')}
              </span>
              <span className="text-sm font-bold text-rose-500">
                {offer.deliveryTime}
              </span>
            </div>
          </div>

          <PremiumButton 
            className="w-full text-xs py-5"
          >
            {t('offer.cta.start')}
          </PremiumButton>
        </div>
      </div>
    </motion.div>
  );
};

export const Offer = () => {
  const { t } = useTranslation();
  const { data: offers } = useOffers();

  const fallbackOffers = [
    {
      id: 'landing',
      name: t('offer.fallback.landing.name'),
      description: t('offer.fallback.landing.desc'),
      price: t('offer.fallback.landing.price'),
      deliveryTime: t('offer.fallback.landing.timeline'),
      icon: 'Rocket',
      isPopular: false,
      features: [
        { feature: t('offer.fallback.landing.feat1'), status: 'included' },
        { feature: t('offer.fallback.landing.feat2'), status: 'included' },
        { feature: t('offer.fallback.landing.feat3'), status: 'included' },
        { feature: t('offer.fallback.landing.feat4'), status: 'excluded' },
        { feature: t('offer.fallback.landing.feat5'), status: 'excluded' }
      ]
    },
    {
      id: 'business',
      name: t('offer.fallback.business.name'),
      description: t('offer.fallback.business.desc'),
      price: t('offer.fallback.business.price'),
      deliveryTime: t('offer.fallback.business.timeline'),
      icon: 'Crown',
      isPopular: true,
      features: [
        { feature: t('offer.fallback.business.feat1'), status: 'included' },
        { feature: t('offer.fallback.business.feat2'), status: 'included' },
        { feature: t('offer.fallback.business.feat3'), status: 'included' },
        { feature: t('offer.fallback.business.feat4'), status: 'included' },
        { feature: t('offer.fallback.business.feat5'), status: 'excluded' }
      ]
    },
    {
      id: 'ecommerce',
      name: t('offer.fallback.ecommerce.name'),
      description: t('offer.fallback.ecommerce.desc'),
      price: t('offer.fallback.ecommerce.price'),
      deliveryTime: t('offer.fallback.ecommerce.timeline'),
      icon: 'Cpu',
      features: [
        { feature: t('offer.fallback.ecommerce.feat1'), status: 'included' },
        { feature: t('offer.fallback.ecommerce.feat2'), status: 'included' },
        { feature: t('offer.fallback.ecommerce.feat3'), status: 'included' },
        { feature: t('offer.fallback.ecommerce.feat4'), status: 'included' },
        { feature: t('offer.fallback.ecommerce.feat5'), status: 'included' }
      ]
    }
  ];

  const customOffer = {
    id: 'custom',
    name: t('offer.custom.name'),
    description: t('offer.custom.desc'),
    price: t('offer.custom.price'),
    deliveryTime: t('offer.custom.timeline'),
    icon: 'Zap',
    features: [
      { feature: t('offer.custom.feat1') },
      { feature: t('offer.custom.feat2') },
      { feature: t('offer.custom.feat3') },
      { feature: t('offer.custom.feat4') }
    ]
  };

  const displayOffers = (offers && offers.length > 0) ? offers.filter((o: any) => o.id !== 'custom') : fallbackOffers;

  return (
    <section className="transition-colors duration-500 relative overflow-hidden" id="offer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-10 shadow-sm"
          >
            {t('offer.badge')}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-10"
          >
            {t('offer.title.line1')} <br />
            <span className="font-bold text-gradient">{t('offer.title.highlight')}</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-4xl mx-auto"
          >
            {t('offer.subtext')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {displayOffers.map((offer: any, index: number) => (
            <OfferNode key={offer.id} offer={offer} index={index} />
          ))}
        </div>

        {/* Custom Systems - Horizontal Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative group bg-white dark:bg-zinc-900/50 backdrop-blur-3xl border border-zinc-200 dark:border-zinc-800/80 rounded-[3rem] p-8 sm:p-12 overflow-hidden hover:border-rose-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-rose-500/5"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[100px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Zap className="h-3 w-3 fill-rose-500" />
                {t('offer.custom.badge')}
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-6">
                {customOffer.name}
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                {customOffer.description}
              </p>
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                {customOffer.features.map((feat, i) => (
                  <span key={i} className="px-4 py-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {feat.feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-72 pt-8 lg:pt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-800/80 flex flex-col items-center lg:items-start">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{t('offer.investmentLabel')}</span>
              <span className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-8">{customOffer.price}</span>
              <PremiumButton className="w-full py-5 text-xs">
                {t('offer.custom.cta')}
              </PremiumButton>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

    </section>
  );
};
