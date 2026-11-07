'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Smile
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenCopilot: () => void;
}

/**
 * Navbar Component - Colorful & Ultra-Mobile-Responsive
 * 
 * Features:
 * - Playful branding with colorful emoji badge
 * - Tactile floating pill navigation
 * - Thumb-friendly tap targets for mobile phones
 * - Real-time active section indicator
 */
export const Navbar: React.FC<NavbarProps> = ({ onOpenCopilot }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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
          ? 'bg-[#090D16]/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-lg shadow-black/20' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Playful Pop Dot */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 group focus:outline-none rounded-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-500 p-[2px] shadow-md shadow-amber-500/20 group-hover:rotate-6 transition-transform">
              <div className="w-full h-full bg-[#0E1424] rounded-[10px] flex items-center justify-center text-amber-400">
                <Smile className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-slate-100 text-base sm:text-lg tracking-tight group-hover:text-amber-300 transition-colors">
                  {portfolioData.profile.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-amber-400/90 font-mono font-medium hidden sm:block">
                Full-Stack & Cloud Dev
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121826]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-slate-950 bg-amber-400 shadow-sm shadow-amber-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Ask Copilot Button with Gradient */}
            <button
              onClick={onOpenCopilot}
              className="group flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 text-slate-950 hover:brightness-110 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-slate-950" />
              <span>Ask AI Copilot</span>
              <Sparkles className="w-3 h-3 text-slate-950 animate-pulse" />
            </button>

            {/* Resume Link */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>CV</span>
            </a>
          </div>

          {/* Mobile Right Controls: Copilot & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold text-xs shadow-sm"
              aria-label="Open AI Copilot"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Down Mobile Drawer (Large Thumb-Friendly Buttons) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1321]/95 backdrop-blur-2xl border-b border-white/10 px-5 pt-4 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-white/5 active:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-white shadow-sm"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
