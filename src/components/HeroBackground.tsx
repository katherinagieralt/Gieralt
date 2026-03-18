import { motion, MotionValue } from "motion/react";

interface HeroBackgroundProps {
  y1: MotionValue<number>;
}

export function HeroBackground({ y1 }: HeroBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs - Refined to barely visible Accent Color (Rose) */}
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            x: [0, 60, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[100%] h-[70%] bg-rose-500/3 dark:bg-rose-500/5 blur-[180px] rounded-full" 
        />
        
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            x: [0, -40, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1.02, 0.98, 1.05, 1.02],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[10%] w-[90%] h-[60%] bg-rose-500/2 dark:bg-rose-500/4 blur-[160px] rounded-full" 
        />

        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            x: [0, 20, -40, 0],
            y: [0, -50, 10, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[20%] w-[80%] h-[50%] bg-rose-500/2 dark:bg-rose-500/3 blur-[200px] rounded-full" 
        />

        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [0.95, 1.02, 0.95],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[10%] w-[110%] h-[60%] bg-rose-500/2 dark:bg-rose-500/4 blur-[170px] rounded-full" 
        />
      </div>
      
      {/* Grid Pattern Overlay - Ultra subtle accent tone */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjI5LCA5NSwgOTUsIDAuMDMpIi8+PC9zdmc+')] opacity-20 dark:opacity-5 pointer-events-none" />
      
      {/* Subtle Grain over the gradient */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </>
  );
}


