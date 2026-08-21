import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Award, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const STATS = [
  { value: '3+', label: 'Years Learning' },
  { value: '25+', label: 'Projects Completed' },
  { value: '18+', label: 'Tech Stack Skills' },
  { value: '10+', label: 'Certificates Earned' },
];

const TIMELINE_EXPERIENCE = [
  {
    role: 'Full Stack Engineer (Contract / Freelance)',
    company: 'Independent Systems Developer',
    period: '2024 - Present',
    desc: 'Designing client websites, creating scalable Node.js/Express backend APIs, and implementing responsive React interfaces with database systems.',
  },
  {
    role: 'Software Development Trainee',
    company: 'Tech Internships',
    period: '2023 - 2024',
    desc: 'Practiced system design, learned complex database queries on PostgreSQL/MongoDB, built Zerodha clone, and implemented REST endpoints.',
  },
];

const TIMELINE_EDUCATION = [
  {
    degree: 'Bachelor of Engineering (B.E.)',
    school: 'Engineering College, Nagpur',
    period: '2022 - 2026',
    desc: 'Specializing in Computer Science. Focus on core algorithms, object-oriented programming (Java/C++), system design, and database architectures.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    school: 'Science College, Nagpur',
    period: '2020 - 2022',
    desc: 'Core coursework in Physics, Chemistry, and Advanced Mathematics.',
  },
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const timelineData = activeTab === 'experience' ? TIMELINE_EXPERIENCE : TIMELINE_EDUCATION;

  return (
    <section id="about" className="relative min-h-screen w-full py-20 sm:py-24 lg:py-28 overflow-hidden z-10">
      {/* Visual background blurs */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-[#6C3BFF]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full bg-[#00D4FF]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-10 sm:mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">01 / Profile</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            About Me<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Stats and Info */}
          <ScrollReveal className="lg:col-span-6 flex flex-col gap-8" direction="left">
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
              {/* Aurora overlay inside box */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#6C3BFF]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-[#7DF9FF] w-5 h-5" />
                <span className="text-sm font-semibold tracking-wider font-mono text-gray-400">Nagpur, India</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Hey, I'm Sai Bhoyar
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                I am a passionate Full Stack Developer focused on building robust, scalable applications, and efficient backend architectures. My development interests lie heavily in microservices, secure RESTful APIs, modern databases, systems integration, and clean frontend UI implementation.
              </p>
              
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Whether deploying containerized applications, scaling MongoDB clusters, or crafting smooth CSS animations, my goal is always to engineer fast, maintainable, and visual experiences that satisfy modern web demands.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#6C3BFF]/30 transition-colors"
                >
                  <span className="text-3xl md:text-4xl font-extrabold text-gradient-cyan-neon mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Timelines */}
          <ScrollReveal className="lg:col-span-6 flex flex-col gap-6" direction="right" delay={0.08}>
            {/* Timeline Tab Switches */}
            <div className="flex w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl p-1 self-start">
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Education
              </button>
            </div>

            {/* Dynamic Timeline Lists */}
            <div className="flex flex-col gap-6 pl-4 border-l border-white/10 relative mt-4">
              {timelineData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative pl-6 flex flex-col items-start text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                >
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[23px] top-1 w-[12px] h-[12px] rounded-full bg-[#6C3BFF] border-2 border-[#050505] shadow-[0_0_10px_#6C3BFF]" />

                  {/* Period badge */}
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#6C3BFF]/20 border border-[#6C3BFF]/30 text-[#7DF9FF] mb-2 uppercase">
                    {item.period}
                  </span>

                  {/* Title */}
                  <h4 className="text-base font-bold text-white mb-0.5">
                    {'role' in item ? item.role : item.degree}
                  </h4>

                  {/* Subtext */}
                  <h5 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    {'company' in item ? item.company : item.school}
                  </h5>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
