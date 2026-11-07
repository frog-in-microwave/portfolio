'use client';

import React from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  Code2,
  ArrowUpRight,
  Flame,
  Wrench
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';

/**
 * ProjectsSection Component - Playful Workshop Showcase
 * 
 * Features:
 * - Playful "Under Construction / Projects in the Lab" aesthetic when empty.
 * - Bold colorful buttons with high mobile tap usability.
 * - Ready to display a 3-column bento grid whenever projects are added.
 */
export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-rose-400/30 text-xs font-mono font-bold text-rose-300">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Projects & Experiments
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Software builds, full-stack web applications, and mobile deployments.
          </p>
        </div>

        {/* Playful Colorful Lab Card */}
        <div className="relative p-7 sm:p-12 rounded-3xl bg-[#111726]/90 border border-white/10 text-center max-w-3xl mx-auto space-y-6 pop-card glow-coral overflow-hidden">
          {/* Ambient Background Gradient Swirl */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
          
          {/* Animated Workshop Icon Badge */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-600 text-slate-950 p-[2px] shadow-lg shadow-rose-500/25 mx-auto">
            <div className="w-full h-full bg-[#0D1424] rounded-[14px] flex items-center justify-center text-amber-400">
              <Wrench className="w-7 h-7" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-mono font-bold text-amber-300">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>LIVE WORKSHOP</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Projects Currently in the Lab
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              I am actively documenting my recent full-stack web, React Native mobile, and GCP Cloud Run builds with case studies and open-source codebases.
            </p>
          </div>

          {/* Planned Tech Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {['Next.js 16', 'React Native', 'GraphQL', 'Prisma', 'GCP Cloud Run', 'Terraform'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href={portfolioData.profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore My GitHub</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 text-xs font-extrabold shadow-md shadow-rose-500/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <span>Request Early Project Demos</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
