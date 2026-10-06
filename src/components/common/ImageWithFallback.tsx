/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageOff, Utensils } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText = 'Green Family Restaurant',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative overflow-hidden bg-[#e8ece9] ${containerClassName}`}
    >
      {isLoading && !showFallback && (
        <div className="absolute inset-0 bg-[#dbe2de] animate-pulse" />
      )}

      {showFallback ? (
        <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#14452f]/10 to-[#14452f]/5 border border-[#14452f]/15">
          <Utensils className="w-8 h-8 text-[#14452f]/40 mb-2" />
          <span className="text-xs font-serif font-medium text-[#14452f]/70 line-clamp-1">
            {fallbackText}
          </span>
          <span className="text-[10px] text-[#14452f]/40 mt-0.5">
            Green Family Restaurant
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
