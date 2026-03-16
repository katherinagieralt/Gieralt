import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Dlaczego to tyle kosztuje, skoro używasz AI?",
    answer: "Bo AI to tylko pędzel, a Ty płacisz za artystę i stratega, który wie, jak go użyć, by zarobić dla Ciebie pieniądze. AI przyspiesza proces, ale to moje 10-letnie doświadczenie gwarantuje, że strona będzie konwertować.",
  },
  {
    question: "Czy mogę sam zarządzać stroną?",
    answer: "Tak. Wdrażam projekty w intuicyjnych systemach No-Code (np. Framer lub Webflow), gdzie edycja tekstów czy podmiana zdjęć jest tak prosta, jak pisanie w Wordzie. Po wdrożeniu przechodzimy krótkie szkolenie.",
  },
  {
    question: "Czy muszę mieć własny brief?",
    answer: "Absolutnie nie. Stworzymy go wspólnie podczas warsztatu strategicznego. Ty znasz swój biznes, ja wiem, o co zapytać, by przełożyć to na zyskowną stronę.",
  },
  {
    question: "Co jeśli moja branża jest specyficzna/niszowa?",
    answer: "To zaleta AI. Mogę szybko przeanalizować specyfikę Twojej branży i konkurencję, dostosować język i strukturę do Twojego targetu. Działałam już w FinTech, eCommerce, SaaS i edukacji.",
  },
  {
    question: "Jak wygląda własność praw autorskich?",
    answer: "Masz 100% praw do projektu i wdrożenia. Nie zostawiam żadnych backdoorów ani zależności. Możesz dowolnie modyfikować stronę w przyszłości.",
  },
  {
    question: "Czy mogę wprowadzać poprawki?",
    answer: "Tak. W każdym pakiecie masz 2 rundy poprawek, co pozwala nam korygować kurs na bieżąco, by finalny efekt był w 100% zgodny z Twoim celem biznesowym.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="faq">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            FAQ
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            Częste <span className="font-bold text-gradient">pytania</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Wątpliwości? Rozwiejmy je od razu.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? "bg-white dark:bg-slate-900/80 border-rose-200 dark:border-rose-500/30 shadow-xl shadow-rose-500/5" 
                  : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/50 hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors group"
              >
                <span className={`text-lg font-display font-medium pr-8 transition-colors ${
                  openIndex === index ? "text-rose-500" : "text-slate-900 dark:text-white group-hover:text-rose-500"
                }`}>
                  {faq.question}
                </span>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 shrink-0 ${
                  openIndex === index 
                    ? "bg-rose-50 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30 text-rose-500 rotate-180" 
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 group-hover:border-rose-200 dark:group-hover:border-rose-500/30 group-hover:text-rose-500"
                }`}>
                  {openIndex === index ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 sm:p-8 pt-0 text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
