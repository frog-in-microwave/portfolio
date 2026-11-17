import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { 
  getProjectById, 
  getSortedProjects, 
  getSortedProjectCategories,
  portfolioData 
} from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { PlayfulBackground } from '@/components/PlayfulBackground';
import { Footer } from '@/components/Footer';
import { ProjectMediaSlider } from '@/components/ProjectMediaSlider';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = getSortedProjects();
  return projects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found | Yousef Abdallah',
    };
  }

  return {
    title: `${project.title} — Case Study | Yousef Abdallah`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const allProjects = getSortedProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const categories = getSortedProjectCategories();
  const currentCategory = categories.find((c) => c.id === project.categoryId);
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === project.subcategoryId);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      <PlayfulBackground />

      {/* Top Floating Navigation Header */}
      <nav className="sticky top-0 z-40 bg-[#090D16]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="View Source on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 text-xs font-extrabold shadow-md hover:brightness-110 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Case Study Body */}
      <main className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        
        {/* Mobile / Small Screens Hero Stack (< lg) - Strictly unchanged */}
        <div className="lg:hidden space-y-8 sm:space-y-12">
          {/* Header Breadcrumbs & Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-amber-300">{currentCategory?.name || project.categoryId}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                {currentSubcategory?.name || project.subcategoryId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-slate-400">
                Order #{project.order}
              </span>
              {project.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300">
                  {project.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Project Thumbnail Hero Image */}
          {((project.thumbnail) || (project.media && project.media[0])) && (
            <div className="space-y-3">
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#0c121e] border border-white/10 shadow-2xl pop-card glow-mint">
                <img
                  src={project.thumbnail || project.media[0]?.url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Primary Action Links Bar (Placed directly under thumbnail) */}
          {(project.links.live || project.links.github) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Live Demo</span>
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111726] hover:bg-[#182033] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs sm:text-sm font-bold active:scale-98 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Desktop / Widescreen Hero Section (>= lg) */}
        <div className="hidden lg:block space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-amber-400 transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-amber-300">{currentCategory?.name || project.categoryId}</span>
          </div>

          {/* Top Hero Grid: Thumbnail on Left, Title + Tagline + Actions on Right */}
          <div className="grid grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* Left Column: Thumbnail */}
            <div className="col-span-5">
              {((project.thumbnail) || (project.media && project.media[0])) && (
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#0c121e] border border-white/10 shadow-2xl pop-card glow-mint">
                  <img
                    src={project.thumbnail || project.media[0]?.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Badges, Title, Tagline, Action Buttons */}
            <div className="col-span-7 space-y-6">
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                    {currentSubcategory?.name || project.subcategoryId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-slate-400">
                    Order #{project.order}
                  </span>
                  {project.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {project.title}
                </h1>

                {/* Tagline */}
                <p className="text-base xl:text-lg text-slate-300 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Primary Action Links Bar on Desktop */}
              {(project.links.live || project.links.github) && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 text-xs xl:text-sm font-extrabold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Live Demo</span>
                    </a>
                  )}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111726] hover:bg-[#182033] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs xl:text-sm font-bold active:scale-98 transition-all"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description Under Them Both */}
          <div className="p-6 xl:p-8 rounded-3xl bg-[#111726]/60 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Executive Overview</span>
            </div>
            <p className="text-base xl:text-lg text-slate-200 leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        {/* Executive Overview (Mobile only, as widescreen displays it under the hero grid above) */}
        <section className="space-y-3 lg:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Executive Overview</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* Media Gallery (Takes up full width on wide screens - Nothing on its right) */}
        {project.media && project.media.length > 0 && (
          <section className="w-full">
            <ProjectMediaSlider media={project.media} projectTitle={project.title} />
          </section>
        )}

        {/* Two-Column Deep Dive: Content + Meta Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          
          {/* Main Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-violet-400" />
                  <span>Architecture Highlights</span>
                </h2>
                <div className="space-y-2.5">
                  {project.architectureHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span>Key Features &amp; Capabilities</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#111726] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar (Right 1 col) */}
          <div className="space-y-6">
            
            {/* Technologies Used */}
            <div className="p-6 rounded-3xl bg-[#111726]/90 border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact / Hire CTA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-violet-500/10 border border-amber-400/30 text-center space-y-3">
              <h4 className="text-sm font-extrabold text-white">
                Need a Similar Architecture?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                I build production-grade web systems, mobile applications, and automated cloud pipelines.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 text-xs font-extrabold hover:brightness-110 transition-all"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Project Navigation (Previous / Next) */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#111726]/80 border border-white/10 hover:border-amber-400/40 transition-colors text-left flex-1"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Previous Project</div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">{prevProject.title}</div>
              </div>
            </Link>
          ) : <div className="hidden sm:block flex-1" />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center justify-end gap-3 p-4 rounded-2xl bg-[#111726]/80 border border-white/10 hover:border-amber-400/40 transition-colors text-right flex-1"
            >
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Next Project</div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">{nextProject.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            </Link>
          ) : <div className="hidden sm:block flex-1" />}
        </div>

      </main>

      <Footer />
    </div>
  );
}
