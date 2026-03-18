import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GuaranteeBadgeProps {
  label?: string;
  tooltipText?: string;
}

export function GuaranteeBadge({ 
  label, 
  tooltipText 
}: GuaranteeBadgeProps) {
  const { t } = useTranslation();
  const displayLabel = label || t('hero.qualityBadge.label');
  const displayTooltip = tooltipText || t('hero.qualityBadge.tooltip');

  return (
    <div className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest font-bold px-8 py-5 flex items-center gap-3 w-full sm:w-auto justify-center group/badge cursor-default">
      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center transition-colors">
        <CheckCircle className="h-4 w-4 text-emerald-500" />
      </div>
      <div className="flex flex-col items-start relative">
        <span className="border-b border-dashed border-zinc-300 dark:border-zinc-700 pb-0.5 relative">
          {displayLabel}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-md opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none shadow-xl tracking-normal normal-case z-20">
            {displayTooltip}
            <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-zinc-800"></div>
          </div>
        </span>
      </div>
    </div>
  );
}


