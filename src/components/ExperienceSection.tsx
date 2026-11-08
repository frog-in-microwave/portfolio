'use client';

import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * ExperienceSection Component - Dedicated Work History & Internships
 * 
 * Loaded dynamically from src/data/experiences.json with ordering via `order` attribute.
 */
export const ExperienceSection: React.FC = () => {
  const companyRibbons = [
    {
      borderColor: 'border-l-rose-500',
      badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      glow: 'glow-coral',
    },
    {
      borderColor: 'border-l-cyan-400',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      glow: 'glow-cyan',
    },
    {
      borderColor: 'border-l-amber-400',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      glow: 'glow-amber',
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-rose-400/30 text-xs font-mono font-bold text-rose-300">
            <Briefcase className="w-3.5 h-3.5 text-rose-400" />
            <span>WORK HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Software development internships, cloud infrastructure engineering, and collaborative team sprints loaded from JSON.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {portfolioData.experience.map((exp, idx) => {
            const ribbon = companyRibbons[idx % companyRibbons.length];
            return (
              <div
                key={exp.id || idx}
                className={`p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 ${ribbon.borderColor} pop-card ${ribbon.glow} space-y-4`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        #{exp.order}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 pt-1">
                  {exp.achievements.map((ach, achIdx) => (
                    <div key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
