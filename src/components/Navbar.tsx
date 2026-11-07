import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Terminal, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  Code2,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenCopilot: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCopilot, onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ['about', 'skills', 'architecture', 'projects', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080B11]/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg shadow-black/30' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-slate-100 text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
                  {portfolioData.profile.name}
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-400">
                  AI / FULL-STACK
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Systems & ML Engineer
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 shadow-sm shadow-cyan-900/40 border border-cyan-800/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Terminal Button */}
            <button
              onClick={onOpenTerminal}
              title="Open CLI Terminal (Ctrl+K or Cmd+K)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>CLI</span>
              <kbd className="text-[10px] px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">⌘K</kbd>
            </button>

            {/* AI Copilot Button */}
            <button
              onClick={onOpenCopilot}
              className="relative group flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-600/30 transition-all cursor-pointer shadow-sm shadow-cyan-950"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI Copilot</span>
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            </button>

            {/* Resume Button */}
            <a
              href={portfolioData.profile.resumeUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>CV</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCopilot}
              className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400"
              aria-label="Open AI Copilot"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0e1a]/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-slate-300"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Open Developer CLI Terminal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCopilot();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-cyan-900/30"
            >
              <Bot className="w-4 h-4" />
              <span>Chat with Portfolio AI Copilot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
