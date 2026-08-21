import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  skills: string[];
  icon: React.ReactNode;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'syncsas',
    role: 'Full Stack Developer Intern',
    company: 'SyncSaS Technologies',
    period: 'Jun 2024 - Present',
    location: 'Remote / Nagpur, India',
    type: 'Internship',
    description: [
      'Designed and engineered scalable REST APIs using Node.js, Express, and PostgreSQL/Prisma database layers.',
      'Developed responsive, high-fidelity landing pages and administrative dashboards using React, Vite, and Tailwind CSS.',
      'Implemented real-time data streaming features with Socket.IO for telemetry visualizations and system health monitoring.',
      'Containerized development environments with Docker to streamline team workflows and local configurations.'
    ],
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Docker', 'Tailwind CSS'],
    icon: <Briefcase className="w-5 h-5 text-[#00D4FF]" />
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative min-h-[70vh] w-full py-20 sm:py-24 lg:py-28 overflow-hidden z-10">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-[#6C3BFF]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-[#00D4FF]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-10 sm:mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">04 / Journey</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Professional Experience<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        {/* Timeline Layout */}
        <ScrollReveal className="relative max-w-4xl mx-auto" delay={0.08}>
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6C3BFF] via-[#00D4FF]/50 to-transparent" />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon Node Indicator */}
                  <div className="absolute left-[7px] md:left-1/2 -translate-x-[1px] md:-translate-x-1/2 top-2 md:top-auto w-8 h-8 rounded-full bg-[#050505] border-2 border-[#6C3BFF] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(108,59,255,0.4)]">
                    {item.icon}
                  </div>

                  {/* Card Content Side */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#0c0c16] to-[#05050a] hover:border-[#6C3BFF]/30 transition-all duration-300 relative group overflow-hidden"
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                    >
                      {/* Interactive Light Spot on Hover */}
                      <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#6C3BFF]/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Period & Type */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#00D4FF] font-mono font-bold uppercase tracking-wider bg-[#00D4FF]/10 px-2.5 py-1 rounded-md border border-[#00D4FF]/25">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>

                      {/* Header Title */}
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#7DF9FF] transition-colors text-left">
                        {item.role}
                      </h3>
                      
                      {/* Company Name */}
                      <h4 className="text-sm font-semibold font-mono text-gray-400 uppercase tracking-wide mb-2 text-left">
                        {item.company}
                      </h4>
                      
                      <span className="text-xs text-gray-500 block mb-6 text-left">{item.location}</span>

                      {/* Description Bullet Points */}
                      <ul className="flex flex-col gap-3.5 mb-6 text-left">
                        {item.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Applied Skills Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {item.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 uppercase"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
