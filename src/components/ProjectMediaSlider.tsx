'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  Smartphone, 
  Monitor, 
  MoveHorizontal,
  SlidersHorizontal,
  Maximize2,
  X
} from 'lucide-react';
import { ProjectMedia } from '@/data/portfolioData';

interface ProjectMediaSliderProps {
  media: ProjectMedia[];
  projectTitle: string;
}

export const ProjectMediaSlider: React.FC<ProjectMediaSliderProps> = ({ media, projectTitle }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrubberTrackRef = useRef<HTMLDivElement>(null);

  // Intrinsic aspect ratios (naturalWidth / naturalHeight) dynamically stored per image
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});
  
  // Continuous scroll progress: 0 to 100 percentage
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fullscreen mode state: index of media currently viewed in fullscreen (null if closed)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  // Mouse / Pointer drag state (for continuous desktop momentum sliding)
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Scrubber drag state
  const isScrubbingRef = useRef(false);

  // Cancel any active momentum glide animation
  const stopMomentum = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // Update progress bar and boundary states in real time
  const handleScrollUpdate = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    
    // Exact percentage of scroll from 0 to 100
    const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
    setScrollProgress(progress);

    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);
  }, []);

  // Listen to native scroll events (for 120Hz smooth mobile touch swipes)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    handleScrollUpdate();
    slider.addEventListener('scroll', handleScrollUpdate, { passive: true });
    window.addEventListener('resize', handleScrollUpdate);

    return () => {
      slider.removeEventListener('scroll', handleScrollUpdate);
      window.removeEventListener('resize', handleScrollUpdate);
      stopMomentum();
    };
  }, [handleScrollUpdate, stopMomentum, media.length]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (fullscreenIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullscreenIndex]);

  // Keyboard navigation inside fullscreen view (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (fullscreenIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setFullscreenIndex((prev) => (prev !== null && prev < media.length - 1 ? prev + 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIndex, media.length]);

  // When an image loads, record its true aspect ratio so width calculates dynamically
  const handleImageLoad = (idx: number, naturalWidth: number, naturalHeight: number) => {
    if (naturalWidth && naturalHeight) {
      const ratio = naturalWidth / naturalHeight;
      setAspectRatios((prev) => {
        if (prev[idx] === ratio) return prev;
        return {
          ...prev,
          [idx]: ratio,
        };
      });
      setTimeout(handleScrollUpdate, 60);
    }
  };

  // Smooth slide step (for Left/Right navigation buttons)
  const slideStep = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;
    stopMomentum();

    // Responsive step: glides ~75% of visible viewport width
    const step = slider.clientWidth * 0.75;
    slider.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Pointer drag logic (smooth glide for desktop mouse users)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture primary mouse button or touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    stopMomentum();
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    scrollStartRef.current = slider.scrollLeft;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const currentX = e.clientX;
    const deltaTotal = currentX - startXRef.current;

    if (Math.abs(deltaTotal) > 6) {
      hasMovedRef.current = true;
    }

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    const dx = currentX - lastXRef.current;

    if (dt > 0) {
      velocityRef.current = dx / dt; // px per ms
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;

    slider.scrollLeft = scrollStartRef.current - deltaTotal;
  };

  const handlePointerUpOrCancel = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    // Apply fluid momentum coasting if released with flick velocity
    const slider = sliderRef.current;
    if (!slider) return;

    let v = velocityRef.current;
    if (Math.abs(v) > 0.15) {
      const friction = 0.94;
      const momentumStep = () => {
        v *= friction;
        slider.scrollLeft -= v * 16;
        if (Math.abs(v) > 0.02) {
          animFrameRef.current = requestAnimationFrame(momentumStep);
        } else {
          animFrameRef.current = null;
        }
      };
      animFrameRef.current = requestAnimationFrame(momentumStep);
    }
  };

  // Interactive scrubber bar click & drag handling
  const handleScrubberAction = (clientX: number) => {
    const track = scrubberTrackRef.current;
    const slider = sliderRef.current;
    if (!track || !slider) return;

    const rect = track.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clickX / rect.width;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    slider.scrollTo({
      left: ratio * maxScroll,
      behavior: 'smooth',
    });
  };

  const onScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isScrubbingRef.current = true;
    handleScrubberAction(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (isScrubbingRef.current) {
        handleScrubberAction(moveEvent.clientX);
      }
    };

    const onMouseUp = () => {
      isScrubbingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4 pt-2">
      {/* =========================================================================
          SLIDER HEADER (Mobile-First Layout)
          ========================================================================= */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white tracking-wide truncate flex items-center gap-2">
              <span>Visual Gallery</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 shrink-0">
                {media.length} {media.length === 1 ? 'item' : 'items'}
              </span>
            </h3>
            <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-0.5 truncate">
              <MoveHorizontal className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Slide freely • Tap any image for full screen</span>
            </p>
          </div>
        </div>

        {/* Quick glide navigation arrows (visible when multiple images exist) */}
        {media.length > 1 && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => slideStep('left')}
              disabled={!canScrollLeft}
              title="Slide Left"
              aria-label="Slide Left"
              className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer shadow-sm ${
                canScrollLeft
                  ? 'bg-[#111726] border-white/15 text-slate-200 hover:text-white hover:border-white/30 hover:bg-[#182033]'
                  : 'bg-[#111726]/40 border-white/5 text-slate-600 cursor-not-allowed opacity-30'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => slideStep('right')}
              disabled={!canScrollRight}
              title="Slide Right"
              aria-label="Slide Right"
              className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer shadow-sm ${
                canScrollRight
                  ? 'bg-[#111726] border-white/15 text-slate-200 hover:text-white hover:border-white/30 hover:bg-[#182033]'
                  : 'bg-[#111726]/40 border-white/5 text-slate-600 cursor-not-allowed opacity-30'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          CONTINUOUS FLUID SLIDING TRACK (Dynamic Width Per Image Based on Height)
          ========================================================================= */}
      <div className="relative group/track">
        <div
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          className={`flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none select-none overscroll-x-contain ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y', // Smooth vertical page scrolling without resistance
          }}
        >
          {media.map((item, idx) => {
            const ratio = aspectRatios[idx];
            const isPortrait = ratio ? ratio < 0.95 : false;

            return (
              <div
                key={idx}
                style={{
                  width: 'fit-content',
                }}
                className="shrink-0 flex flex-col rounded-2xl overflow-hidden bg-[#0c121e] border border-white/10 pop-card shadow-lg select-none transition-all duration-300 hover:border-white/20 group/card"
              >
                {/* Visual Container: EXACT UNIFORM HEIGHT across all cards, width determined dynamically by the image */}
                <div
                  className="relative h-[240px] xs:h-[280px] sm:h-[330px] md:h-[370px] lg:h-[400px] w-auto bg-[#080d16] flex items-center justify-center overflow-hidden cursor-zoom-in"
                  onClick={() => {
                    // Only trigger fullscreen if user clicked without dragging
                    if (!hasMovedRef.current) {
                      setFullscreenIndex(idx);
                    }
                  }}
                  title="Click to view full screen"
                >
                  <img
                    ref={(el) => {
                      if (el && el.naturalWidth && el.naturalHeight && !aspectRatios[idx]) {
                        handleImageLoad(idx, el.naturalWidth, el.naturalHeight);
                      }
                    }}
                    src={item.url}
                    alt={item.caption || `${projectTitle} media asset ${idx + 1}`}
                    draggable={false}
                    onLoad={(e) => {
                      handleImageLoad(
                        idx,
                        e.currentTarget.naturalWidth,
                        e.currentTarget.naturalHeight
                      );
                    }}
                    className="h-full w-auto max-w-none object-contain block pointer-events-none select-none transition-transform duration-500 group-hover/card:scale-[1.02]"
                    style={{
                      aspectRatio: ratio ? `${ratio}` : undefined,
                    }}
                  />

                  {/* Badges Overlay Header */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    {/* Device Tag */}
                    {ratio ? (
                      isPortrait ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950/85 border border-cyan-400/40 text-cyan-300 flex items-center gap-1 backdrop-blur-md shadow-sm">
                          <Smartphone className="w-3 h-3 text-cyan-400" />
                          <span>Mobile</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-950/80 border border-white/10 text-slate-300 flex items-center gap-1 backdrop-blur-md shadow-sm">
                          <Monitor className="w-3 h-3 text-slate-400" />
                          <span>Desktop</span>
                        </span>
                      )
                    ) : null}

                    {/* Numerical Index Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-amber-300 ml-auto">
                      {idx + 1} / {media.length}
                    </span>
                  </div>

                  {/* Subtle Fullscreen hover icon */}
                  <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Caption Bar: Constrained to match the dynamic image width exactly */}
                {item.caption && (
                  <div
                    className="p-3 bg-[#111726]/95 border-t border-white/5 flex-1 flex flex-col justify-center"
                    style={{ width: 0, minWidth: '100%', maxWidth: '100%' }}
                  >
                    <p className="text-xs font-mono text-slate-300 line-clamp-2 break-words leading-relaxed">
                      <span className="text-amber-400 font-bold mr-1.5">Fig {idx + 1}.0</span>
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          CONTINUOUS SCRUBBER SLIDER (Actual interactive slider, not discrete dots)
          ========================================================================= */}
      {media.length > 1 && (
        <div className="pt-1 px-1 space-y-1.5">
          {/* Interactive Slider Track */}
          <div
            ref={scrubberTrackRef}
            onMouseDown={onScrubberMouseDown}
            onTouchStart={(e) => {
              if (e.touches[0]) handleScrubberAction(e.touches[0].clientX);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) handleScrubberAction(e.touches[0].clientX);
            }}
            title="Click or drag to slide across gallery"
            className="group relative h-2.5 w-full bg-[#111726] rounded-full border border-white/10 cursor-pointer overflow-hidden p-0.5 transition-colors hover:border-white/20"
          >
            {/* Sliding Fluid Indicator Bar */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 shadow-sm transition-all duration-75"
              style={{
                width: `${Math.max(12, scrollProgress)}%`,
              }}
            />
          </div>

          {/* Mobile Status Line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <SlidersHorizontal className="w-2.5 h-2.5 text-amber-400/80" />
              <span>Fluid gallery reel</span>
            </span>
            <span>
              {Math.round(scrollProgress)}% explored
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL SCREEN DISPLAY MODE (High-Resolution Viewport Overlay)
          ========================================================================= */}
      {fullscreenIndex !== null && media[fullscreenIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setFullscreenIndex(null)}
        >
          {/* Top Bar: Title, Count, Device Badge, Close Button */}
          <div
            className="w-full max-w-6xl flex items-center justify-between gap-4 z-50 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                {fullscreenIndex + 1} of {media.length}
              </span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {projectTitle}
              </span>
            </div>

            <button
              onClick={() => setFullscreenIndex(null)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer shadow-lg"
              title="Close Full Screen (Esc)"
              aria-label="Close Full Screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Area: Full Screen Image + Navigation Controls */}
          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Image Button */}
            {media.length > 1 && (
              <button
                onClick={() => setFullscreenIndex(Math.max(0, fullscreenIndex - 1))}
                disabled={fullscreenIndex === 0}
                className={`absolute left-2 sm:left-4 z-50 p-3 rounded-2xl border backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl ${
                  fullscreenIndex === 0
                    ? 'bg-slate-900/40 border-white/5 text-slate-600 opacity-20 cursor-not-allowed'
                    : 'bg-[#111726]/90 border-white/20 text-white hover:bg-[#182033] hover:scale-105'
                }`}
                title="Previous Image (Left Arrow)"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Next Image Button */}
            {media.length > 1 && (
              <button
                onClick={() => setFullscreenIndex(Math.min(media.length - 1, fullscreenIndex + 1))}
                disabled={fullscreenIndex === media.length - 1}
                className={`absolute right-2 sm:right-4 z-50 p-3 rounded-2xl border backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl ${
                  fullscreenIndex === media.length - 1
                    ? 'bg-slate-900/40 border-white/5 text-slate-600 opacity-20 cursor-not-allowed'
                    : 'bg-[#111726]/90 border-white/20 text-white hover:bg-[#182033] hover:scale-105'
                }`}
                title="Next Image (Right Arrow)"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Full Screen Image Element */}
            <div className="relative max-h-[76vh] sm:max-h-[82vh] max-w-[92vw] flex items-center justify-center">
              <img
                src={media[fullscreenIndex].url}
                alt={media[fullscreenIndex].caption || `${projectTitle} full screen preview`}
                className="max-h-[76vh] sm:max-h-[82vh] max-w-[90vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Bottom Bar: Image Caption */}
          {media[fullscreenIndex].caption && (
            <div
              className="w-full max-w-2xl px-4 py-2.5 rounded-2xl bg-[#111726]/90 border border-white/10 text-center shadow-lg z-50 mb-1"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                <span className="text-amber-400 font-bold mr-2">
                  Fig {fullscreenIndex + 1}.0:
                </span>
                {media[fullscreenIndex].caption}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
