import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, ShieldCheck, Zap, LineChart, 
  Layers, Database, FileText, ChevronRight, X 
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  architecture: string[];
  githubUrl: string;
  demoUrl: string;
  color: string;
  visual: React.ReactNode;
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'plugbox',
      title: 'PlugBox EV Platform',
      subtitle: 'EV Charging Infrastructure & Billing Management',
      description: 'A full-stack electric vehicle charging platform featuring real-time telemetry, transaction flows, and OCPP integrations.',
      longDescription: 'PlugBox is a comprehensive enterprise dashboard engineered to monitor, configure, and monetize electric vehicle charging networks. Using real-time WebSockets, it updates charging station metrics, active sessions, and processes RFID payments securely.',
      tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Express', 'Tailwind CSS'],
      features: [
        'Real-time charger telemetry (power, temperature, connectivity state)',
        'Unified billing infrastructure with Stripe integration',
        'Interactive map layout searching local active nodes',
        'Detailed administrator reporting & energy consumption analytics',
      ],
      architecture: [
        'React frontend styled with Tailwind CSS glassmorphism components',
        'Express REST APIs backend with socket integration',
        'MongoDB database schemas for transactions and user models',
      ],
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      color: '#6C3BFF',
      visual: (
        <div className="w-full h-full bg-[#090912] flex flex-col p-4 rounded-xl border border-white/5 relative overflow-hidden select-none font-mono">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">PLUGBOX_TELEMETRY</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
            <div className="p-2 bg-white/5 rounded border border-white/5">
              <span className="text-gray-500 block">CHARGER_01</span>
              <span className="text-[#00D4FF] font-bold">22.4 kW // ACTIVE</span>
            </div>
            <div className="p-2 bg-white/5 rounded border border-white/5">
              <span className="text-gray-500 block">TOTAL_LOAD</span>
              <span className="text-white font-bold">148.6 kWh</span>
            </div>
          </div>
          {/* Mock telemetry bar chart */}
          <div className="flex-1 flex items-end gap-1 px-1 pb-1">
            {[40, 75, 55, 90, 85, 60, 95, 70, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t overflow-hidden h-full flex flex-col justify-end">
                <div 
                  className="bg-gradient-to-t from-[#6C3BFF] to-[#00D4FF]" 
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'resumebuilder',
      title: 'AI Resume Compiler',
      subtitle: 'Real-time Markdown ATS-Friendly Builder',
      description: 'An AI-enhanced resume editor supporting live split markdown edits, custom layout compilers, and direct PDF generation.',
      longDescription: 'An ATS-optimized professional compiler tool designed to help developers create high-scoring resumes. Built-in AI prompts analyze descriptions to suggest improved action verbs and structured phrasing.',
      tags: ['TypeScript', 'React', 'Tailwind', 'Node.js', 'Markdown Parser', 'PDFGen'],
      features: [
        'Side-by-side real-time Markdown editing & print-preview compile',
        'Built-in AI advisor recommending strong keywords and skills metrics',
        'Pre-built ATS-optimized design presets matching elite industry standards',
        'One-click high-fidelity browser PDF printing configurations',
      ],
      architecture: [
        'Vite + React frontend with customizable styling panels',
        'Node.js REST layer processing custom template exports',
        'Markdown parsing engine rendering structural HTML containers',
      ],
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      color: '#00D4FF',
      visual: (
        <div className="w-full h-full bg-[#080c14] flex p-3 rounded-xl border border-white/5 relative overflow-hidden select-none font-mono">
          {/* Editor Side */}
          <div className="w-1/2 border-r border-white/5 pr-2 flex flex-col justify-between">
            <span className="text-[8px] text-gray-500">EDITOR.md</span>
            <div className="flex-1 flex flex-col gap-1.5 mt-2">
              <div className="h-2 w-11/12 bg-white/10 rounded" />
              <div className="h-2 w-5/6 bg-[#6C3BFF]/20 rounded" />
              <div className="h-2 w-4/5 bg-white/10 rounded" />
              <div className="h-2 w-10/12 bg-white/10 rounded" />
            </div>
            <span className="text-[8px] text-[#00D4FF]">AI: Checked (85%)</span>
          </div>
          {/* Sheet Preview Side */}
          <div className="w-1/2 pl-2 flex flex-col items-center justify-between">
            <span className="text-[8px] text-gray-500">PREVIEW.pdf</span>
            <div className="w-full aspect-[1/1.3] bg-white rounded p-2 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <div className="h-1.5 w-1/3 bg-black rounded" />
              <div className="h-1 w-full bg-gray-200 rounded" />
              <div className="h-1 w-5/6 bg-gray-200 rounded" />
              <div className="h-1 w-full bg-gray-200 rounded" />
              <div className="h-1 w-2/3 bg-gray-200 rounded" />
            </div>
            <span className="text-[8px] text-gray-500">Page 1 of 1</span>
          </div>
        </div>
      ),
    },
    {
      id: 'zerodha',
      title: 'Zerodha Equities Clone',
      subtitle: 'Real-time Stock Trading & Analytics Dashboard',
      description: 'A mock stock brokerage layout featuring live stock tickers, candlestick charting, and dynamic equity watchlists.',
      longDescription: 'A high-performance stock trading interface that mimics standard market dashboards. Features live interactive charts built with optimized SVG elements, custom order panels, and simulated user equity accounts.',
      tags: ['React', 'CSS Grid', 'PostgreSQL', 'Express', 'ApexCharts', 'JWT'],
      features: [
        'Live ticking simulated watchlists tracking price changes',
        'Custom interactive candlestick charting showing open/close trends',
        'Responsive buy/sell limit orders interface',
        'Dynamic portfolio asset allocation summaries',
      ],
      architecture: [
        'High-density dashboard layouts optimized for responsive grid spacing',
        'WebSockets serving simulated market ticks and transactions',
        'PostgreSQL databases tracking user equity balances and positions',
      ],
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      color: '#7DF9FF',
      visual: (
        <div className="w-full h-full bg-[#05090f] flex flex-col p-3 rounded-xl border border-white/5 relative overflow-hidden select-none font-mono">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5 text-[9px]">
            <span className="text-white">NIFTY 50</span>
            <span className="text-emerald-500">+1.24% // 24,380.50</span>
          </div>
          {/* Custom candlestick chart drawing */}
          <div className="flex-1 flex items-center justify-around gap-2 px-2 relative">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              {/* Grid Lines */}
              <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="35" x2="100" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              
              {/* Candlesticks */}
              {/* Candle 1 (Green) */}
              <line x1="15" y1="10" x2="15" y2="40" stroke="#10B981" strokeWidth="0.5" />
              <rect x="12" y="18" width="6" height="15" fill="#10B981" rx="0.5" />
              
              {/* Candle 2 (Red) */}
              <line x1="35" y1="5" x2="35" y2="35" stroke="#EF4444" strokeWidth="0.5" />
              <rect x="32" y="10" width="6" height="18" fill="#EF4444" rx="0.5" />

              {/* Candle 3 (Green) */}
              <line x1="55" y1="15" x2="55" y2="45" stroke="#10B981" strokeWidth="0.5" />
              <rect x="52" y="20" width="6" height="20" fill="#10B981" rx="0.5" />

              {/* Candle 4 (Green) */}
              <line x1="75" y1="5" x2="75" y2="30" stroke="#10B981" strokeWidth="0.5" />
              <rect x="72" y="8" width="6" height="14" fill="#10B981" rx="0.5" />
            </svg>
          </div>
          <div className="mt-2 flex items-center justify-between text-[8px] text-gray-500">
            <span>VOL: 2.8M</span>
            <span className="text-[#EF4444]">LIMIT_ORDER_TRIGGERED</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen w-full py-28 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">03 / Projects</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Featured Work<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-white/15 transition-all duration-300 relative bg-[#090910]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: projects.indexOf(project) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Aspect Ratio Box containing the Live Interactive Mockup */}
              <div className="w-full aspect-video bg-[#050508] p-4 relative overflow-hidden border-b border-white/5">
                {project.visual}
              </div>

              {/* Text content details */}
              <div className="p-6 flex flex-col flex-1 items-start text-left">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7DF9FF] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4FF] hover:text-[#7DF9FF] transition-colors cursor-pointer group/btn"
                >
                  View Case Study
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Box */}
            <motion.div
              className="w-full max-w-3xl bg-[#090912] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedProject.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-400">
                    {selectedProject.subtitle}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 text-left">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider mb-2">Project Overview</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Features Checklist */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400">
                        <Zap className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture Details */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider mb-3">System Architecture</h4>
                  <ul className="flex flex-col gap-2.5">
                    {selectedProject.architecture.map((arch, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400">
                        <Layers className="w-4 h-4 text-[#7DF9FF] shrink-0 mt-0.5" />
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5 bg-white/5">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] hover:brightness-110 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(108,59,255,0.2)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
