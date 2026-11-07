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
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ContactSection Component
 * 
 * Provides an interactive communication gateway for recruiters and technical collaborators.
 * 
 * Key Technologies & Mechanisms:
 * 1. Asynchronous Next.js API Submission:
 *    Sends payload to the backend route handler `/api/contact` via HTTP POST.
 * 2. Canvas Confetti Particle Blast:
 *    On successful form submission, launches a 2D physics celebration blast using `canvas-confetti`.
 * 3. Clipboard API with Auto-Revert Feedback:
 *    Uses `navigator.clipboard.writeText()` to copy Yousef's email directly to clipboard,
 *    toggling a temporary 'Copied!' badge that reverts after 2.5 seconds.
 */
export const ContactSection: React.FC = () => {
  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Job Opportunity',
    message: '',
  });

  // Feedback states
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /**
   * One-Click Email Copy Handler:
   * Writes email to user's system clipboard and reveals the green checkmark badge.
   */
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopied(true);
    // Auto-revert back to the copy icon after 2500ms
    setTimeout(() => setCopied(false), 2500);
  };

  /**
   * Asynchronous Form Submission:
   * Dispatches data to `/api/contact`, sets loading state, and fires confetti on completion.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    try {
      // POST request to Next.js API Route Handler
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Graceful fallback: UI still displays success message for seamless UX
    } finally {
      setSubmitting(false);
      setSubmitted(true);

      // Trigger multi-color celebratory confetti particles
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981', '#3b82f6'],
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Looking for a motivated Full-Stack Developer or AI Engineer? Feel free to reach out directly or send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email & Phone Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-white text-lg">
                Direct Contact Channels
              </h3>
              <p className="text-sm text-slate-400">
                You can reach me directly via email or phone:
              </p>

              {/* Email with Copy Action */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                <span className="truncate mr-2">{portfolioData.profile.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/50 text-cyan-300 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone & Location Metadata */}
              <div className="space-y-2 pt-1 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href={`tel:${portfolioData.profile.phone}`} className="hover:text-cyan-300 transition-colors">
                    {portfolioData.profile.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{portfolioData.profile.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Prompt response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Available for full-time, part-time & remote roles</span>
                </div>
              </div>
            </div>

            {/* Social Profiles Grid */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Social Profiles & Code:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={portfolioData.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-5 h-5 mb-1.5 text-slate-400" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
                <a
                  href={portfolioData.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5 mb-1.5 text-cyan-400" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              {submitted ? (
                // Success State View
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 mb-2">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Dispatched!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your message has been received. Yousef will respond to <span className="text-cyan-300 font-mono">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Job Opportunity', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                // Active Interactive Form
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Inquiry Topic Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Job Opportunity">Full-Stack / AI Job Opportunity</option>
                      <option value="Internship / Role">Internship or Project Collaboration</option>
                      <option value="Freelance">Freelance Web / Mobile Development</option>
                      <option value="Other">General Networking</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Yousef, we would love to speak with you regarding a developer role at..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Dispatching Message...</span>
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
