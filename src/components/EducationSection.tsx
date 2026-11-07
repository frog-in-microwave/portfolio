'use client';

import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Award,
  FileText
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * EducationSection Component - Dedicated Academic Credentials & Training
 */
export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 relative bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-violet-400/30 text-xs font-mono font-bold text-violet-300">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Education & Training
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            University engineering studies, foundational coursework, and verified professional development programs.
          </p>
        </div>

        {/* Education & Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. University Degree Card */}
          <div className="p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 border-l-violet-500 pop-card glow-violet space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>University Degree</span>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-3 pt-1">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-bold text-amber-400 mt-0.5">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{edu.location}</span>
                    </span>
                  </div>

                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-xs font-mono rounded-lg bg-violet-950/50 border border-violet-800/40 text-violet-300">
                In Progress (Graduation: June 2028)
              </span>
            </div>
          </div>

          {/* 2. Professional Training Card */}
          <div className="p-7 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 border-l-emerald-500 pop-card glow-mint space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Specialized Training</span>
              </div>

              {portfolioData.trainings.map((train, idx) => (
                <div key={idx} className="space-y-3 pt-1">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {train.title}
                    </h3>
                    <p className="text-sm font-bold text-amber-400 mt-0.5">
                      {train.institution}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Intensive web development and Python program covering software engineering fundamentals, full-stack application development, and modern programming practices.
                  </p>
                </div>
              ))}
            </div>

            {/* Official Resume Link Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Credentials</span>
                </span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>View PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
