import { motion } from "motion/react";

export function TrustBar() {
  const logos = [
    "Startup FinTech",
    "SaaS B2B",
    "E-commerce",
    "Agencja Marketingowa",
    "App Mobile",
    "Portal Edukacyjny"
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-slate-100/50 dark:bg-slate-900/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] mb-12"
        >
          Zaufali mi liderzy innowacji
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-700">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative"
            >
              <span className="text-slate-400 dark:text-slate-500 font-display font-light text-xl sm:text-2xl tracking-tight transition-all duration-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-105 inline-block">
                {logo}
              </span>
              <div className="absolute -bottom-3 left-0 w-0 h-px bg-gradient-to-r from-rose-500/50 to-blue-500/50 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
