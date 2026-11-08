'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  FolderGit2, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

/**
 * ProjectsSection Component - Interactive Horizontal Carousel
 * 
 * Features:
 * - Eliminates long vertical page scrolling via smooth sideways scroll carousel.
 * - Dynamic data loaded from src/data/projects.json.
 * - Multi-level taxonomy: Categories and Subcategories with deterministic ordering.
 * - Next & Prev navigation controls with touch swipe & snap points.
 * - Direct deep links to dedicated project case study pages (`/projects/[id]`).
 */
export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = portfolioData.projectCategories;
  const allProjects = portfolioData.projects;

  // Filter projects by selected category (ordered by project.order)
  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter((p) => p.categoryId === selectedCategory);

  // Scroll carousel left or right
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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
    'cloud-devops': {
      badge: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      border: 'border-violet-500/40',
      glow: 'glow-violet',
    },
    'ai-intelligence': {
      badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      border: 'border-rose-500/40',
      glow: 'glow-coral',
    },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading & Carousel Controls */}
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
              Explore recent software architectures, cloud pipelines, and AI systems. Swipe or click sideways to browse without infinite vertical scroll.
            </p>
          </div>

          {/* Desktop/Tablet Sideways Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              title="Previous project"
              aria-label="Previous project"
              className="p-3 rounded-2xl bg-[#111726] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              title="Next project"
              aria-label="Next project"
              className="p-3 rounded-2xl bg-[#111726] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Ordered by category.order) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Category:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            All Work ({allProjects.length})
          </button>

          {categories.map((cat) => {
            const count = allProjects.filter((p) => p.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

        {/* Horizontal Sideways Scroll Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
          style={{ scrollbarWidth: 'thin' }}
        >
          {filteredProjects.map((project) => {
            const theme = categoryThemes[project.categoryId] || categoryThemes['web-mobile'];
            const subName = getSubcategoryName(project.categoryId, project.subcategoryId);

            return (
              <div
                key={project.id}
                className={`w-[88vw] max-w-[340px] sm:max-w-[420px] shrink-0 snap-start rounded-3xl bg-[#111726]/90 border border-white/10 pop-card flex flex-col justify-between overflow-hidden shadow-xl ${theme.glow}`}
              >
                {/* Visual Media Header with Link to Dedicated Page */}
                <Link
                  href={`/projects/${project.id}`}
                  className="block relative aspect-video w-full bg-[#0d1424] overflow-hidden group cursor-pointer"
                >
                  {project.media && project.media[0] ? (
                    <img
                      src={project.media[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                      [Media Preview]
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
                  <div>
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
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Key Metrics Pills */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xs sm:text-sm font-extrabold text-white">
                            {m.value}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
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

                  {/* Action Bar */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/5">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance Hint */}
        <div className="sm:hidden flex items-center justify-center gap-2 text-xs font-mono text-slate-500 pt-2">
          <span>Swipe sideways to explore more projects &rarr;</span>
        </div>

      </div>
    </section>
  );
};
