import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: i18n.language === 'pl' 
        ? "Jak długo trwa wdrożenie?" 
        : "How long does the implementation take?",
      answer: i18n.language === 'pl'
        ? "Standardowy projekt landing page realizuję w ciągu 2-4 tygodni. Dzięki wykorzystaniu narzędzi AI i platform No-Code, proces jest znacznie szybszy niż w tradycyjnym modelu software house, przy zachowaniu najwyższej jakości."
        : "I deliver a standard landing page project within 2-4 weeks. Thanks to AI tools and No-Code platforms, the process is much faster than a traditional software house model while maintaining the highest quality.",
    },
    {
      question: i18n.language === 'pl'
        ? "Czy muszę znać się na AI, aby współpracować?"
        : "Do I need to know about AI to work with you?",
      answer: i18n.language === 'pl'
        ? "Absolutnie nie. To ja zajmuję się implementacją i wykorzystaniem narzędzi AI, aby Twój projekt był lepszy i tańszy. Ty otrzymujesz gotowy, działający produkt, który jest łatwy w obsłudze."
        : "Absolutely not. I handle the implementation and use of AI tools to make your project better and cheaper. You receive a finished, working product that is easy to use.",
    },
    {
      question: i18n.language === 'pl'
        ? "Dlaczego wybierasz Framer zamiast WordPress?"
        : "Why do you choose Framer over WordPress?",
      answer: i18n.language === 'pl'
        ? "Framer oferuje niespotykaną szybkość działania, płynne animacje i brak długu technicznego związanego z wtyczkami. To nowoczesne rozwiązanie, które pozwala na pełną swobodę projektową bez kompromisów w wydajności."
        : "Framer offers unprecedented speed, smooth animations, and no technical debt associated with plugins. It's a modern solution that allows full design freedom without compromising performance.",
    },
    {
      question: i18n.language === 'pl'
        ? "Czy mogę sam zarządzać stroną?"
        : "Can I manage the website myself?",
      answer: i18n.language === 'pl'
        ? "Tak! Wdrażam strony na platformach No-Code (Framer/Webflow), które posiadają intuicyjny system CMS. Po zakończeniu projektu otrzymasz ode mnie nagranie instruktażowe, które pokaże Ci jak edytować treści w 5 minut."
        : "Yes! I deploy websites on No-Code platforms (Framer/Webflow) that have an intuitive CMS system. After the project is finished, you'll receive a tutorial video showing you how to edit content in 5 minutes.",
    },
    {
      question: i18n.language === 'pl'
        ? "Jak wygląda własność praw autorskich?"
        : "How does copyright ownership work?",
      answer: i18n.language === 'pl' // Replaced with source text from GIERALT_16.03
        ? "Masz 100% praw do projektu i wdrożenia. Nie zostawiam żadnych backdoorów ani zależności. Możesz dowolnie modyfikować stronę w przyszłości."
        : "You have 100% rights to the design and implementation. I don't leave any backdoors or dependencies. You can freely modify the site in the future.",
    },
    {
      question: i18n.language === 'pl'
        ? "Czy mogę wprowadzać poprawki?"
        : "Can I make revisions?",
      answer: i18n.language === 'pl'
        ? "Tak. W każdym pakiecie masz 2 rundy poprawek, co pozwala nam korygować kurs na bieżąco, by finalny efekt był w 100% zgodny z Twoim celem biznesowym."
        : "Yes. Every package includes 2 revision rounds, allowing us to adjust the course on the fly so the final result 100% aligns with your business goals.",
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="faq">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center">
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
            {i18n.language === 'pl' ? (
              <>Częste <span className="font-bold text-gradient">pytania</span></>
            ) : (
              <>Frequent <span className="font-bold text-gradient">Questions</span></>
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
              ? "Wątpliwości? Rozwiejmy je od razu."
              : "Doubts? Let's clear them up right away."}
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
};
