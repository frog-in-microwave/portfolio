'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  Sparkles,
  MapPin,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onOpenCopilot: () => void;
}

/**
 * Hero Component - Playful, Colorful & Memorable
 * 
 * Features:
 * - Expressive typography with colorful tilted sticker badges
 * - Bouncy typewriter effect cycling through Yousef's specialties
 * - Quick personal status widget (location, current stack, availability)
 * - Mobile-first button ergonomics (large 48px+ touch targets)
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
    <section id="about" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        
        {/* Playful Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131B2E] border border-amber-400/30 text-xs sm:text-sm font-semibold text-amber-300 shadow-md shadow-amber-500/10 hover:border-amber-400/60 transition-colors">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Available for Full-Stack & AI Roles</span>
        </div>

        {/* Main Display Headline with Colorful Stickers */}
        <div className="space-y-3">
          <p className="text-amber-400 font-mono text-sm sm:text-base font-bold uppercase tracking-widest">
            👋 Marhaban! Meet
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Yousef Abdallah
          </h1>

          {/* Sticker Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rotate-[-2deg] shadow-md shadow-amber-400/20 transform hover:scale-105 transition-transform">
              ⚡ Full-Stack Developer
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs sm:text-sm rotate-[1.5deg] shadow-md shadow-rose-500/20 transform hover:scale-105 transition-transform">
              🤖 AI Systems Engineer
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs sm:text-sm rotate-[-1deg] shadow-md shadow-violet-600/20 transform hover:scale-105 transition-transform">
              ☁️ GCP & Terraform
            </span>
          </div>

          {/* Typewriter Banner */}
          <div className="h-10 sm:h-12 flex items-center justify-center pt-2">
            <span className="text-slate-400 font-mono text-base sm:text-xl mr-2">&gt; I build</span>
            <span className="text-base sm:text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
              {displayedText}
            </span>
            <span className="w-2.5 h-5 bg-amber-400 ml-1 inline-block animate-pulse" />
          </div>
        </div>

        {/* Bio Paragraph */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
          {portfolioData.profile.bio}
        </p>

        {/* Action Buttons (Full-Width on Mobile for Thumb Ergonomics) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-md sm:max-w-none mx-auto">
          <a
            href="#experience"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            <span>Explore Experience</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </a>

          <button
            onClick={onOpenCopilot}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#141C2E] hover:bg-[#1A253C] border border-white/10 text-amber-300 font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Ask Yousef's AI</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#141C2E] hover:bg-[#1A253C] border border-white/10 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Quick Highlights Bento Bar */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
          {/* Card 1 */}
          <div className="p-3.5 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3 pop-card">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Full-Stack & Mobile</div>
              <div className="text-[11px] text-slate-400 font-mono">Next.js, React Native, MERN</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-3.5 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3 pop-card">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cloud & DevOps</div>
              <div className="text-[11px] text-slate-400 font-mono">GCP, Cloud Run, Terraform</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-3.5 rounded-2xl bg-[#121826]/90 border border-white/10 flex items-center gap-3 pop-card">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
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
