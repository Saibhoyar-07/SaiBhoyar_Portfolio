import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, ExternalLink, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Certification {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  date: string;
  link?: string;
  linkLabel?: string;
  icon: React.ReactNode;
  gradient: string;
  color: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'analytics-vidhya',
    title: 'Certificate of Completion',
    subtitle: 'Analytics Vidhya',
    desc: 'Completed an Analytics Vidhya course. View the official certificate to verify this credential.',
    date: 'Verified',
    link: 'https://courses.analyticsvidhya.com/certificates/rdugzdnjnb',
    icon: <Award className="w-5 h-5 text-[#7DF9FF]" />,
    gradient: 'from-[#00D4FF]/20 to-[#6C3BFF]/20',
    color: '#00D4FF'
  },
  {
    id: 'hackathon',
    title: 'Full-Stack Web Development',
    subtitle: 'Apna College',
    desc: 'Completed full-stack web development training, covering the practical skills needed to build modern web applications.',
    date: 'Verified',
    link: '/certificates/certificate-sigma-60-681cba9a8c8e8811e50bf560.pdf',
    icon: <Trophy className="w-5 h-5 text-[#7DF9FF]" />,
    gradient: 'from-[#00D4FF]/20 to-[#6C3BFF]/20',
    color: '#00D4FF'
  },
  {
    id: 'research',
    title: 'Alpha (DSA with Java)',
    subtitle: 'Apna College',
    desc: 'Completed the Alpha course in data structures and algorithms using Java.',
    date: 'Completed',
    link: '/certificates/alpha-certificate.pdf',
    linkLabel: 'verify',
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
    gradient: 'from-[#6C3BFF]/20 to-pink-500/20',
    color: '#6C3BFF'
  }
];

export const Achievements: React.FC = () => {
  return (
    <section id="certifications" className="relative min-h-[70vh] w-full py-20 sm:py-24 lg:py-28 overflow-hidden z-10">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-[#6C3BFF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-10 sm:mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">05 / Credentials</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Certifications<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {CERTIFICATIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/5 bg-[#090910] hover:border-white/10 transition-all duration-300 relative group flex flex-col justify-between items-start text-left overflow-hidden"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {/* Corner Glow based on card's color */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${item.color}33 0%, transparent 70%)` }}
              />

              <div className="w-full">
                {/* Icon & Year */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-500 font-bold bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-md">
                    {item.date}
                  </span>
                </div>

                {/* Header Title */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#7DF9FF] transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {item.subtitle}
                </h4>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Decorative certification badge */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider font-semibold pt-4 border-t border-white/5 w-full mt-auto">
                <Award className="w-3.5 h-3.5 text-[#6C3BFF]" />
                <span>Verified Certification</span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Verify ${item.title}`}
                    className="ml-auto inline-flex items-center gap-1 text-[#7DF9FF] hover:text-white transition-colors"
                  >
                    {item.linkLabel ?? 'Verify'} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
