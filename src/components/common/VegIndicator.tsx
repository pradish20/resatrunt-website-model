/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VegIndicatorProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const VegIndicator: React.FC<VegIndicatorProps> = ({
  isVeg,
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const innerSizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <div
        className={`${sizeMap[size]} border ${
          isVeg ? 'border-[#15803d]' : 'border-[#991b1b]'
        } flex items-center justify-center p-[2px] rounded-[3px] bg-white`}
        title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
      >
        {isVeg ? (
          // Green solid circle for Vegetarian
          <span className={`${innerSizeMap[size]} rounded-full bg-[#15803d]`}></span>
        ) : (
          // Brown/Maroon solid triangle for Non-Vegetarian
          <span
            className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#991b1b]"
          ></span>
        )}
      </div>
      {showLabel && (
        <span
          className={`text-xs font-medium tracking-wide ${
            isVeg ? 'text-[#15803d]' : 'text-[#991b1b]'
          }`}
        >
          {isVeg ? 'Pure Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
