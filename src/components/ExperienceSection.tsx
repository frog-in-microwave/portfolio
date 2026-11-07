'use client';

import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * ExperienceSection Component - Colorful Timeline & Education
 * 
 * Features:
 * - Distinct color-coded ribbons for internships (Rose for Codebrave, Cyan for Agile Labs, Amber for CONCAT).
 * - Prominent Computer Engineering education card (LIU Saida).
 * - Mobile-first layout with clean vertical flow and touch-friendly targets.
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-violet-400/30 text-xs font-mono font-bold text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>JOURNEY & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Experience & Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Internships, real-world cloud migrations, and computer engineering academics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Work Experience Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-sm uppercase tracking-wider font-bold">
              <Briefcase className="w-4 h-4" />
              <span>Internship & Development History</span>
            </div>

            <div className="space-y-5">
              {portfolioData.experience.map((exp, idx) => {
                const ribbon = companyRibbons[idx] || companyRibbons[0];
                return (
                  <div
                    key={idx}
                    className={`p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 ${ribbon.borderColor} pop-card ${ribbon.glow} space-y-4`}
                  >
                    {/* Role & Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          {exp.role}
                        </h3>
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
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-200"
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

          {/* Right Column: Education & Training (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Education Bento Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 border-l-violet-500 pop-card glow-violet space-y-4">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>University Degree</span>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2 pt-1">
                  <h4 className="text-lg font-extrabold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-bold text-amber-400">
                    {edu.institution}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Training Bento Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 border-l-emerald-500 pop-card glow-mint space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Specialized Training</span>
              </div>

              {portfolioData.trainings.map((train, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    {train.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    By: <span className="text-emerald-300 font-bold">{train.institution}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Resume PDF Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#131C30] to-[#0E1524] border border-amber-400/30 space-y-3 shadow-lg">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Official Resume</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download my complete resume with academic transcripts, coursework details, and references.
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                <span>View Full Resume (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
