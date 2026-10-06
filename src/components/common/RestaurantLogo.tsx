/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface RestaurantLogoProps {
  variant?: 'light' | 'dark' | 'emerald';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const RestaurantLogo: React.FC<RestaurantLogoProps> = ({
  variant = 'emerald',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  // Variant styles
  const isDarkBg = variant === 'light'; // Light text on dark bg
  const mainTextColor = isDarkBg ? 'text-white' : 'text-[#0f3822]';
  const subtitleColor = isDarkBg ? 'text-[#c5a869]' : 'text-[#a3833e]';
  const leafColor = isDarkBg ? '#c5a869' : '#0f3822';
  const leafAccent = isDarkBg ? '#ffffff' : '#c5a869';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.18em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl tracking-[0.25em]',
    xl: 'text-3xl tracking-[0.28em]',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9.5px] tracking-[0.28em]',
    lg: 'text-[11px] tracking-[0.32em]',
    xl: 'text-[13px] tracking-[0.35em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Seal / Emblem (Referenced from 4th uploaded photo branding) */}
      <div
        className={`${iconSizes[size]} shrink-0 flex items-center justify-center rounded-lg ${
          isDarkBg
            ? 'bg-[#14452f] ring-1 ring-[#c5a869]/40 shadow-sm'
            : 'bg-[#f4f7f5] ring-1 ring-[#0f3822]/15 shadow-sm'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Royal Crest Arch */}
          <path
            d="M 20 82 L 20 40 C 20 23.4 33.4 10 50 10 C 66.6 10 80 23.4 80 40 L 80 82"
            stroke={leafAccent}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Inner Botanical Leaf Sprout */}
          <path
            d="M 50 24 C 42 35 40 48 50 64 C 60 48 58 35 50 24 Z"
            fill={leafColor}
          />
          <path
            d="M 50 56 C 36 50 30 38 28 28 C 38 32 46 42 50 56 Z"
            fill={leafAccent}
            opacity="0.9"
          />
          <path
            d="M 50 56 C 64 50 70 38 72 28 C 62 32 54 42 50 56 Z"
            fill={leafAccent}
            opacity="0.9"
          />
          {/* Golden Diamond Seal Base */}
          <polygon points="50,70 57,76 50,82 43,76" fill={leafAccent} />
          <line
            x1="28"
            y1="82"
            x2="72"
            y2="82"
            stroke={leafAccent}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black ${titleSizes[size]} ${mainTextColor} uppercase transition-colors`}
          style={{ letterSpacing: '0.14em' }}
        >
          GREEN
        </span>
        <span
          className={`font-sans font-bold ${subSizes[size]} ${subtitleColor} uppercase mt-0.5`}
          style={{ letterSpacing: '0.24em' }}
        >
          FAMILY RESTAURANT
        </span>
        {showTagline && (
          <span
            className={`text-xs italic font-serif mt-1 ${
              isDarkBg ? 'text-[#c2d6cc]' : 'text-[#4a6b57]'
            }`}
          >
            Good Food · Warm Moments · Family Together
          </span>
        )}
      </div>
    </div>
  );
};
