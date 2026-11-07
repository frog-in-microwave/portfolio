'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Code2, Sparkles, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface FooterProps {
  onOpenCopilot: () => void;
}

/**
 * Footer Component
 * 
 * Sits at the base of the page.
 * 
 * Key Features:
 * 1. Live Timezone Clock:
 *    Calculates current wall-clock time in Beirut, Lebanon (`Asia/Beirut`) using the
 *    browser's native internationalization API (`toLocaleTimeString`), updated via a 1s interval.
 * 2. Smooth Scroll-To-Top Trigger:
 *    Invokes `window.scrollTo({ top: 0, behavior: 'smooth' })`.
 * 3. Quick Copilot & Resume triggers.
 */
export const Footer: React.FC<FooterProps> = ({ onOpenCopilot }) => {
  // Formatted Beirut time string
  const [currentTime, setCurrentTime] = useState<string>('');

  /**
   * Timezone ticker:
   * Sets up a 1000ms interval to update the clock every second with zero drift.
   */
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

    updateTime(); // Initial invocation
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  /**
   * Smoothly scrolls the window back to coordinates (0, 0)
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05080e] border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-slate-900">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-white text-base">
                {portfolioData.profile.name}
              </span>
              <p className="text-xs text-slate-500 font-mono">
                {portfolioData.profile.role}
              </p>
            </div>
          </div>

          {/* Center: Live Beirut Time & Feature Hotlinks */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Beirut: {currentTime || '12:00:00 PM'} (EET)</span>
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenCopilot}
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Copilot</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Copyright & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
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
