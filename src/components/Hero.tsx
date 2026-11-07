'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  MapPin,
  Laptop,
  CheckCircle2,
  Code2,
  Cloud
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onOpenCopilot: () => void;
}

/**
 * Hero Component - Clean, Professional & Colorful
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCopilot }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Next.js 16 Web Applications",
    "React Native Mobile Apps",
    "GCP Cloud Run & Terraform (IaC)",
    "PostgreSQL, Prisma & GraphQL APIs"
  ];

  useEffect(() => {
    const currentPhrase = phrases[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, 65);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingIndex, phrases]);

  return (
    <section id="about" className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-amber-400/30 text-xs font-semibold text-amber-300 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Full-Stack & AI Roles</span>
        </div>

        {/* Headline & Badges */}
        <div className="space-y-3">
          <p className="text-amber-400 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Hello, I'm
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Yousef Abdallah
          </h1>

          {/* Professional Tech Tag Pills with Icons (No Emojis) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-slate-950" />
              <span>Full-Stack Developer</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-sm">
              <Bot className="w-3.5 h-3.5 text-white" />
              <span>AI Systems Engineer</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs sm:text-sm shadow-sm">
              <Cloud className="w-3.5 h-3.5 text-white" />
              <span>GCP & Terraform</span>
            </span>
          </div>

          {/* Typewriter Banner */}
          <div className="h-9 sm:h-11 flex items-center justify-center pt-2">
            <span className="text-slate-400 font-mono text-sm sm:text-lg mr-2">&gt; I build</span>
            <span className="text-sm sm:text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
              {displayedText}
            </span>
            <span className="w-2 h-4 sm:w-2.5 sm:h-5 bg-amber-400 ml-1 inline-block animate-pulse" />
          </div>
        </div>

        {/* Short, Concise Bio Paragraph */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          {portfolioData.profile.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-md sm:max-w-none mx-auto">
          <a
            href="#experience"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            <span>View Experience</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </a>

          <button
            onClick={onOpenCopilot}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#141C2E] hover:bg-[#1A253C] border border-white/10 text-amber-300 font-bold text-xs sm:text-sm transition-all active:scale-98 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Ask Yousef's AI</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#141C2E] hover:bg-[#1A253C] border border-white/10 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Bento Bar */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
          <div className="p-3 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Full-Stack & Mobile</div>
              <div className="text-[11px] text-slate-400 font-mono">Next.js & React Native</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cloud Infrastructure</div>
              <div className="text-[11px] text-slate-400 font-mono">GCP & Terraform IaC</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Beirut, Lebanon</div>
              <div className="text-[11px] text-slate-400 font-mono">LIU Computer Engineering</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
