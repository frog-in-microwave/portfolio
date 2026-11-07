'use client';

import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Zap,
  Clock,
  Code2
} from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { GithubIcon } from './Icons';

/**
 * ProjectsSection Component
 * 
 * Manages the presentation of engineering case studies and applications.
 * 
 * Architectural Highlights:
 * 1. Safe Empty-State Fallback:
 *    When `portfolioData.projects` is empty, it renders an intentional "Projects Currently Being Documented"
 *    slate with direct call-to-actions to GitHub and the Contact form, preventing awkward blank spaces.
 * 2. Category Filtering:
 *    When projects are added, allows filtering by 'all', 'fullstack', and 'ai'.
 * 3. Deep Dive Case Study Modal:
 *    Clicking any project card reveals a full architectural breakdown with problem, solution,
 *    and quantifiable metrics via `ProjectDetailModal`.
 */
export const ProjectsSection: React.FC = () => {
  // Category filter state
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'systems'>('all');

  // Currently inspected project for modal view (null = modal closed)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack Web & Mobile' },
    { id: 'ai', label: 'AI & Systems' },
  ] as const;

  // Filter project dataset based on active tab
  const filteredProjects = portfolioData.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PROJECT SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="text-slate-400 text-base">
              Hands-on applications, mobile platforms, and full-stack solutions.
            </p>
          </div>

          {/* Render category filter buttons only if projects exist */}
          {portfolioData.projects.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filterTabs.map((tab) => {
                const isSelected = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/25'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 1. Empty State Placeholder: Displayed when `projects.length === 0` */}
        {portfolioData.projects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 sm:p-14 border border-slate-800 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400 mx-auto">
              <Code2 className="w-8 h-8" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Projects Currently Being Documented
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                I am preparing detailed case studies, live demo deployments, and architecture walkthroughs for my latest full-stack and mobile projects.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={portfolioData.profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Follow on GitHub</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
              >
                <span>Request Project Demos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* 2. Grid of Projects: Displayed whenever projects are added to `portfolioData.projects` */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1321] via-transparent to-transparent opacity-90" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight flex items-center justify-between">
                      <span>{project.title}</span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-slate-500 hover:text-cyan-400 p-1 cursor-pointer"
                        title="View Case Study"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Case Study Deep-Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
