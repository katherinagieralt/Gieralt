import { motion } from "motion/react";

export function PearlBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700" />

      {/* Pearl Sheen Layers - Light Mode */}
      <div className="absolute inset-0 opacity-30 dark:opacity-0 transition-opacity duration-700">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-rose-100/40 via-blue-100/30 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-blue-100/40 via-rose-100/30 to-transparent blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]" />
      </div>

      {/* Pearl Sheen Layers - Dark Mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-40 transition-opacity duration-700">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-5%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(83,66,141,0.15)_0%,transparent_70%)] blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(229,95,95,0.1)_0%,transparent_70%)] blur-[100px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(136,122,177,0.05),transparent_50%)]" />
      </div>

      {/* Iridescent Overlay (Noise/Grain for texture) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}


