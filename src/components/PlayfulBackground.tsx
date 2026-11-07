'use client';

import React from 'react';

/**
 * PlayfulBackground Component
 * 
 * Replaces generic cyber particles with a warm, colorful, modern aesthetic:
 * 1. Warm radial ambient gradients (Sunny Amber, Soft Rose, Mint & Electric Violet).
 * 2. Subtle geometric dot grid.
 * 3. Soft floating blur blobs that give depth and character without distracting from readability.
 */
export const PlayfulBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#090D16]">
      {/* Playful Dot Grid */}
      <div className="absolute inset-0 bg-playful-grid opacity-70" />

      {/* Top Left Amber Sun Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px]" />

      {/* Top Right Violet Glow */}
      <div className="absolute top-10 -right-20 w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px]" />

      {/* Center Subtle Mint Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />

      {/* Bottom Coral Glow */}
      <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-rose-500/15 blur-[140px]" />
    </div>
  );
};
