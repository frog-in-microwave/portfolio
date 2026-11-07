'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Code2, Heart, Terminal, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenCopilot: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenCopilot }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
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
    <footer className="relative bg-[#05080e] border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-slate-900">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-white text-base">
                {portfolioData.profile.name}
              </span>
              <p className="text-xs text-slate-500 font-mono">
                {portfolioData.profile.secondaryTitle}
              </p>
            </div>
          </div>

          {/* Center: Live Time & Status */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SF HQ: {currentTime || '12:00:00 PM'} (PST)</span>
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenTerminal}
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Mode</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenCopilot}
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Copilot</span>
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} {portfolioData.profile.name}. Designed & engineered for production scale.
          </p>

          <p className="flex items-center gap-1">
            Built with React 19, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
};
