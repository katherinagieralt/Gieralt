import { motion } from "motion/react";
import { FileText, Layout, Code, Rocket, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Process = () => {
  const { t } = useTranslation();

  const steps = [
    {
      stage: t('process.steps.s1.stage'),
      title: t('process.steps.s1.title'),
      desc: t('process.steps.s1.desc'),
      deliverable: t('process.steps.s1.deliverable'),
      icon: FileText,
      theme: {
        bg: "bg-blue-600",
        text: "text-blue-700 dark:text-blue-300",
        lightBg: "bg-blue-100/50 dark:bg-blue-500/20",
        hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-500/30",
        groupHoverText: "group-hover:text-blue-800 dark:group-hover:text-blue-200",
        shadow: "hover:shadow-blue-500/20",
      },
    },
    {
      stage: t('process.steps.s2.stage'),
      title: t('process.steps.s2.title'),
      desc: t('process.steps.s2.desc'),
      deliverable: t('process.steps.s2.deliverable'),
      icon: Layout,
      theme: {
        bg: "bg-purple-600",
        text: "text-purple-700 dark:text-purple-300",
        lightBg: "bg-purple-100/50 dark:bg-purple-500/20",
        hoverBg: "group-hover:bg-purple-100 dark:group-hover:bg-purple-500/30",
        groupHoverText: "group-hover:text-purple-800 dark:group-hover:text-purple-200",
        shadow: "hover:shadow-purple-500/20",
      },
    },
    {
      stage: t('process.steps.s3.stage'),
      title: t('process.steps.s3.title'),
      desc: t('process.steps.s3.desc'),
      deliverable: t('process.steps.s3.deliverable'),
      icon: Palette,
      theme: {
        bg: "bg-rose-600",
        text: "text-rose-700 dark:text-rose-300",
        lightBg: "bg-rose-100/50 dark:bg-rose-500/20",
        hoverBg: "group-hover:bg-rose-100 dark:group-hover:bg-rose-500/30",
        groupHoverText: "group-hover:text-rose-800 dark:group-hover:text-rose-200",
        shadow: "hover:shadow-rose-500/20",
      },
    },
    {
      stage: t('process.steps.s4.stage'),
      title: t('process.steps.s4.title'),
      desc: t('process.steps.s4.desc'),
      deliverable: t('process.steps.s4.deliverable'),
      icon: Code,
      theme: {
        bg: "bg-amber-600",
        text: "text-amber-800 dark:text-amber-300",
        lightBg: "bg-amber-100/50 dark:bg-amber-500/20",
        hoverBg: "group-hover:bg-amber-100 dark:group-hover:bg-amber-500/30",
        groupHoverText: "group-hover:text-amber-900 dark:group-hover:text-amber-200",
        shadow: "hover:shadow-amber-500/20",
      },
    },
    {
      stage: t('process.steps.s5.stage'),
      title: t('process.steps.s5.title'),
      desc: t('process.steps.s5.desc'),
      deliverable: t('process.steps.s5.deliverable'),
      icon: Rocket,
      theme: {
        bg: "bg-emerald-600",
        text: "text-emerald-700 dark:text-emerald-300",
        lightBg: "bg-emerald-100/50 dark:bg-emerald-500/20",
        hoverBg: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/30",
        groupHoverText: "group-hover:text-emerald-800 dark:group-hover:text-emerald-200",
        shadow: "hover:shadow-emerald-500/20",
      },
    },
  ];

  return (
    <section className="relative overflow-hidden transition-colors duration-300" id="process">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 uppercase tracking-[0.3em] font-bold text-[10px] mb-10 shadow-sm"
          >
            <span>{t('process.badge')}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-zinc-900 dark:text-white tracking-tighter mb-8 relative"
          >
            {t('process.title.line1')} <span className="font-bold text-gradient">{t('process.title.highlight')}</span> <br />
            <span className="text-2xl sm:text-3xl opacity-80">{t('process.title.subtitle')}</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {t('process.subtext')}
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800/50" />

          {/* Steps Container */}
          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon Marker (Desktop only) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-50 dark:border-zinc-900 shadow-xl z-10 transition-transform duration-500 hover:scale-125">
                  <div className={`w-4 h-4 rounded-full ${step.theme.bg} shadow-lg`} />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] p-10 bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 rounded-[3rem] hover:shadow-2xl ${step.theme.shadow} md:hover:-translate-y-2 transition-all duration-500 group backdrop-blur-3xl`}>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${step.theme.text} ${step.theme.lightBg}`}>
                      {step.stage}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center ${step.theme.hoverBg} transition-all duration-500 group-hover:rotate-12`}>
                      <step.icon className={`h-6 w-6 text-zinc-400 ${step.theme.groupHoverText} transition-colors`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-medium text-zinc-900 dark:text-white mb-4 group-hover:text-rose-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-base font-light leading-relaxed mb-8">
                    {step.desc}
                  </p>
                  
                  <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest ${step.theme.text} ${step.theme.lightBg} px-5 py-3.5 rounded-2xl w-fit ${step.theme.hoverBg} transition-all duration-300 border border-transparent group-hover:border-white/20`}>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-current" />
                    <span>{t('process.deliverableLabel')}: {step.deliverable}</span>
                  </div>
                </div>

                {/* Empty space for the other side on desktop */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
