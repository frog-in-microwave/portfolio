'use client';

import React from 'react';
import { 
  Layout, 
  Server, 
  Cloud, 
  Brain,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolioData';

/**
 * SkillsSection Component - Bento-Style Competencies
 * 
 * Showcases 4 focused, highly-relevant engineering disciplines:
 * 1. Frontend & Mobile Engineering (React, Next.js, React Native, TypeScript, Modern CSS)
 * 2. Backend & API Engineering (Node.js, Express, PostgreSQL, Prisma, MongoDB, MVC)
 * 3. Cloud Architecture & DevOps (AWS Certified Practitioner & GCP Cloud Run CI/CD, Terraform)
 * 4. AI Engineering & Systems (PyTorch, Deep CNNs, Computer Vision, FastAPI, C++, Java)
 */
export const SkillsSection: React.FC = () => {
  // Visual themes mapped by category ID
  const themeMap: Record<
    string,
    {
      color: string;
      badgeBg: string;
      tagBg: string;
      glow: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    frontend: {
      color: 'emerald',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      tagBg: 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200 hover:border-emerald-500/60',
      glow: 'glow-mint',
      icon: Layout,
    },
    backend: {
      color: 'amber',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      tagBg: 'bg-amber-950/30 border-amber-800/40 text-amber-200 hover:border-amber-500/60',
      glow: 'glow-amber',
      icon: Server,
    },
    cloud: {
      color: 'violet',
      badgeBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      tagBg: 'bg-violet-950/30 border-violet-800/40 text-violet-200 hover:border-violet-500/60',
      glow: 'glow-violet',
      icon: Cloud,
    },
    'ai-engineering': {
      color: 'cyan',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      tagBg: 'bg-cyan-950/30 border-cyan-800/40 text-cyan-200 hover:border-cyan-500/60',
      glow: 'glow-cyan',
      icon: Brain,
    },
  };

  const defaultTheme = {
    color: 'rose',
    badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
    tagBg: 'bg-rose-950/40 border-rose-800/40 text-rose-200 hover:border-rose-500/60',
    glow: 'glow-coral',
    icon: Layers,
  };

  const categories: SkillCategory[] = portfolioData.skills;

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
            Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Core technical competencies across full-stack web platforms, mobile apps, AWS and GCP cloud architectures, and AI deep learning systems.
          </p>
        </div>

        {/* 4 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categories.map((category) => {
            const theme = themeMap[category.id] || defaultTheme;
            const Icon = theme.icon;

            return (
              <div
                key={category.id}
                className={`p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 pop-card flex flex-col justify-between space-y-5 ${theme.glow}`}
              >
                <div>
                  {/* Card Header with Themed Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${theme.badgeBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      #{category.order}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {category.description}
                  </p>

                  {/* Skills Badges with Highlights */}
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`p-3.5 rounded-2xl border transition-all ${theme.tagBg}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                            <span>{skill.name}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            #{skill.order}
                          </span>
                        </div>
                        {skill.highlight && (
                          <div className="text-[11px] font-mono text-slate-400 mt-1 pl-3 leading-relaxed">
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
