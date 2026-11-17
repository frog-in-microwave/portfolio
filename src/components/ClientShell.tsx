'use client';

import React from 'react';
import { PlayfulBackground } from './PlayfulBackground';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

/**
 * ClientShell Component
 * 
 * Top-level interactive client wrapper coordinating state for dynamic background
 * and content sections.
 */
export const ClientShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 1. Warm Colorful Ambient Background */}
      <PlayfulBackground />

      {/* 2. Navigation Header */}
      <Navbar />

      {/* 3. Main Page Sections */}
      <main className="relative z-10">
        <Hero />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};
