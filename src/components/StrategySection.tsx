import { motion } from "motion/react";
import { Shield, Zap, Layout, MessageSquare, Figma, Github, Database, ClipboardList } from "lucide-react";

export function StrategySection() {
  const workflowItems = [
    { name: "SLACK", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "FIGMA", icon: <Figma className="w-5 h-5" /> },
    { name: "GITHUB", icon: <Github className="w-5 h-5" /> },
    { name: "NOTION", icon: <ClipboardList className="w-5 h-5" /> },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-16 relative overflow-hidden transition-colors duration-300" id="strategy">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm w-fit"
                >
                  <Shield className="w-3 h-3" /> Strategia & Zaufanie
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
                >
                  Projektuję ścieżki konwersji, które <span className="font-bold text-gradient">Twoi klienci pokochają.</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed mb-8"
                >
                  Wdrożenie No-Code (Framer/Webflow) i Design Systems. Tworzę rozwiązania, które nie tylko wyglądają premium, ale przede wszystkim realizują Twoje cele biznesowe.
                </motion.p>
              </div>

              {/* Right Content: Workflow Box */}
              <div className="lg:col-span-5">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/20 dark:shadow-none"
                >
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-rose-500" /> Workflow dostosowany do:
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {workflowItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-rose-500/30 transition-all duration-300"
                      >
                        <div className="text-slate-400 group-hover:text-rose-500 transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Layout className="w-4 h-4 text-blue-500" />
                      <span>Design Systems & No-Code Expert</span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
