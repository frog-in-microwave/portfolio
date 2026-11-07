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
  Sparkles,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ContactSection Component - Colorful, Tactile & Mobile-First
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Graceful fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#F43F5E', '#10B981', '#8B5CF6', '#06B6D4'],
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E] border border-cyan-400/30 text-xs font-mono font-bold text-cyan-300">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have an open engineering role, a software project, or want to say hi? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Email & Phone Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111726]/90 border border-white/10 pop-card glow-amber space-y-4">
              <h3 className="font-heading font-extrabold text-white text-lg">
                Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Quickest way to reach me directly:
              </p>

              {/* Email Pill with Copy Button */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                <span className="truncate mr-2 font-semibold">{portfolioData.profile.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone & Location */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <a href={`tel:${portfolioData.profile.phone}`} className="hover:text-amber-300 transition-colors font-bold">
                    {portfolioData.profile.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>{portfolioData.profile.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Responds within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open to full-time & remote roles</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={portfolioData.profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#111726]/90 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white font-bold text-xs transition-colors pop-card"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={portfolioData.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#111726]/90 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 font-bold text-xs transition-colors pop-card"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111726]/90 border border-white/10 pop-card glow-mint">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Transmission Dispatched!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Yousef will get back to you at <span className="text-amber-300 font-mono">{formData.email}</span> soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Full-Stack / AI Opportunity', message: '' });
                    }}
                    className="mt-4 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-bold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0F1524] border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Full-Stack / AI Opportunity">Full-Stack / AI Engineering Role</option>
                      <option value="Internship / Role">Internship or Project Collaboration</option>
                      <option value="Freelance Web/Mobile">Freelance Web / Mobile Project</option>
                      <option value="Other">General Networking</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Yousef, we loved your work with Next.js and GCP and would love to talk..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
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
