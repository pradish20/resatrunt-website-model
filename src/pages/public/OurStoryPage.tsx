/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoryContent } from '../../types/restaurant';
import { Heart, Compass, ShieldCheck, Users } from 'lucide-react';

interface OurStoryPageProps {
  story: StoryContent;
  onNavigateMenu: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  story,
  onNavigateMenu,
}) => {
  return (
    <div className="w-full bg-[#fbfbf9]">
      {/* Header Banner */}
      <section className="bg-[#092215] text-white py-20 border-b border-[#c5a869]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.26em] text-[#c5a869] uppercase">
            HERITAGE & HOSPITALITY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider text-white mt-3 mb-4">
            {story.title}
          </h1>
          <div className="w-16 h-[2px] bg-[#c5a869] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#c2d9cc] font-light leading-relaxed">
            {story.subtitle}
          </p>
        </div>
      </section>

      {/* Main Image Feature (Actual Restaurant Photo) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10 mb-16">
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#07170f]">
          <img
            src={story.main_image_url}
            alt="Inside Green Family Restaurant dining hall"
            className="w-full h-72 sm:h-96 md:h-[480px] object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Editorial Story Chapters */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {/* Chapter 1: Our Beginning */}
        <div className="border-b border-[#14452f]/10 pb-14">
          <div className="flex items-center gap-3 mb-4 text-[#a3833e]">
            <Compass className="w-5 h-5 text-[#14452f]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Chapter 01</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f3822] mb-4">
            {story.beginning_title}
          </h2>
          <p className="text-base text-[#2e4034] leading-relaxed font-light">
            {story.beginning_text}
          </p>
        </div>

        {/* Chapter 2: Our Philosophy */}
        <div className="border-b border-[#14452f]/10 pb-14">
          <div className="flex items-center gap-3 mb-4 text-[#a3833e]">
            <Heart className="w-5 h-5 text-[#14452f]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Chapter 02</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f3822] mb-4">
            {story.philosophy_title}
          </h2>
          <p className="text-base text-[#2e4034] leading-relaxed font-light">
            {story.philosophy_text}
          </p>
        </div>

        {/* Chapter 3: Quality & Hospitality */}
        <div className="border-b border-[#14452f]/10 pb-14">
          <div className="flex items-center gap-3 mb-4 text-[#a3833e]">
            <ShieldCheck className="w-5 h-5 text-[#14452f]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Chapter 03</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f3822] mb-4">
            {story.quality_title}
          </h2>
          <p className="text-base text-[#2e4034] leading-relaxed font-light">
            {story.quality_text}
          </p>
        </div>

        {/* Chapter 4: The Family Dining Experience */}
        <div>
          <div className="flex items-center gap-3 mb-4 text-[#a3833e]">
            <Users className="w-5 h-5 text-[#14452f]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Chapter 04</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f3822] mb-4">
            {story.family_title}
          </h2>
          <p className="text-base text-[#2e4034] leading-relaxed font-light mb-8">
            {story.family_text}
          </p>

          <div className="p-8 rounded-xl bg-[#f4f5f0] border border-[#14452f]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif font-bold text-lg text-[#0f3822]">
                Come Share a Meal with Us
              </h4>
              <p className="text-xs text-[#526a5b] mt-1">
                Discover the recipes that bring our patrons back time and again.
              </p>
            </div>
            <button
              onClick={onNavigateMenu}
              className="px-6 py-3 text-xs font-bold tracking-widest text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md transition-colors whitespace-nowrap"
            >
              EXPLORE OUR MENU
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
