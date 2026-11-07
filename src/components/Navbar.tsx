'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Code2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenCopilot: () => void;
}

/**
 * Navbar Component
 * 
 * Provides responsive, glassmorphic navigation pinned to the top of the viewport.
 * 
 * Key Features:
 * 1. Scroll-Triggered Glassmorphism:
 *    When `window.scrollY > 30`, adds a backdrop blur and border to avoid obscuring content.
 * 2. Real-Time Scroll-Spy:
 *    Inspects section elements via `getBoundingClientRect()` to illuminate the active nav link
 *    as the visitor scrolls down the page.
 * 3. Quick Action Hub:
 *    Direct triggers for the AI Copilot modal and direct resume PDF download.
 * 4. Responsive Mobile Drawer:
 *    Slide-down mobile menu for phones and tablets.
 */
export const Navbar: React.FC<NavbarProps> = ({ onOpenCopilot }) => {
  // Flag indicating if the user has scrolled past the top threshold
  const [scrolled, setScrolled] = useState(false);

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section identifier ('about', 'skills', 'projects', 'experience', 'contact')
  const [activeSection, setActiveSection] = useState('about');

  // Navigation targets mapping to DOM element IDs
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience & Education', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  /**
   * Scroll listener with passive flag for 60fps performance.
   * Calculates which section is currently centered in the viewport.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
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
          ? 'bg-[#080B11]/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg shadow-black/30' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
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
                  FULL-STACK & AI
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Software & Computer Engineer
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

          {/* Desktop Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Copilot Trigger */}
            <button
              onClick={onOpenCopilot}
              className="relative group flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-600/30 transition-all cursor-pointer shadow-sm shadow-cyan-950"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Copilot</span>
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            </button>

            {/* Direct Resume PDF Link */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
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

      {/* Slide-Down Mobile Drawer Menu */}
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
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 text-sm font-medium text-slate-200"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume (PDF)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCopilot();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-cyan-900/30"
            >
              <Bot className="w-4 h-4" />
              <span>Chat with Yousef's AI Copilot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
