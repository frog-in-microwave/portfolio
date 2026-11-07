'use client';

import React, { useState } from 'react';
import { NeuralBackground } from './NeuralBackground';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { AiCopilotModal } from './AiCopilotModal';
import { Bot, Sparkles } from 'lucide-react';

/**
 * ClientShell Component
 * 
 * Serves as the primary client-side state boundary for the Next.js App Router.
 * Manages the AI Copilot modal state and coordinates the interactive layout.
 */
export const ClientShell: React.FC = () => {
  // Modal visibility state
  const [copilotOpen, setCopilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Dynamic Interactive Neural Canvas (Fixed Background) */}
      <NeuralBackground />

      {/* 2. Primary Fixed Header Navbar */}
      <Navbar
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* 3. Main Content Flow */}
      <main className="relative z-10">
        <Hero
          onOpenCopilot={() => setCopilotOpen(true)}
        />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* 4. Global Footer with Beirut Real-Time Clock */}
      <Footer
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* 5. Conversational AI Copilot Modal */}
      <AiCopilotModal
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />

      {/* 6. Floating Quick Action AI Copilot Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setCopilotOpen(true)}
          title="Chat with Yousef's AI Copilot"
          className="relative group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Bot className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">Ask AI Copilot</span>
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
