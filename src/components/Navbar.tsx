'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Menu, 
  X, 
  Code2,
  ArrowRight,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Mail,
  User
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * Navbar Component
 * 
 * Features:
 * - Desktop: Floating pill navbar with real-time scroll-spy.
 * - Mobile: True slide-in drawer with dark backdrop blur, thumb-friendly tap targets,
 *   and lock on background scrolling when open.
 */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  // Scroll detection for navbar elevation & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
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
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#090D16]/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-lg shadow-black/20' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <a 
              href="#" 
              className="flex items-center gap-2.5 group focus:outline-none rounded-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-500 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0E1424] rounded-[10px] flex items-center justify-center text-amber-400">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-slate-100 text-base sm:text-lg tracking-tight group-hover:text-amber-300 transition-colors">
                    {portfolioData.profile.name}
                  </span>
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

            {/* Desktop Action Hub */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 text-slate-950 hover:brightness-110 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-950" />
                <span>Resume (CV)</span>
              </a>
            </div>

            {/* Mobile Controls (Hamburger Drawer Trigger) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 hover:text-white active:scale-95 transition-transform"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-IN DRAWER
          ========================================================================= */}
      {/* 1. Dark Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-In Drawer Panel from Right */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-[#0C1220] border-l border-white/10 z-50 md:hidden shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-500 p-[1.5px]">
              <div className="w-full h-full bg-[#0E1424] rounded-[9px] flex items-center justify-center text-amber-400">
                <Code2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-white">
                {portfolioData.profile.name}
              </div>
              <div className="text-[10px] text-amber-400 font-mono font-medium">
                Navigation
              </div>
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
              </a>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-white/10 space-y-3 bg-[#090E1A]">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Download Resume PDF</span>
          </a>


        </div>
      </aside>
    </>
  );
};
