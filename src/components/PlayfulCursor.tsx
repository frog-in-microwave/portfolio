'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * PlayfulCursor Component
 * 
 * Replaces the system pointer with a tactile, fluid blob that follows the cursor
 * with physics-based linear interpolation (lerp).
 * 
 * Features:
 * 1. Fluid Inertia: Lerps towards cursor coordinates at 60 FPS.
 * 2. Morphing Geometry: Organic blob shape with smooth breathing animations.
 * 3. Element Reaction: Expands smoothly on clickable elements and compresses on mousedown.
 * 4. Zero Mobile Interference: Automatically disabled on touch screens.
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
    // Only mount on devices with a mouse/trackpad
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

    // Detect clickable elements for fluid expansion
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

    let frameId: number;
    const render = () => {
      // Lerp main blob
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

      // Trailing glow ring
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
      {/* Fluid Trailing Ring */}
      <div
        ref={trailingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-35' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full blur-md transition-all duration-300 ${
            isHovering
              ? 'w-12 h-12 bg-gradient-to-tr from-rose-500 to-amber-400'
              : 'w-8 h-8 bg-gradient-to-tr from-amber-400 to-cyan-400'
          }`}
        />
      </div>

      {/* Main Fluid Blob Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`relative transition-all duration-200 ${
            isClicking
              ? 'scale-75'
              : isHovering
              ? 'scale-125'
              : 'scale-100'
          }`}
        >
          <div
            className={`animate-blob-wobble shadow-lg transition-colors duration-300 ${
              isHovering
                ? 'w-7 h-7 bg-gradient-to-br from-rose-400 to-amber-400 shadow-rose-500/40'
                : 'w-5 h-5 bg-gradient-to-br from-amber-300 to-amber-500 shadow-amber-500/40'
            }`}
          />
        </div>
      </div>
    </>
  );
};
