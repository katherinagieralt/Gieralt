import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ProjectHeaderProps {
  project: any;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-display font-bold mb-2">{project.name}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Start: {project.startDate}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          Planowane zakończenie: {project.estimatedCompletion}
        </div>
        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full font-medium text-xs border border-blue-100 dark:border-blue-500/20">
          Status: {project.currentPhase}
        </div>
      </div>
    </div>
  );
}
