'use client';

import React, { useState, useEffect } from 'react';
import { NeuralBackground } from './NeuralBackground';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SkillsSection } from './SkillsSection';
import { ArchitectureShowcase } from './ArchitectureShowcase';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { AiCopilotModal } from './AiCopilotModal';
import { InteractiveTerminal } from './InteractiveTerminal';
import { Bot, Terminal, Sparkles } from 'lucide-react';

export const ClientShell: React.FC = () => {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+K or Cmd+K opens terminal
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Dynamic Neural Canvas Background */}
      <NeuralBackground />

      {/* Primary Fixed Navbar */}
      <Navbar
        onOpenCopilot={() => setCopilotOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenCopilot={() => setCopilotOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <SkillsSection />
        <ArchitectureShowcase />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* Interactive AI Copilot Modal */}
      <AiCopilotModal
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />

      {/* Developer CLI Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Bottom-Right Quick Action Widget */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setTerminalOpen(true)}
          title="Open Developer Terminal (Ctrl+K / Cmd+K)"
          className="p-3 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg shadow-black/50 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCopilotOpen(true)}
          title="Chat with Alex's Portfolio AI Copilot"
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
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
