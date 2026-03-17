import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ArrowRight, ArrowLeft, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithBlur } from "./ImageWithBlur";

export const Testimonials = () => {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: "1",
      name: "Anna Nowak",
      role: "Marketing Manager, EcoStyle",
      content: i18n.language === 'pl'
        ? "Współpraca z Katarzyną to była świetna inwestycja. Jej strategiczne podejście do UX sprawiło, że nasi klienci szybciej podejmują decyzje zakupowe. Nowy landing page zwiększył naszą konwersję o rekordowe 40%."
        : "Working with Katarzyna was a great investment. Her strategic approach to UX made our customers make purchasing decisions faster. The new landing page increased our conversion by a record 40%.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      projectImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800&h=600",
      projectLink: "#",
      linkedInUrl: "#",
    },
    {
      id: "2",
      name: "Marek Kowalski",
      role: "CEO, TechFlow",
      content: i18n.language === 'pl'
        ? "Współpraca z Katarzyną to czysta przyjemność. Jej podejście do UX zmieniło sposób, w jaki nasi klienci postrzegają nasz produkt. Landing page, który dla nas zaprojektowała, zwiększył naszą konwersję o ponad 40%."
        : "Working with Katarzyna is a pure pleasure. Her approach to UX changed the way our customers perceive our product. The landing page she designed for us increased our conversion by over 40%.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
      projectImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800&h=600",
      projectLink: "#",
      linkedInUrl: "#",
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = testimonials.length - 1;
        if (next >= testimonials.length) next = 0;
        return next;
      });
    },
    [testimonials.length]
  );

  const highlightMetrics = (text: string) => {
    const regex = /(\d+%)/g;
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-rose-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="testimonials">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-50/50 via-white to-white dark:from-rose-900/10 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-rose-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            {i18n.language === 'pl' ? 'Referencje' : 'Testimonials'}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-display font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            {i18n.language === 'pl' ? (
              <>Zobacz, jak pomagam rosnąć <br className="hidden sm:block" />
              <span className="font-bold text-gradient">moim partnerom</span></>
            ) : (
              <>See how I help my <br className="hidden sm:block" />
              <span className="font-bold text-gradient">partners grow</span></>
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
              ? 'Dowiedz się, jak design napędza wzrost i buduje przewagę konkurencyjną.'
              : 'Learn how design drives growth and builds competitive advantage.'}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto relative lg:px-20">
          {testimonials.length > 0 && (
            <div className="relative">
              {/* Desktop Left Arrow */}
              {testimonials.length > 1 && (
                <div className="hidden lg:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-20">
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-rose-500/20"
                    onClick={() => paginate(-1)}
                    aria-label="Poprzednia opinia"
                  >
                    <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
              {/* Desktop Right Arrow */}
              {testimonials.length > 1 && (
                <div className="hidden lg:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-20">
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-rose-500/20"
                    onClick={() => paginate(1)}
                    aria-label="Następna opinia"
                  >
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              <div className="relative h-auto min-h-[600px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) paginate(1);
                      else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    }}
                    className="w-full absolute top-0 left-0"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                      {/* Left Column: Project Visualization */}
                      <div className="relative group">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900">
                          <div className="aspect-[4/3] relative">
                            <ImageWithBlur
                              src={testimonials[currentIndex].projectImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600"}
                              alt={`Projekt dla ${testimonials[currentIndex].name}`}
                              width="800"
                              height="600"
                              aspectRatio="aspect-[4/3]"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </div>
                        <div className="absolute -inset-4 bg-rose-500/5 dark:bg-rose-500/10 blur-2xl rounded-[3rem] -z-10 group-hover:bg-rose-500/10 dark:group-hover:bg-rose-500/20 transition-colors duration-500" />
                        {testimonials[currentIndex].projectLink && (
                          <a
                            href={testimonials[currentIndex].projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-6 right-6 inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-rose-500 dark:hover:text-rose-400 transition-all duration-300 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                          >
                            {i18n.language === 'pl' ? 'Odwiedź stronę' : 'Visit website'} <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {/* Right Column: Recommendation */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-6 mb-8">
                          <img
                            src={testimonials[currentIndex].avatar || `https://ui-avatars.com/api/?name=${testimonials[currentIndex].name}&background=random`}
                            alt={testimonials[currentIndex].name}
                            loading="lazy"
                            decoding="async"
                            width="80"
                            height="80"
                            className="h-20 w-20 rounded-full object-cover border-2 border-rose-100 dark:border-rose-500/30 ring-4 ring-rose-50 dark:ring-rose-500/10 shadow-xl shadow-rose-500/10 transition-all"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                {testimonials[currentIndex].name}
                              </h3>
                              {testimonials[currentIndex].linkedInUrl && (
                                <a
                                  href={testimonials[currentIndex].linkedInUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-[#0A66C2] transition-colors"
                                  aria-label={`LinkedIn ${testimonials[currentIndex].name}`}
                                >
                                  <Linkedin className="h-5 w-5 opacity-70 hover:opacity-100" />
                                </a>
                              )}
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">
                              {testimonials[currentIndex].role}
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <Quote className="absolute -top-4 -left-4 h-10 w-10 text-rose-500/20 dark:text-rose-500/30 rotate-180" />
                          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light relative z-10 italic">
                            "{highlightMetrics(testimonials[currentIndex].content)}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex lg:hidden items-center justify-between mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
              <div className="flex items-center gap-4">
                <div className="font-mono text-sm font-medium text-slate-900 dark:text-white tracking-widest">
                  {String(currentIndex + 1).padStart(2, "0")}
                  <span className="text-slate-400 mx-1">/</span>
                  <span className="text-slate-400">{String(testimonials.length).padStart(2, "0")}</span>
                </div>
                <div className="w-16 sm:w-32 h-px bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 group shadow-sm"
                  onClick={() => paginate(-1)}
                  aria-label="Poprzednia opinia"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 group shadow-sm"
                  onClick={() => paginate(1)}
                  aria-label="Następna opinia"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
