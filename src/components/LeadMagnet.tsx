import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, CheckCircle2, Loader2, Download, AlertCircle, ArrowRight } from "lucide-react";
import { useAnalytics } from "./AnalyticsProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export function LeadMagnet() {
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");
    trackEvent("lead_magnet_submit_start", { email });

    try {
      await addDoc(collection(db, "leadMagnetSignups"), {
        email,
        createdAt: serverTimestamp()
      });

      setStatus("success");
      trackEvent("lead_magnet_submit_success", { email });
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMessage("Wystąpił błąd podczas zapisu. Spróbuj ponownie.");
      trackEvent("lead_magnet_submit_error", { error: String(error) });
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300 border-y border-slate-200/50 dark:border-slate-800/50">
      {/* Premium Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-500/5 dark:shadow-2xl border border-slate-200/80 dark:border-slate-700/50 flex flex-col md:flex-row">
          
          {/* Left: Content */}
          <div className="p-8 md:p-16 flex-1 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 w-fit border border-rose-100 dark:border-rose-500/20 shadow-sm"
            >
              Darmowy E-book
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
            >
              5 Błędów UX, które <span className="font-bold text-gradient">zabijają Twoją konwersję</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-700 dark:text-slate-300 mb-10 font-light leading-relaxed text-lg"
            >
              Pobierz moją autorską checklistę i sprawdź, czy Twój landing page nie traci klientów przez proste błędy. 
              To te same punkty, które sprawdzam podczas płatnych audytów.
            </motion.p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Checklista 25 punktów krytycznych",
                "Przykłady dobrych i złych praktyk",
                "Bonus: Lista narzędzi AI do optymalizacji"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-light"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-500/20">
                    <CheckCircle2 className="h-4 w-4 text-rose-500" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>

            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                {errorMessage}
              </motion.div>
            )}

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 flex items-center gap-4 text-emerald-600 dark:text-emerald-400"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">Sukces! Sprawdź skrzynkę.</div>
                  <div className="text-sm opacity-80 font-light">E-book powinien dotrzeć w ciągu 5 minut.</div>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-1 group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Twój najlepszy email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-600/50 text-white rounded-2xl px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-3 whitespace-nowrap group"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Pobierz E-book
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-xs text-slate-600 dark:text-slate-300 mt-6 font-light"
            >
              Zero spamu. Możesz się wypisać w każdej chwili.
            </motion.p>
          </div>

          {/* Right: Visual */}
          <div className="bg-slate-100 dark:bg-slate-800/50 w-full md:w-2/5 relative min-h-[400px] md:min-h-0 overflow-hidden border-l border-slate-200/50 dark:border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/ebook-cover/600/800" 
              alt="E-book Cover" 
              width="600"
              height="800"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 p-8">
              <motion.div 
                initial={{ y: 30, rotate: -5, opacity: 0 }}
                whileInView={{ y: 0, rotate: -5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-48 h-64 bg-white shadow-2xl rounded-r-xl border-l-8 border-rose-600 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group hover:rotate-0 transition-transform duration-500"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 relative z-10">E-BOOK</div>
                <div className="text-4xl font-display font-black text-slate-900 leading-none mb-2 relative z-10">UX</div>
                <div className="text-sm font-bold text-rose-500 tracking-widest relative z-10">AUDIT</div>
                <div className="mt-auto w-full h-1 bg-slate-100 rounded-full overflow-hidden relative z-10">
                  <div className="w-1/3 h-full bg-rose-600" />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
