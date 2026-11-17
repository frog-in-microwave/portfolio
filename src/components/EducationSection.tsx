'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  FileText,
  Maximize2,
  X,
  Sparkles,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { portfolioData, Course } from '../data/portfolioData';

/**
 * EducationSection Component
 * 
 * Showcases:
 * 1. Academic Degree (Computer Engineering) from education.json
 * 2. Dedicated Course & Certification Cards (Codebrave, LebNet, etc.) from courses.json
 * 3. Interactive full-view modal lightbox for certificate inspection.
 */
export const EducationSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Course | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  // Lock background scroll when certificate modal is open
  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCert]);

  return (
    <section id="education" className="py-20 relative bg-slate-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-violet-400/30 text-xs font-mono font-bold text-violet-300">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span>ACADEMIC &amp; PROFESSIONAL CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            University engineering studies alongside verified industry programs, technical fellowships, and certified specializations.
          </p>
        </div>

        {/* =========================================================================
            1. UNIVERSITY DEGREE (ACADEMIC BACKGROUND)
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
            <GraduationCap className="w-4 h-4 text-violet-400" />
            <span>Academic Degree</span>
          </div>

          {portfolioData.education.map((edu, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 border-l-violet-500 pop-card glow-violet flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-violet-950/60 border border-violet-700/40 text-violet-300">
                      Bachelor of Science
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-950/60 border border-emerald-700/40 text-emerald-300">
                      In Progress (Expected 2028)
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-base font-bold text-amber-400 mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </span>
                </div>

                {edu.description && (
                  <p className="text-sm text-slate-300 leading-relaxed pt-1">
                    {edu.description}
                  </p>
                )}
              </div>

              {/* Resume / Credential Link */}
              <div className="shrink-0 flex md:flex-col items-center justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-sm group"
                >
                  <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>View Official Resume</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            2. DEDICATED COURSES & CERTIFICATIONS (from courses.json)
            ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Specialized Programs &amp; Certifications</span>
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Click any certificate image for full-screen inspection</span>
            </span>
          </div>

          {/* Dedicated Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {portfolioData.courses.map((course) => {
              const isAi = course.id.includes('lebnet') || course.id.includes('ai');
              const glowClass = isAi ? 'glow-mint' : 'glow-amber';
              const accentBorder = isAi ? 'border-l-emerald-500' : 'border-l-amber-500';

              return (
                <div
                  key={course.id}
                  className={`rounded-3xl bg-[#111726]/90 border border-white/10 border-l-4 ${accentBorder} pop-card ${glowClass} flex flex-col justify-between overflow-hidden group/card shadow-xl`}
                >
                  {/* Top: Certificate Image Preview Container */}
                  <div className="p-4 sm:p-5 pb-0">
                    <div 
                      onClick={() => setActiveCert(course)}
                      className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#080d16] border border-white/10 group/img cursor-zoom-in shadow-inner"
                      title="Click to view full certificate"
                    >
                      <img
                        src={course.certificateImage}
                        alt={`${course.title} Certificate`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Image Overlay with Click Notice */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/20 text-white text-xs font-bold shadow-xl backdrop-blur-md transform scale-95 group-hover/img:scale-100 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Click to View Full Certificate</span>
                        </div>
                      </div>

                      {/* Corner Badge */}
                      <div className="absolute top-2.5 left-2.5 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md border border-white/15 text-slate-200 shadow-sm flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-400" />
                          <span>Verified Certificate</span>
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-2.5 right-2.5 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md border border-white/15 text-amber-300 shadow-sm">
                          {course.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details Body */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        {course.badge && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-slate-300 mb-2">
                            {course.badge}
                          </span>
                        )}
                        <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug group-hover/card:text-amber-300 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm font-bold text-amber-400 mt-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{course.institution}</span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Technical Skills / Competencies */}
                      {course.skills && course.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {course.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setActiveCert(course)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-xs font-bold text-slate-200 hover:text-white transition-all active:scale-95 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Certificate</span>
                      </button>

                      {course.credentialUrl ? (
                        <a
                          href={course.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          Verified Completion
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. FULL VIEW CERTIFICATE MODAL / LIGHTBOX
          ========================================================================= */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setActiveCert(null)}
        >
          {/* Top Modal Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between gap-4 z-50 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300 shrink-0">
                Official Credential
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">
                  {activeCert.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">
                  {activeCert.institution} • {activeCert.period}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCert(null)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer shadow-lg shrink-0"
              title="Close Full Screen (Esc)"
              aria-label="Close Full Screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[80vh] max-w-[94vw] sm:max-w-[88vw] flex items-center justify-center">
              <img
                src={activeCert.certificateImage}
                alt={`${activeCert.title} Certificate Full View`}
                className="max-h-[78vh] sm:max-h-[82vh] max-w-[92vw] sm:max-w-[86vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-2xl px-4 py-2.5 rounded-2xl bg-[#111726]/90 border border-white/10 text-center shadow-lg z-50 mb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm font-mono text-slate-300">
              <span className="text-amber-400 font-bold mr-2">Verified Credential:</span>
              {activeCert.institution} — {activeCert.title} ({activeCert.period})
            </p>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Esc</kbd> or click outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
};