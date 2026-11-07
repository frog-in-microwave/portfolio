'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Layout, 
  Server, 
  Cloud, 
  Sparkles, 
  Code
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'languages'>('all');

  const tabs = [
    { id: 'all', label: 'All Technologies', icon: Sparkles },
    { id: 'frontend', label: 'Frontend & Mobile', icon: Layout },
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'cloud', label: 'Cloud & Databases', icon: Cloud },
    { id: 'languages', label: 'Languages & Tools', icon: Code },
  ] as const;

  const getFilteredCategories = () => {
    if (activeTab === 'all') {
      return Object.entries(portfolioData.skills);
    }
    return Object.entries(portfolioData.skills).filter(([key]) => key === activeTab);
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Skills & Engineering Competencies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Direct competencies from my engineering training, internships, and production development.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {getFilteredCategories().map(([categoryKey, category]) => (
            <div
              key={categoryKey}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700/80 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List with Progress & Highlights */}
              <div className="space-y-4 mt-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-cyan-400 font-semibold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Practical Production Highlight */}
                    {skill.highlight && (
                      <p className="text-[11px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                        ↳ {skill.highlight}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
