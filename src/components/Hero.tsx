'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Bot, 
  FileText
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onOpenCopilot: () => void;
}

/**
 * Hero Component
 * 
 * Serves as the landing view of the portfolio.
 * Focuses on Yousef's engineering profile, dynamic typewriter specialties,
 * core statistics, and primary call-to-actions.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCopilot }) => {
  // =========================================================================
  // TYPEWRITER STATE MACHINE
  // =========================================================================
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotating specialties
  const phrases = [
    "Full-Stack Web & Next.js Applications",
    "React Native Mobile Development",
    "GCP Cloud Run & Terraform (IaC)",
    "PostgreSQL, Prisma & GraphQL Backends"
  ];

  /**
   * Typewriter and backspacing animation loop
   */
  useEffect(() => {
    const currentPhrase = phrases[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedText.length > 0) {
      // Backspacing
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingIndex, phrases]);

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/40 text-xs text-slate-300 shadow-sm shadow-cyan-950">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-200">
            {portfolioData.profile.statusBadge}
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">{portfolioData.profile.name}</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-slate-300">
            Full-Stack Web Developer & AI Systems Engineer
          </p>
          
          {/* Dynamic Typewriter Banner */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <span className="text-slate-400 text-lg sm:text-2xl font-mono mr-2">&gt;</span>
            <span className="text-lg sm:text-2xl font-mono font-medium text-cyan-300">
              {displayedText}
            </span>
            <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse" />
          </div>
        </div>

        {/* Bio Paragraph */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {portfolioData.profile.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View Experience & Skills</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </a>

          <button
            onClick={onOpenCopilot}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-700/80 text-cyan-300 font-semibold text-sm hover:border-cyan-500/40 transition-all cursor-pointer shadow-md shadow-black/40"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask Yousef's Copilot</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            title="Download Resume PDF"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Core Stats Overview */}
        <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {portfolioData.profile.stats.map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
