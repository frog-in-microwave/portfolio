'use client';

import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER & ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Experience & Education
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Practical development internships, cloud infrastructure engineering, and computer engineering academics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Work Experience (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </div>

            <div className="relative border-l border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Indicator Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:scale-125 transition-transform duration-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>

                  {/* Experience Card */}
                  <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-slate-700/80 transition-all shadow-xl">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 my-3 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2 my-4">
                      {exp.achievements.map((ach, achIdx) => (
                        <div key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Training (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Education Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2 pt-2 border-t border-slate-800/80">
                  <h4 className="text-base font-bold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-semibold text-cyan-400">
                    {edu.institution}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Training & Certifications */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>Training & Courses</span>
              </div>

              {portfolioData.trainings.map((train, idx) => (
                <div key={idx} className="pt-2 border-t border-slate-800/80 space-y-1">
                  <h4 className="text-sm font-semibold text-white">
                    {train.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Provider: <span className="text-cyan-300">{train.institution}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Resume Link Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/40 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Complete Resume File</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download the official PDF resume highlighting full course certifications, internships, and contact details.
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
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
