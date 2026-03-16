import React from 'react';
import { motion } from 'motion/react';
import { Folder, FileText, ExternalLink, Eye, Lock } from 'lucide-react';

interface ResourcesListProps {
  project: any;
}

export function ResourcesList({ project }: ResourcesListProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-semibold">Zasoby i Pliki</h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zarządzanie plikami</span>
      </div>

      <div className="space-y-6">
        {/* Folders (Mock) */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Folder className="w-3 h-3" />
            Foldery projektowe
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3 group cursor-pointer hover:border-blue-200 transition-colors">
              <Folder className="w-5 h-5 text-blue-500" />
              <div className="text-xs font-medium">Design & Mockups</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3 group cursor-pointer hover:border-blue-200 transition-colors">
              <Folder className="w-5 h-5 text-amber-500" />
              <div className="text-xs font-medium">Dokumentacja</div>
            </div>
          </div>
        </div>

        {/* Files/Links */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <FileText className="w-3 h-3" />
            Wszystkie zasoby
          </div>
          {project.links.map((link: any, idx: number) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{link.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" /> Podgląd dostępny
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Tylko dla Ciebie
                    </span>
                  </div>
                </div>
              </div>
              <a 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
