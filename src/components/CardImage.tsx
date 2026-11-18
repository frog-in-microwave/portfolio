'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Image as ImageIcon, ImageOff } from 'lucide-react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  hoverEffect?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  hoverEffect = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    // If image is already complete in memory/cache
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-[#0c121e] ${containerClassName}`}>
      {/* Skeleton & Spinner Loader (visible until image finishes loading) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0c121e]">
          {/* Subtle Shimmer background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />

          {/* Loader Graphic & Label */}
          <div className="relative z-10 flex flex-col items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <div className="w-9 h-9 rounded-full border-2 border-slate-700/80 border-t-amber-400 animate-spin" />
              <ImageIcon className="w-4 h-4 text-amber-400/80 absolute" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-white/10 shadow-sm">
              <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
              <span className="text-[10px] font-mono font-medium text-slate-300 uppercase tracking-wider">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c121e] text-slate-500 p-4 text-center">
          <ImageOff className="w-6 h-6 mb-1.5 opacity-60 text-slate-400" />
          <span className="text-[10px] font-mono text-slate-400">Preview unavailable</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
          } ${hoverEffect ? 'group-hover:scale-105' : ''} ${className}`}
        />
      )}
    </div>
  );
};
