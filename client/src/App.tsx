import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Certificate';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LenisProvider } from './components/LenisProvider';
import { ScrollProgress } from './components/ScrollProgress';

// Lazy load heavy WebGL 3D Canvas
const CyberSphere = React.lazy(() =>
  import('./components/3d/CyberSphere').then((module) => ({ default: module.CyberSphere }))
);

// Main Landing Page Assembly
const PortfolioHome: React.FC = () => {
  return (
    <LenisProvider>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </LenisProvider>
  );
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Interactive elements activate the ambient background glow.
  useEffect(() => {
    const handleInteractiveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleInteractiveHover, { passive: true });
    return () => {
      window.removeEventListener('mouseover', handleInteractiveHover);
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-[#050505] text-[#F3F4F6] overflow-x-hidden selection:bg-[#6C3BFF]/30 selection:text-[#7DF9FF] noise-bg">
        
        <ScrollProgress />
        <div className="interactive-background-glow pointer-events-none fixed z-0" />

        {/* 3D Scene - Runs globally behind sections */}
        {!isLoading && (
          <React.Suspense fallback={null}>
            <CyberSphere />
          </React.Suspense>
        )}

        {/* Preloader */}
        <LoadingScreen onComplete={() => setIsLoading(false)} />

        {/* Router Paths */}
        {!isLoading && (
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<PortfolioHome />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};
export default App;
