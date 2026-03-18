import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumButton } from "./PremiumButton";

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "",
    consent: false
  });
  
  const currentMonth = new Date().toLocaleString(i18n.language === 'pl' ? 'pl-PL' : 'en-US', { month: 'long' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.message || !formData.consent) return;
    if (!emailRegex.test(formData.email)) return;
    
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "", consent: false });
      setTimeout(() => setFormState("idle"), 8000);
    }, 2000);
  };

  return (
    <section className="transition-colors duration-500 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Strict 12-Column Grid Wrapper */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Header Block: On Grid Centered */}
          <div className="lg:col-span-12 text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {t('contact.badge', { month: currentMonth })}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8"
            >
              {t('contact.title.line1')} <span className="font-bold text-gradient italic">{t('contact.title.highlight')}</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
              {t('contact.subtext')}
            </motion.p>
          </div>

          {/* Form Card: Mathematically Centered on 12-Col Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-start-3 lg:col-span-8 w-full"
          >
            <div className="glass-card p-6 sm:p-12 text-left">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                     <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20">
                        <CheckCircle2 strokeWidth={1.5} className="h-10 w-10" />
                     </div>
                     <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4">
                        {t('contact.form.success.title')}
                     </h3>
                     <p className="text-zinc-500 dark:text-zinc-400 font-light max-w-xs mb-10">
                        {t('contact.form.success.desc')}
                     </p>
                     <PremiumButton onClick={() => setFormState("idle")} className="px-10">
                        {t('contact.form.success.cta')}
                     </PremiumButton>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">{t('contact.form.labels.name')}</label>
                        <input 
                          required type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('contact.form.placeholders.name')}
                          className="w-full bg-white/50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-white/5 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">{t('contact.form.labels.email')}</label>
                        <input 
                          required type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hello@choice.com"
                          className="w-full bg-white/50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-white/5 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">{t('contact.form.labels.message')}</label>
                      <textarea 
                        required rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contact.form.placeholders.message')}
                        className="w-full bg-white/50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-white/5 rounded-3xl px-6 py-5 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Legal Compliance Row */}
                    <div className="flex items-start gap-3 px-1">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-rose-500 focus:ring-rose-500 bg-white dark:bg-zinc-900/50"
                        />
                      </div>
                      <div className="text-xs leading-relaxed">
                        <label htmlFor="consent" className="text-zinc-500 dark:text-zinc-400 font-light">
                          {t('contact.form.labels.consent')} <a href="#" className="underline hover:text-rose-500 transition-colors">{t('footer.legal.privacy')}</a> (RODO)
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light flex items-center gap-3">
                        <Mail strokeWidth={1.5} className="h-4 w-4 text-rose-500" />
                        <span>{t('contact.form.directEmail')} <a href="mailto:hello@gieralt.com" className="text-zinc-900 dark:text-white font-bold hover:text-rose-500 transition-colors">hello@gieralt.com</a></span>
                      </p>
                      <PremiumButton type="submit" disabled={formState === "submitting"} className="w-full sm:w-auto min-w-[240px]">
                        {formState === "submitting" ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            <span>{t('contact.form.submit')}</span>
                            <ArrowRight strokeWidth={1.5} className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </PremiumButton>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
