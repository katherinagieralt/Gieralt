import { motion } from "motion/react";

export function Stats() {
  const stats = [
    { number: "15+", label: "Projektów" },
    { number: "200%", label: "Średnia poprawa konwersji" },
    { number: "5-7", label: "Dni realizacji" },
    { number: "100%", label: "Zadowolonych klientów" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-rose-500/5 dark:bg-rose-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center group"
            >
              <div className="text-6xl sm:text-7xl font-display font-thin text-slate-900 dark:text-white mb-4 transition-transform duration-700 group-hover:scale-105 tracking-tighter">
                {stat.number}
              </div>
              <div className="h-px w-8 bg-rose-500/30 mb-4 group-hover:w-12 transition-all duration-500" />
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] group-hover:text-rose-500 transition-colors duration-500 max-w-[150px] leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
