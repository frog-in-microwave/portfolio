'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  Phone,
  ShieldCheck, 
  MapPin, 
  MessageCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ContactSection Component - Hyper-Responsive & Mobile-First
 * 
 * Mobile UX Highlights:
 * 1. Fluid container & card padding (p-4 on small screens to preserve input width).
 * 2. 16px font-size on mobile inputs to eliminate iOS Safari automatic zoom-in bug.
 * 3. 48px+ minimum touch targets for all buttons, links, and select fields.
 * 4. Tap-to-call and tap-to-email high-affordance cards with independent one-tap copy.
 * 5. Smooth focus states with colorful glow rings for tactile feedback.
 */
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Full-Stack / AI Opportunity',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch email. Please try again or reach out directly.');
      }

      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#F43F5E', '#10B981', '#8B5CF6', '#06B6D4'],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while sending your message.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#131B2E] border border-cyan-400/30 text-xs font-mono font-bold text-cyan-300">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Connect &amp; Collaborate
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Have an open engineering role, a software project, or want to say hi? Reach out anytime.
          </p>
        </div>

        {/* =========================================================================
            MAIN GRID (Mobile-First Stack -> 2-Column on Desktop)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Direct Contact Cards & Socials (5 Cols on Desktop)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            
            {/* Direct Contact Card */}
            <div className="p-4 xs:p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#111726]/90 border border-white/10 pop-card glow-amber space-y-4">
              <div>
                <h3 className="font-heading font-extrabold text-white text-base sm:text-lg">
                  Direct Contact
                </h3>
                <p className="text-xs text-slate-400 pt-0.5">
                  Tap to connect instantly via email or phone:
                </p>
              </div>

              {/* Email Touch Card with Quick Copy */}
              <div className="relative group rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors p-3 sm:p-3.5 flex items-center justify-between gap-2.5">
                <a
                  href={`mailto:${portfolioData.profile.email}`}
                  className="flex items-center gap-2.5 min-w-0 flex-1 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Open mail client"
                >
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Email</div>
                    <div className="text-xs sm:text-sm font-mono text-slate-200 truncate font-semibold">
                      {portfolioData.profile.email}
                    </div>
                  </div>
                </a>

                {/* Independent One-Tap Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-mono transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-950 stroke-[3]" />
                      <span className="hidden xs:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone & Location Cards */}
              <div className="grid grid-cols-1 gap-2.5 pt-0.5">
                {/* Phone Tap-to-Call Card */}
                <a
                  href={`tel:${portfolioData.profile.phone}`}
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors group cursor-pointer"
                  title="Call Yousef directly"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Phone / WhatsApp</div>
                      <div className="text-xs sm:text-sm font-mono text-slate-200 group-hover:text-emerald-300 font-bold transition-colors">
                        {portfolioData.profile.phone}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0 hidden xs:inline">
                    Tap to Call
                  </span>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Location</div>
                    <div className="text-xs font-mono text-slate-300 truncate">
                      {portfolioData.profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges: Response Time & Availability */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 xs:grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Responds &lt; 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Open to Remote</span>
                </div>
              </div>
            </div>

            {/* Social Channels (48px Touch Targets) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <a
                href={portfolioData.profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#111726]/90 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition-all active:scale-95 pop-card"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500 hidden xs:inline" />
              </a>

              <a
                href={portfolioData.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#111726]/90 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 font-bold text-xs sm:text-sm transition-all active:scale-95 pop-card"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-cyan-400/50 hidden xs:inline" />
              </a>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Contact Form (7 Cols on Desktop)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111726]/90 border border-white/10 pop-card glow-mint">
              {submitted ? (
                <div className="text-center py-8 sm:py-12 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Message Dispatched!
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-bold">{formData.name}</span>. Yousef will review your message and reply to <span className="text-amber-300 font-mono break-all font-semibold">{formData.email}</span> shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Full-Stack / AI Opportunity', message: '' });
                    }}
                    className="mt-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name and Email Inputs (Stacked on Mobile, 2-Col on Tablet/Desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="contact-name"
                        className="text-xs font-mono text-slate-300 font-bold block"
                      >
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        /* Note: text-base on mobile prevents iOS Safari from automatically zooming into the page */
                        className="w-full px-3.5 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-base sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label 
                        htmlFor="contact-email"
                        className="text-xs font-mono text-slate-300 font-bold block"
                      >
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-base sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Inquiry Topic Dropdown */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-topic"
                      className="text-xs font-mono text-slate-300 font-bold block"
                    >
                      Inquiry Topic
                    </label>
                    <div className="relative">
                      <select
                        id="contact-topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full appearance-none px-3.5 sm:px-4 py-3 pr-10 rounded-xl sm:rounded-2xl bg-[#0F1524] border border-white/10 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
                      >
                        <option value="Full-Stack / AI Opportunity">Full-Stack / AI Engineering Role</option>
                        <option value="Internship / Role">Internship or Project Collaboration</option>
                        <option value="Freelance Web/Mobile">Freelance Web / Mobile Project</option>
                        <option value="Other">General Networking &amp; Discussion</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-message"
                      className="text-xs font-mono text-slate-300 font-bold block"
                    >
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Yousef, we loved your work with Next.js and cloud architecture and would love to discuss an engineering opportunity..."
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-base sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Error Notification Banner */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono space-y-1 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5">
                        <span>Failed to send message:</span>
                      </div>
                      <p className="text-slate-300 font-sans">{errorMessage}</p>
                    </div>
                  )}

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
