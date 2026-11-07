'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * PlayfulCursor Component
 * 
 * Replaces the default system arrow with a goofy, squishy, expressive blob
 * that reacts to hovering and clicking.
 * 
 * Features:
 * 1. Smooth Spring Physics: Uses linear interpolation (lerp) to follow mouse movement with buoyant inertia.
 * 2. Expressive Face & Morphing Blob: Animated squishy geometry with two playful eye dots that blink.
 * 3. Hover Reaction: Expands and changes color when hovering clickable elements (`a`, `button`, inputs).
 * 4. Click Squish: Compresses (`scale: 0.75`) on mousedown.
 * 5. Touch Friendly: Completely disabled on phones/touchscreens to preserve 100% natural touch scrolling.
 */
export const PlayfulCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailingRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const trailingPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports fine hover (desktop/laptop with mouse)
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    setMounted(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect clickable elements for goofy expansion
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('textarea') ||
        target?.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation frame loop for buttery smooth 60fps tracking
    let frameId: number;
    const render = () => {
      // Lerp main blob
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

      // Slower lerp for playful trailing aura
      trailingPos.current.x += (mousePos.current.x - trailingPos.current.x) * 0.12;
      trailingPos.current.y += (mousePos.current.y - trailingPos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Playful Trailing Halo */}
      <div
        ref={trailingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full blur-md transition-all duration-300 ${
            isHovering
              ? 'w-14 h-14 bg-gradient-to-tr from-rose-500 to-amber-400'
              : 'w-10 h-10 bg-gradient-to-tr from-amber-400 to-cyan-400'
          }`}
        />
      </div>

      {/* Main Goofy Squishy Blob Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isClicking
              ? 'scale-75'
              : isHovering
              ? 'scale-125'
              : 'scale-100'
          }`}
        >
          {/* Morphing Blob Body */}
          <div
            className={`animate-blob-wobble shadow-lg transition-colors duration-300 flex items-center justify-center ${
              isHovering
                ? 'w-9 h-9 bg-gradient-to-br from-rose-400 to-amber-400 text-slate-950 shadow-rose-500/40'
                : 'w-7 h-7 bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-amber-500/40'
            }`}
          >
            {/* Goofy Mini Face */}
            <div className="flex items-center gap-1">
              <span className="w-1 h-1.5 bg-slate-950 rounded-full animate-pulse" />
              <span className="w-1 h-1.5 bg-slate-950 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Mini Cute Hover Tag */}
          {isHovering && (
            <span className="absolute -top-3 left-6 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-400 text-slate-950 shadow-sm whitespace-nowrap">
              tap!
            </span>
          )}
        </div>
      </div>
    </>
  );
};
