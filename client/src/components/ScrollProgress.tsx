import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-[#6C3BFF] via-[#00D4FF] to-[#7DF9FF] shadow-[0_0_12px_rgba(0,212,255,0.75)]"
      style={{ scaleX }}
    />
  );
};
