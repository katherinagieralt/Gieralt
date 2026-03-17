import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Calendar, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { i18n } = useTranslation();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    if (!emailRegex.test(formData.email)) {
      return;
    }

    setFormState("submitting");

    // Simulate network request for the static portfolio
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after some time
      setTimeout(() => setFormState("idle"), 5000);
    }, 1500);
  };

  return (
    <section className="bg-white dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="contact">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
            
            {/* Left: Info */}
            <div className="flex flex-col justify-start lg:col-span-5 pt-4 sm:pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm w-fit"
              >
                {i18n.language === 'pl' ? 'Kontakt' : 'Contact'}
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
              >
                {i18n.language === 'pl' ? (
                  <>Zacznijmy od <span className="font-bold text-gradient">rozmowy.</span></>
                ) : (
                  <>Let's start with a <span className="font-bold text-gradient">conversation.</span></>
                )}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8"
              >
                {i18n.language === 'pl'
                  ? 'Nie sprzedaję kota w worku. Umów się na darmową, 15-minutową konsultację, żeby sprawdzić, czy nadajemy na tych samych falach.'
                  : "I don't sell a pig in a poke. Fast-track a free 15-minute consultation to see if we're on the same wavelength."}
              </motion.p>
              
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-5 text-slate-600 dark:text-slate-300 group p-4 sm:p-5 rounded-2xl hover:bg-white dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-all duration-300">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                      {i18n.language === 'pl' ? 'Dostępność:' : 'Availability:'}
                    </div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      {i18n.language === 'pl' ? 'Ostatnie 2 terminy w tym miesiącu' : 'Last 2 spots this month'}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-5 text-slate-600 dark:text-slate-300 group p-4 sm:p-5 rounded-2xl hover:bg-white dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-all duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-base mb-1">Email:</div>
                    <a href="mailto:kontakt@katarzynagieralt.pl" className="text-sm hover:text-rose-500 transition-colors">
                      kontakt@katarzynagieralt.pl
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative lg:col-span-7 bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none"
            >
              {formState === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl z-20 p-8"
                >
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-sm border border-emerald-100 dark:border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-3">
                    {i18n.language === 'pl' ? 'Wiadomość wysłana!' : 'Message sent!'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-light mb-8">
                    {i18n.language === 'pl' ? 'Odezwę się w ciągu 4h roboczych.' : "I'll get back to you within 4 business hours."}
                  </p>
                  <button 
                    onClick={() => setFormState("idle")}
                    className="text-rose-500 hover:text-rose-500 text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {i18n.language === 'pl' ? 'Wyślij kolejną wiadomość' : 'Send another message'}
                  </button>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className={`space-y-5 transition-opacity ${formState === "submitting" ? "opacity-50 pointer-events-none" : ""}`}>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-light">
                  {i18n.language === 'pl'
                    ? 'Zostaw swoje dane i krótko opisz projekt. Odezwę się w ciągu 4h roboczych z propozycją terminu bezpłatnej konsultacji.'
                    : 'Leave your contact details and briefly describe the project. I will contact you within 4 business hours with a proposal for a free consultation.'}
                </p>

                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">
                    {i18n.language === 'pl' ? 'Imię i Nazwisko' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                    placeholder={i18n.language === 'pl' ? "Jan Kowalski" : "John Doe"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">
                    {i18n.language === 'pl' ? 'Twój Email' : 'Your Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                    placeholder="jan@firma.pl"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">
                    {i18n.language === 'pl' ? 'Krótko o projekcie' : 'Briefly about the project'}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 hover:border-slate-300 dark:hover:border-slate-600 transition-all resize-none"
                    placeholder={i18n.language === 'pl' ? "Cześć, potrzebuję landing page dla..." : "Hi, I need a landing page for..."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-500/50 text-white font-bold uppercase tracking-widest py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 group mt-8 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-slate-900"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {i18n.language === 'pl' ? 'Wysyłanie...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {i18n.language === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry'}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {formState !== "submitting" && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  )}
                </button>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {i18n.language === 'pl' ? 'Odpowiedź w 4h robocze' : 'Response in 4h'}</span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {i18n.language === 'pl' ? 'Bezpłatna konsultacja' : 'Free consultation'}</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
