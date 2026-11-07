'use client';

import React, { useState } from 'react';
import { PlayfulBackground } from './PlayfulBackground';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { AiCopilotModal } from './AiCopilotModal';
import { Bot, Sparkles } from 'lucide-react';

/**
 * ClientShell Component
 * 
 * Top-level interactive client wrapper coordinating state for modals,
 * custom cursor, dynamic background, and separate content sections.
 */
export const ClientShell: React.FC = () => {
  const [copilotOpen, setCopilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 1. Warm Colorful Ambient Background */}
      <PlayfulBackground />

      {/* 3. Navigation Header */}
      <Navbar onOpenCopilot={() => setCopilotOpen(true)} />

      {/* 4. Main Page Sections (Experience and Education Separated) */}
      <main className="relative z-10">
        <Hero onOpenCopilot={() => setCopilotOpen(true)} />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* 5. Footer */}
      <Footer onOpenCopilot={() => setCopilotOpen(true)} />

      {/* 6. Conversational AI Copilot Modal */}
      <AiCopilotModal
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />

      {/* 7. Floating Action Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30">
        <button
          onClick={() => setCopilotOpen(true)}
          title="Chat with Yousef's AI Copilot"
          className="relative group flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 text-slate-950 font-extrabold text-xs shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <Bot className="w-4 h-4 text-slate-950" />
          <span>Ask AI Copilot</span>
          <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin" />
        </button>
      </div>
    </div>
  );
};
