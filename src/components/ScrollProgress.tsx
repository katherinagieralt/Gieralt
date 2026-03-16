import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-blue-500 origin-left z-[60] shadow-[0_0_10px_rgba(99,102,241,0.5)]"
      style={{ scaleX }}
    />
  );
}
