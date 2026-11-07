import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Track record of driving architectural transitions, shipping high-impact AI products, and scaling distributed platforms.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-slate-800 max-w-4xl mx-auto ml-4 sm:ml-auto pl-6 sm:pl-10 space-y-12">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:scale-125 transition-transform duration-200">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700/80 transition-all shadow-xl">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
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

                {/* Role Description */}
                <p className="text-sm sm:text-base text-slate-300 my-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2.5 my-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Quantifiable Achievements:</span>
                  </h4>
                  <div className="space-y-2">
                    {exp.achievements.map((ach, achIdx) => (
                      <div key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900/90 border border-slate-800 text-slate-300"
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
    </section>
  );
};
