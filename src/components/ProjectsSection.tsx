'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  ArrowRight, 
  ExternalLink, 
  Filter,
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';

/**
 * ProjectsSection Component - Two-Tier Taxonomy Grid Showcase
 * 
 * Hierarchy:
 * 1. Category Selection ("All", "Web & Mobile", "AI & ML")
 * 2. Secondary Subcategory Filter (unveiled when a specific category is active)
 * 3. Multi-column responsive project grid
 */
export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  const categories = portfolioData.projectCategories;
  const allProjects = portfolioData.projects;

  // Handler for category switch (resets subcategory to 'all')
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('all');
  };

  // Active category object (if not 'all')
  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  // Filter projects by category and optional subcategory
  const filteredProjects = allProjects.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
      return false;
    }
    if (selectedSubcategory !== 'all' && p.subcategoryId !== selectedSubcategory) {
      return false;
    }
    return true;
  });

  // Find subcategory name helper
  const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return subcategoryId;
    const sub = cat.subcategories.find((s) => s.id === subcategoryId);
    return sub ? sub.name : subcategoryId;
  };

  // Visual accents mapped per category
  const categoryThemes: Record<
    string,
    { badge: string; border: string; glow: string }
  > = {
    'web-mobile': {
      badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      border: 'border-emerald-500/40',
      glow: 'glow-mint',
    },
    'ai-ml': {
      badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      border: 'border-rose-500/40',
      glow: 'glow-coral',
    },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-rose-400/30 text-xs font-mono font-bold text-rose-300">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>FEATURED WORK &amp; EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore recent software architectures, cloud deployments, and AI systems. Click any project to read its technical case study.
            </p>
          </div>
        </div>

        {/* =========================================================================
            TWO-TIER FILTER SYSTEM
            ========================================================================= */}
        <div className="space-y-3 mb-8">
          
          {/* Level 1: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              All ({allProjects.length})
            </button>

            {categories.map((cat) => {
              const count = allProjects.filter((p) => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-[#111726] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-white/5 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Level 2: Secondary Subcategory Filter (Appears upon selecting a specific Category) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none animate-in fade-in slide-in-from-top-1 duration-200">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'bg-[#0E1524] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                All {activeCategoryObj.name} ({allProjects.filter((p) => p.categoryId === activeCategoryObj.id).length})
              </button>

              {activeCategoryObj.subcategories.map((sub) => {
                const count = allProjects.filter(
                  (p) => p.categoryId === activeCategoryObj.id && p.subcategoryId === sub.id
                ).length;
                const isSelected = selectedSubcategory === sub.id;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                        : 'bg-[#0E1524] text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="text-[10px] opacity-75">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Responsive Grid Layout (Multi-column) */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#111726]/60 border border-white/10 space-y-3">
            <p className="text-slate-300 font-medium">No projects found in this selection yet.</p>
            <button
              onClick={() => setSelectedSubcategory('all')}
              className="text-xs font-mono text-amber-400 hover:underline cursor-pointer"
            >
              Reset filter &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const theme = categoryThemes[project.categoryId] || categoryThemes['web-mobile'];
              const subName = getSubcategoryName(project.categoryId, project.subcategoryId);
              const displayThumbnail = project.thumbnail || (project.media && project.media[0]?.url) || '';

              return (
                <div
                  key={project.id}
                  className={`rounded-3xl bg-[#111726]/90 border border-white/10 pop-card flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${theme.glow}`}
                >
                  {/* Visual Thumbnail Photo Header */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="block relative aspect-video w-full bg-[#0d1424] overflow-hidden group cursor-pointer"
                  >
                    {displayThumbnail ? (
                      <img
                        src={displayThumbnail}
                        alt={`${project.title} thumbnail`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600 text-xs font-mono">
                        No Preview Available
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-black/30 pointer-events-none" />

                    {/* Order Badge and Category Chip */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border backdrop-blur-md ${theme.badge}`}>
                        {subName}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-slate-950/80 text-amber-300 border border-white/10">
                        #{project.order}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Project Title */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="group/title block"
                      >
                        <h3 className="text-xl font-extrabold text-white group-hover/title:text-amber-400 transition-colors flex items-center justify-between gap-2">
                          <span>{project.title}</span>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover/title:text-amber-400 group-hover/title:translate-x-1 transition-all" />
                        </h3>
                      </Link>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Tags & External Links Footer */}
                    <div className="pt-3 border-t border-white/5 space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[10px] font-mono text-slate-500 px-1">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Clean Action Icons (GitHub & Live) */}
                      {(project.links.github || project.links.live) && (
                        <div className="flex items-center justify-end gap-2 pt-1">
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noreferrer"
                              title="View Source on GitHub"
                              aria-label={`GitHub source for ${project.title}`}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noreferrer"
                              title="View Live Deployment"
                              aria-label={`Live demo for ${project.title}`}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
