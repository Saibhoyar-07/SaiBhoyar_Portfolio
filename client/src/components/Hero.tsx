import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Download, Code2 } from 'lucide-react';

const ROLES = [
  'Full Stack Developer',
  'Backend Developer',
  'MERN Stack Developer',
  'Node.js Developer',
  'React Developer',
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Auto-rotate roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Glows (Aurora Mesh) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-[#6C3BFF]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-[#00D4FF]/8 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        {/* Text Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Welcome Tag */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Code2 className="w-3.5 h-3.5 text-[#7DF9FF] animate-pulse" />
            <span className="text-xs font-mono text-[#F3F4F6] tracking-wider uppercase">Open to Opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            className="text-lg md:text-xl font-mono text-[#00D4FF] mb-3 tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, my name is
          </motion.h2>

          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sai Bhoyar<span className="text-[#6C3BFF]">.</span>
          </motion.h1>

          {/* Dynamic Role Swapper */}
          <div className="h-12 md:h-16 flex items-center mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gradient-cyan-neon font-sans"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROLES[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bio Brief */}
          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            A Nagpur-based Full Stack & Backend Engineer specializing in creating high-performance APIs, robust system designs, and immersive digital user interfaces.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 items-center mb-12 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] hover:brightness-110 text-white font-semibold tracking-wide text-sm flex items-center gap-2 group transition-all cursor-pointer shadow-[0_0_20px_rgba(108,59,255,0.3)] hover:shadow-[0_0_30px_rgba(108,59,255,0.5)]"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wide text-sm transition-all cursor-pointer"
            >
              Hire Me
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading resume... (Replace link with actual Resume URL)');
              }}
              className="px-6 py-3.5 rounded-xl border border-white/5 hover:border-[#6C3BFF]/30 text-gray-300 hover:text-[#7DF9FF] text-sm flex items-center gap-2 hover:bg-[#6C3BFF]/10 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            {[
              { icon: <Github className="w-5 h-5" />, url: 'https://github.com', label: 'GitHub' },
              { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <Mail className="w-5 h-5" />, url: 'mailto:sai@example.com', label: 'Email' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 hover:border-[#6C3BFF]/30 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Empty Column for 3D overlay spacing on desktop */}
        <div className="hidden lg:col-span-5 h-[350px] lg:h-[500px]" />
      </div>
    </section>
  );
};
