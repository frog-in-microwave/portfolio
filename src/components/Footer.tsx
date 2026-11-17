'use client';

import React from 'react';
import { ArrowUp, Code2, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * Footer Component - Clean & Professional
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-white/10 pt-14 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-10 border-b border-white/10 text-center sm:text-left">
          
          {/* Logo & Headline */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-heading font-extrabold text-white text-base">
                {portfolioData.profile.name}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-mono">
                {portfolioData.profile.role}
              </p>
            </div>
          </div>

          {/* Center: Feature Hotlinks */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume (PDF)</span>
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
