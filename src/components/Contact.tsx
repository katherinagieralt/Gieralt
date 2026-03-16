import { motion } from "motion/react";
import { Mail, Calendar, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "./AnalyticsProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { analyzeLead } from "../services/aiLeadService";
import { sendExternalNotification, formatSlackLeadNotification } from "../services/notificationService";
import toast from "react-hot-toast";

export function Contact() {
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
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
      toast.error("Proszę wypełnić wszystkie pola.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Proszę podać poprawny adres e-mail.");
      return;
    }

    setFormState("submitting");
    trackEvent('contact_form_submit_start', { variant: "simplified" });

    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("contact_form");
      }

      let aiInsights = null;
      try {
        aiInsights = await analyzeLead({
          ...formData,
          budget: "Nie podano",
          timeline: "Nie podano"
        });
      } catch (aiError) {
        console.error("AI Analysis failed:", aiError);
      }

      await addDoc(collection(db, "contactSubmissions"), {
        ...formData,
        variant: "simplified",
        recaptchaToken,
        aiInsights,
        createdAt: serverTimestamp(),
        status: "new"
      });

      // Send external notifications
      try {
        const slackPayload = formatSlackLeadNotification({ ...formData, aiInsights });
        await sendExternalNotification('slack', slackPayload);
      } catch (notifError) {
        console.error("External notification failed:", notifError);
      }

      setFormState("success");
      toast.success("Wiadomość wysłana pomyślnie!");
      trackEvent('contact_form_submit_success', { variant: "simplified" });
      setFormData({ name: "", email: "", message: "" });
      
      // Redirect after a short delay to show success state
      setTimeout(() => {
        navigate("/thank-you");
      }, 1500);
    } catch (error) {
      console.error("Error adding document: ", error);
      setFormState("error");
      toast.error("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
      trackEvent('contact_form_submit_error', { error: String(error) });
    }
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
                Kontakt
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
              >
                Zacznijmy od <span className="font-bold text-gradient">rozmowy.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8"
              >
                Nie sprzedaję kota w worku. Umów się na darmową, 15-minutową konsultację, żeby sprawdzić, czy nadajemy na tych samych falach.
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
                    <div className="font-semibold text-slate-900 dark:text-white text-base mb-1">Dostępność:</div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Ostatnie 2 terminy w tym miesiącu
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
                  <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-3">Wiadomość wysłana!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-light mb-8">Odezwę się w ciągu 4h roboczych.</p>
                  <button 
                    onClick={() => setFormState("idle")}
                    className="text-rose-500 hover:text-rose-500 text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className={`space-y-5 transition-opacity ${formState === "submitting" ? "opacity-50 pointer-events-none" : ""}`}>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-light">
                  Zostaw swoje dane i krótko opisz projekt. Odezwę się w ciągu 4h roboczych z propozycją terminu bezpłatnej konsultacji.
                </p>

                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">
                    Imię i Nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">
                    Twój Email
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
                    Krótko o projekcie
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 hover:border-slate-300 dark:hover:border-slate-600 transition-all resize-none"
                    placeholder="Cześć, potrzebuję landing page dla..."
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
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        Wyślij zapytanie
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {formState !== "submitting" && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  )}
                </button>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Odpowiedź w 4h robocze</span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bezpłatna konsultacja</span>
                </div>

                <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mt-6 font-light">
                  Ta strona jest chroniona przez reCAPTCHA i obowiązują ją <a href="https://policies.google.com/privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">Polityka Prywatności</a> oraz <a href="https://policies.google.com/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">Warunki Korzystania</a> Google.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
