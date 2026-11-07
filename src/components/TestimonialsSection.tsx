import React from 'react';
import { MessageSquare, Quote, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Recommendations & Peer Feedback
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            What engineering leaders and research collaborators have to say about working with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.relation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
