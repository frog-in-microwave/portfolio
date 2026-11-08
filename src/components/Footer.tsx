'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Code2, Sparkles, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface FooterProps {
  onOpenCopilot?: () => void;
}

/**
 * Footer Component - Clean & Professional
 */
export const Footer: React.FC<FooterProps> = ({ onOpenCopilot }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Beirut',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-white/10 pt-14 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-10 border-b border-white/10 text-center sm:text-left">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-white text-base">
                {portfolioData.profile.name}
              </span>
              <p className="text-xs text-slate-400 font-mono">
                {portfolioData.profile.role}
              </p>
            </div>
          </div>

          {/* Center: Live Beirut Time & Feature Hotlinks */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Beirut: {currentTime || '12:00:00 PM'}</span>
            </span>
            <span className="text-white/20">|</span>
            <button
              onClick={() => {
                if (onOpenCopilot) {
                  onOpenCopilot();
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Copilot</span>
            </button>
            <span className="text-white/20">|</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Engineered with Next.js 16, React 19, TypeScript & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};
