import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_PHRASES = [
  'Initializing workspace...',
  'Connecting to MongoDB Cluster...',
  'Loading WebGL Shaders...',
  'Compiling React components...',
  'import { Three, GSAP, Tailwind } from "skills";',
  'Initializing Sai Bhoyar API routes...',
  'Establishing socket connection...',
  'System ready.',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading time
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600); // Allow exit transition
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % TECH_PHRASES.length);
    }, 250);

    return () => clearInterval(phraseInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated Aurora Blur in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#6C3BFF]/15 blur-[80px]" />
          <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-[#00D4FF]/10 blur-[80px]" />

          {/* Loader Visuals */}
          <div className="relative flex flex-col items-center z-10">
            {/* Holographic Glowing Ring */}
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  className="stroke-[#11111e] fill-none"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="50"
                  className="stroke-[#6C3BFF] fill-none"
                  strokeWidth="4"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * progress) / 100}
                  style={{ filter: 'drop-shadow(0 0 8px #6C3BFF)' }}
                  transition={{ ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute text-2xl font-bold tracking-tight text-white font-mono">
                {Math.round(progress)}%
              </div>
            </div>

            {/* Glowing Developer Name */}
            <motion.h1
              className="text-2xl md:text-3xl font-extrabold tracking-widest font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Sai Bhoyar
            </motion.h1>
            
            <motion.div
              className="text-xs font-mono text-gray-500 tracking-wider h-5 flex items-center justify-center"
              key={phraseIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-[#00D4FF] mr-2">&gt;</span>
              {TECH_PHRASES[phraseIndex]}
            </motion.div>
          </div>

          {/* Minimalist frames */}
          <div className="absolute bottom-6 left-6 text-[10px] font-mono text-gray-600">
            PORTFOLIO v2.0 // WGL_INIT
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] font-mono text-gray-600">
            © 2026 SAI BHOYAR
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
