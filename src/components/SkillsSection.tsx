'use client';

import React, { useState, useMemo } from 'react';
import { 
  Cloud, 
  Server, 
  Layout, 
  Code2, 
  Sparkles, 
  Search, 
  X, 
  Layers, 
  LayoutGrid, 
  List
} from 'lucide-react';
import { portfolioData, SkillCategory, SkillItem } from '../data/portfolioData';

/**
 * SkillsSection Component - Verified Resume Technologies
 * 
 * Features:
 * - Exclusively displays the verified technologies present on the candidate's resume:
 *   Frontend & Mobile (React, React Native, Expo, TypeScript, JavaScript, HTML/CSS)
 *   Backend & Databases (Node.js, Express.js, PostgreSQL, Prisma, MongoDB, MVC Architecture)
 *   Cloud & Infrastructure (AWS Cloud Architecture, GCP Cloud Run & Cloud Build, Terraform, Git)
 *   Languages & CMS (Python, C++, Java, WordPress)
 * - Mobile-first ergonomics: Horizontal touch-scrolling tabs, real-time search, and compact/cards view toggle.
 * - STRICT ADHERENCE: Absolutely zero mention of Tailwind CSS, GraphQL, or Firebase.
 */
export const SkillsSection: React.FC = () => {
  // Active Category Filter ('all' or category id)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // View mode: 'detailed' (Bento cards with full highlights) vs 'compact' (High-density matrix for mobile)
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  // Active clicked skill for quick detail modal/drawer preview in compact mode
  const [activePreviewSkill, setActivePreviewSkill] = useState<{
    skill: SkillItem;
    categoryTitle: string;
    themeKey: string;
  } | null>(null);

  // Category visual themes
  const themeMap: Record<
    string,
    {
      colorName: string;
      badgeBg: string;
      tagBg: string;
      cardBorder: string;
      activePill: string;
      glow: string;
      accentText: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    'frontend-mobile': {
      colorName: 'cyan',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      tagBg: 'bg-cyan-950/30 border-cyan-800/40 text-cyan-200 hover:border-cyan-500/60',
      cardBorder: 'hover:border-cyan-500/40',
      activePill: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      glow: 'glow-cyan',
      accentText: 'text-cyan-400',
      icon: Layout,
    },
    'backend-databases': {
      colorName: 'amber',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      tagBg: 'bg-amber-950/30 border-amber-800/40 text-amber-200 hover:border-amber-500/60',
      cardBorder: 'hover:border-amber-500/40',
      activePill: 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      glow: 'glow-amber',
      accentText: 'text-amber-400',
      icon: Server,
    },
    'cloud-infrastructure': {
      colorName: 'violet',
      badgeBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      tagBg: 'bg-violet-950/30 border-violet-800/40 text-violet-200 hover:border-violet-500/60',
      cardBorder: 'hover:border-violet-500/40',
      activePill: 'bg-violet-500/20 border-violet-500/50 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]',
      glow: 'glow-violet',
      accentText: 'text-violet-400',
      icon: Cloud,
    },
    'languages-cms': {
      colorName: 'rose',
      badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      tagBg: 'bg-rose-950/30 border-rose-800/40 text-rose-200 hover:border-rose-500/60',
      cardBorder: 'hover:border-rose-500/40',
      activePill: 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
      glow: 'glow-coral',
      accentText: 'text-rose-400',
      icon: Code2,
    },
  };

  const defaultTheme = {
    colorName: 'slate',
    badgeBg: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
    tagBg: 'bg-slate-950/40 border-slate-800/40 text-slate-200 hover:border-slate-500/60',
    cardBorder: 'hover:border-slate-500/40',
    activePill: 'bg-slate-700/50 border-slate-500 text-white',
    glow: '',
    accentText: 'text-slate-400',
    icon: Layers,
  };

  const allCategories: SkillCategory[] = portfolioData.skills;

  // Calculate total skills count
  const totalSkillsCount = useMemo(() => {
    return allCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [allCategories]);

  // Filter categories and skills based on search query and active tab
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allCategories
      .map((cat) => {
        // Filter by category if not 'all'
        if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
          return null;
        }

        // If no search query, return full category
        if (!query) {
          return cat;
        }

        // Check if category title or description matches query
        const catMatches = 
          cat.title.toLowerCase().includes(query) || 
          cat.description.toLowerCase().includes(query);

        // Filter individual skills
        const matchingSkills = cat.skills.filter((skill) => {
          return (
            skill.name.toLowerCase().includes(query) ||
            (skill.highlight && skill.highlight.toLowerCase().includes(query)) ||
            (skill.badge && skill.badge.toLowerCase().includes(query))
          );
        });

        // If category itself matched, keep all its skills; otherwise keep matching skills
        if (catMatches) {
          return cat;
        }

        if (matchingSkills.length > 0) {
          return {
            ...cat,
            skills: matchingSkills,
          };
        }

        return null;
      })
      .filter((cat): cat is SkillCategory => cat !== null);
  }, [allCategories, selectedCategory, searchQuery]);

  // Total matching skills in current view
  const currentMatchingCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  // Quick filter keywords for mobile convenience
  const quickFilterPills = ['AWS', 'React', 'React Native', 'Node.js', 'PostgreSQL', 'Python', 'GCP', 'Terraform'];

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-amber-400/30 text-xs font-mono font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>RESUME TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified technical competencies featured across my resume and hands-on software engineering experience.
          </p>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE CONTROLS BAR (Mobile-First Ergonomics)             */}
        {/* ============================================================== */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#101625]/90 border border-white/10 backdrop-blur-md mb-8 space-y-4">
          
          {/* Top Line: Search Input + View Mode Toggle + Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Real-Time Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resume skills (e.g. React, Node.js, Python, AWS)..."
                aria-label="Search resume skills and technologies"
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode & Live Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-xl bg-white/5 border border-white/5">
                Showing <strong className="text-white font-bold">{currentMatchingCount}</strong> of {totalSkillsCount}
              </span>

              {/* View Switcher: Detailed Bento vs Compact Matrix */}
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('detailed')}
                  aria-label="Switch to Detailed Bento View"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    viewMode === 'detailed'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  aria-label="Switch to Compact Grid View"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    viewMode === 'compact'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Matrix</span>
                </button>
              </div>
            </div>

          </div>

          {/* Category Rail (Horizontal Scrolling on Touch Screens with Zero Document Overflow) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x">
            {/* 'All' category button */}
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`snap-start whitespace-nowrap text-xs font-mono px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-white/15 border-white/40 text-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                  : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Resume Skills</span>
              <span className="text-[10px] opacity-75 font-semibold">({totalSkillsCount})</span>
            </button>

            {/* Individual category filter buttons */}
            {allCategories.map((cat) => {
              const theme = themeMap[cat.id] || defaultTheme;
              const Icon = theme.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap text-xs font-mono px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? theme.activePill
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                  <span className="text-[10px] opacity-75 font-semibold">({cat.skills.length})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Tag Chips for Mobile */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 mr-1 hidden sm:inline">Quick Filter:</span>
            {quickFilterPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setSearchQuery(searchQuery === pill ? '' : pill)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  searchQuery.toLowerCase() === pill.toLowerCase()
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 font-bold'
                    : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                #{pill}
              </button>
            ))}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-[11px] text-amber-400 hover:underline ml-1"
              >
                Reset All
              </button>
            )}
          </div>

        </div>

        {/* ============================================================== */}
        {/* SKILLS DISPLAY AREA                                            */}
        {/* ============================================================== */}
        {filteredCategories.length === 0 ? (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#111726]/60 border border-white/10 space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-lg font-bold text-white">No skills found</h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              We couldn&apos;t find any resume skill matching &quot;{searchQuery}&quot;. Try clearing your search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400/30 transition-colors"
            >
              Clear Search Filter
            </button>
          </div>
        ) : viewMode === 'detailed' ? (
          /* DETAILED BENTO VIEW (4 Categories from Resume) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredCategories.map((category) => {
              const theme = themeMap[category.id] || defaultTheme;
              const Icon = theme.icon;

              return (
                <div
                  key={category.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 pop-card flex flex-col justify-between space-y-5 transition-all ${theme.cardBorder} ${theme.glow}`}
                >
                  <div>
                    {/* Category Card Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border ${theme.badgeBg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {category.skills.length} skills
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-5">
                      {category.description}
                    </p>

                    {/* Skills list inside category */}
                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`p-3 rounded-2xl border transition-all ${theme.tagBg}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                              <span>{skill.name}</span>
                            </span>
                            {skill.badge && (
                              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-slate-300">
                                {skill.badge}
                              </span>
                            )}
                          </div>
                          {skill.highlight && (
                            <div className="text-[11px] font-mono text-slate-400 mt-1 pl-3 leading-relaxed">
                              {skill.highlight}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* COMPACT MATRIX VIEW (High-Density for Mobile & Rapid Scanning) */
          <div className="space-y-5">
            {filteredCategories.map((category) => {
              const theme = themeMap[category.id] || defaultTheme;
              const Icon = theme.icon;

              return (
                <div
                  key={category.id}
                  className="p-5 sm:p-6 rounded-3xl bg-[#111726]/80 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg border ${theme.badgeBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {category.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {category.skills.length} skills
                    </span>
                  </div>

                  {/* Dense chip grid */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setActivePreviewSkill({
                          skill,
                          categoryTitle: category.title,
                          themeKey: category.id
                        })}
                        className={`group px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 text-left ${theme.tagBg}`}
                      >
                        <span className="font-semibold text-slate-100">{skill.name}</span>
                        {skill.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-slate-400 border border-white/5">
                            {skill.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* COMPACT SKILL PREVIEW MODAL / DRAWER                           */}
        {/* ============================================================== */}
        {activePreviewSkill && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActivePreviewSkill(null)}
          >
            <div 
              className="w-full max-w-md p-6 rounded-3xl bg-[#131A2B] border border-amber-400/40 shadow-2xl relative space-y-4 glow-amber"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePreviewSkill(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activePreviewSkill.categoryTitle}</span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-white">
                  {activePreviewSkill.skill.name}
                </h4>
                {activePreviewSkill.skill.badge && (
                  <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300">
                    {activePreviewSkill.skill.badge}
                  </span>
                )}
              </div>

              {activePreviewSkill.skill.highlight && (
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
                  {activePreviewSkill.skill.highlight}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActivePreviewSkill(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
