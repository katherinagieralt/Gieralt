import { ArrowRight } from "lucide-react";

export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  showShine?: boolean;
  variant?: 'primary' | 'outline';
}

export function PremiumButton({ children, className = "", showShine = true, variant = 'primary', ...props }: PremiumButtonProps) {
  const variantClasses = variant === 'primary' 
    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
    : 'bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-rose-500/50 hover:text-rose-500';

  return (
    <button 
      className={`
        group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden rounded-full 
        text-sm uppercase tracking-widest font-bold transition-all duration-500
        ${variantClasses} hover:scale-105 active:scale-95
        hover:shadow-[0_20px_40px_rgba(229,95,95,0.15)]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-[#09090b] 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none 
        ${className}
      `}
      {...props}
    >
      {/* Dynamic Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="relative z-10 flex items-center justify-center gap-3 w-full">
        {children}
      </span>

      {/* Refined Silk Shine effect */}
      {showShine && !props.disabled && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      )}
    </button>
  );
}


