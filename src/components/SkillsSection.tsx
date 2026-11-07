'use client';

import React from 'react';
import { 
  Cpu, 
  Layout, 
  Server, 
  Cloud, 
  Sparkles, 
  Code2,
  Terminal,
  Zap,
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * SkillsSection Component - Bento-Style Colorful Competencies
 * 
 * Features:
 * - 4 High-personality Bento cards with distinct color themes (Mint, Amber, Violet, Cyan).
 * - Tactile tech badges with production highlights.
 * - 100% Mobile responsive (1-column on phones, 2-column on desktops).
 */
export const SkillsSection: React.FC = () => {
  const bentoThemes = {
    frontend: {
      color: 'emerald',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      tagBg: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200 hover:border-emerald-500/60',
      glow: 'glow-mint',
      icon: Layout,
    },
    backend: {
      color: 'amber',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      tagBg: 'bg-amber-950/40 border-amber-800/40 text-amber-200 hover:border-amber-500/60',
      glow: 'glow-amber',
      icon: Server,
    },
    cloud: {
      color: 'violet',
      badgeBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      tagBg: 'bg-violet-950/40 border-violet-800/40 text-violet-200 hover:border-violet-500/60',
      glow: 'glow-violet',
      icon: Cloud,
    },
    languages: {
      color: 'cyan',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      tagBg: 'bg-cyan-950/40 border-cyan-800/40 text-cyan-200 hover:border-cyan-500/60',
      glow: 'glow-cyan',
      icon: Code2,
    },
  };

  const categories = Object.entries(portfolioData.skills) as [
    keyof typeof bentoThemes,
    (typeof portfolioData.skills)['frontend']
  ][];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-amber-400/30 text-xs font-mono font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CORE TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Technologies I use to build scalable web platforms, cross-platform mobile apps, and automated cloud systems.
          </p>
        </div>

        {/* Colorful Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categories.map(([categoryKey, category]) => {
            const theme = bentoThemes[categoryKey] || bentoThemes.frontend;
            const Icon = theme.icon;

            return (
              <div
                key={categoryKey}
                className={`p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 pop-card flex flex-col justify-between space-y-5 ${theme.glow}`}
              >
                <div>
                  {/* Card Header with Themed Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${theme.badgeBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {category.description}
                  </p>

                  {/* Skills Badges with Highlights */}
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`p-3 rounded-2xl border transition-all ${theme.tagBg}`}
                      >
                        <div className="text-xs sm:text-sm font-bold text-slate-100">
                          {skill.name}
                        </div>
                        {skill.highlight && (
                          <div className="text-[11px] font-mono text-slate-400 mt-1">
                            {skill.highlight}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
