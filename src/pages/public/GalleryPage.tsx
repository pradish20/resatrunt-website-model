/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryImage, GalleryCategory } from '../../types/restaurant';
import { Eye, Star, Layers } from 'lucide-react';

interface GalleryPageProps {
  images: GalleryImage[];
  onOpenLightbox: (index: number) => void;
}

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'INTERIOR', value: 'INTERIOR' },
  { label: 'EXTERIOR', value: 'EXTERIOR' },
  { label: 'DINING', value: 'DINING' },
  { label: 'ATMOSPHERE', value: 'ATMOSPHERE' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  images,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('ALL');

  // Filter images
  const filteredImages =
    selectedCategory === 'ALL'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="w-full bg-[#fbfbf9] min-h-[80vh] pb-24">
      {/* Page Header */}
      <section className="bg-[#092215] text-white py-16 border-b border-[#c5a869]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.24em] text-[#c5a869] uppercase">
            VISUAL WALKTHROUGH
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-wider text-white mt-2 mb-3">
            Restaurant Gallery
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#c2d9cc] font-light leading-relaxed">
            Experience the architectural presence, warm family dining halls, and authentic culinary spread at Green Family Restaurant.
          </p>
        </div>
      </section>

      {/* Category Filter Bar (Functional Interactive Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2 text-xs font-bold tracking-wider rounded-md transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0f3822] text-white shadow-xs'
                    : 'bg-white text-[#384c3f] border border-[#14452f]/15 hover:bg-[#edf3ef]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-serif font-bold text-slate-700">
              No photos currently categorized under {selectedCategory}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select &quot;ALL&quot; or choose another category to view images.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredImages.map((image, idx) => {
              // Find index in main images array for lightbox sync
              const realIndex = images.findIndex((img) => img.id === image.id);
              // Make featured or first image span larger for editorial rhythm
              const isHeroImage = image.is_featured && idx === 0;
              const spanClass = isHeroImage
                ? 'lg:col-span-8 h-80 sm:h-96 lg:h-[450px]'
                : idx % 3 === 0
                ? 'lg:col-span-6 h-72 sm:h-80'
                : 'lg:col-span-4 h-72 sm:h-80';

              return (
                <div
                  key={image.id}
                  onClick={() => onOpenLightbox(realIndex >= 0 ? realIndex : idx)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-[#14452f]/15 bg-[#092215] ${spanClass}`}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim & Captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-xs text-[#c5a869] border border-[#c5a869]/30">
                        {image.category}
                      </span>
                      {image.is_featured && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-400/30">
                          <Star className="w-3 h-3 fill-amber-300" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-[#f4f7f5] transition-colors">
                        {image.title}
                      </h3>
                      {image.caption && (
                        <p className="text-xs text-[#b8d2c4] line-clamp-2 mt-1 font-light">
                          {image.caption}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#c5a869] font-semibold mt-2.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Fullscreen</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
