import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageSquare } from 'lucide-react';

interface ProjectProgressProps {
  project: any;
  onSendMessage: (e: React.FormEvent, phaseName?: string, directMessage?: string) => void;
}

export function ProjectProgress({ project, onSendMessage }: ProjectProgressProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <h2 className="text-xl font-display font-semibold mb-6">Postęp projektu</h2>
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span className="text-slate-600 dark:text-slate-400">Ukończono</span>
        <span className="text-blue-600 dark:text-blue-400">{project.progress}%</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-blue-500 h-3 rounded-full"
        />
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
        {project.phases.map((phase: any, index: number) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
              phase.completed 
                ? "bg-blue-500 border-blue-500 text-white" 
                : project.currentPhase === phase.name
                  ? "bg-white dark:bg-slate-900 border-blue-500 text-blue-500"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600"
            }`}>
              {phase.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
            </div>
            <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border flex justify-between items-start ${
              project.currentPhase === phase.name
                ? "bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/20 shadow-sm"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            }`}>
              <div>
                <div className={`font-medium ${
                  phase.completed ? "text-slate-900 dark:text-white" : project.currentPhase === phase.name ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {phase.name}
                </div>
                {project.currentPhase === phase.name && (
                  <div className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">Obecnie pracujemy nad tym etapem</div>
                )}
              </div>
              <button 
                onClick={() => {
                  const msg = window.prompt(`Dodaj uwagę do fazy: ${phase.name}`);
                  if (msg) {
                    onSendMessage(null as any, phase.name, msg);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                title="Dodaj uwagę do tej fazy"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
