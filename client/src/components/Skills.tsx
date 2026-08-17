import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Server, Database, Laptop, Wrench, Bot, 
  Terminal, Layers, Lock, Cpu, Globe, GitFork
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Skill {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    icon: <Laptop className="w-5 h-5 text-[#00D4FF]" />,
    skills: [
      { name: 'React', level: 92 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Backend & Security',
    icon: <Server className="w-5 h-5 text-[#6C3BFF]" />,
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 92 },
      { name: 'REST APIs', level: 95 },
      { name: 'JWT & Auth', level: 88 },
    ],
  },
  {
    title: 'Databases & ORMs',
    icon: <Database className="w-5 h-5 text-[#7DF9FF]" />,
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Prisma ORM', level: 85 },
    ],
  },
  {
    title: 'Languages',
    icon: <Code className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 95 },
      { name: 'C / C++', level: 75 },
    ],
  },
  {
    title: 'Developer Tools',
    icon: <Wrench className="w-5 h-5 text-blue-400" />,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code & Postman', level: 92 },
      { name: 'Docker', level: 78 },
    ],
  },
  {
    title: 'Advanced & System Design',
    icon: <Bot className="w-5 h-5 text-emerald-400" />,
    skills: [
      { name: 'System Design', level: 80 },
      { name: 'MQTT & WebSockets', level: 85 },
      { name: 'AI Prompts & APIs', level: 90 },
    ],
  },
];

// Interactive Card component featuring mouse cursor mesh effects
const TiltCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS custom properties for hover lights
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Dynamic rotation parameters
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden transition-all duration-300 group hover:border-[#6C3BFF]/30 select-none bg-gradient-to-br from-[#0c0c16] to-[#05050a]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Light glow overlay tracking mouse */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(108, 59, 255, 0.08), transparent 85%)`
        }}
      />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          {category.icon}
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">
          {category.title}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {category.skills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-gray-400">
              <span>{skill.name}</span>
              <span className="font-mono text-[#00D4FF]">{skill.level}%</span>
            </div>
            
            {/* Outer Progress Bar Track */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF]"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                style={{ filter: 'drop-shadow(0 0 2px rgba(108,59,255,0.4))' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative min-h-screen w-full py-28 overflow-hidden z-10">
      {/* Aurora Blurs */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-[#6C3BFF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">02 / Expertise</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Technical Stack<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.08}>
              <TiltCard category={category} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
