/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Utensils,
  Users,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  BookOpen,
  Eye,
} from 'lucide-react';
import {
  HomepageContent,
  RestaurantSettings,
  GalleryImage,
} from '../../types/restaurant';
import { ContactSection } from './ContactSection';

interface HomePageProps {
  content: HomepageContent;
  settings: RestaurantSettings;
  galleryImages: GalleryImage[];
  onNavigate: (tab: 'home' | 'story' | 'gallery' | 'menu', sectionId?: string) => void;
  onOpenLightbox: (index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  content,
  settings,
  galleryImages,
  onNavigate,
  onOpenLightbox,
}) => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#c5a869]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#c5a869]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#c5a869]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#c5a869]" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Cinematic Exterior & Welcoming Ambiance */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#07170f]">
        {/* Background Image with Measured Overlay Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={content.hero_image_url}
            alt="Green Family Restaurant facade and entrance"
            className="w-full h-full object-cover object-center filter brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients ensuring 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#092215] via-[#092215]/70 to-[#07170f]/80" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          {/* Subtle Decorative Arch Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-[#14452f]/80 border border-[#c5a869]/40 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a869]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#e3efe8] uppercase">
              INDIAN & MULTI-CUISINE FAMILY DINING
            </span>
          </div>

          {/* Restaurant Main Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-wider text-white uppercase mb-4"
            style={{ textWrap: 'balance' }}
          >
            {content.hero_title}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#c5a869] mb-5 tracking-wide">
            “{content.hero_subtitle}”
          </p>

          {/* Short Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#d0e2d8] leading-relaxed mb-10 font-sans font-light">
            {content.hero_description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-[0.18em] text-[#0f3822] bg-[#ffffff] hover:bg-[#f2efe9] rounded-md transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {content.cta_primary_text}
            </button>
            <button
              onClick={() => onNavigate('story')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-[0.18em] text-white bg-[#14452f]/90 hover:bg-[#14452f] border border-[#c5a869]/50 rounded-md transition-all duration-200 hover:-translate-y-0.5"
            >
              {content.cta_secondary_text}
            </button>
          </div>
        </div>

        {/* Subtle Bottom Transition Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#fbfbf9] to-transparent z-10" />
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-20 bg-[#fbfbf9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.24em] text-[#a3833e] uppercase">
            {content.intro_badge}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3822] mt-3 mb-6"
            style={{ textWrap: 'balance' }}
          >
            {content.intro_title}
          </h2>
          <div className="w-16 h-[2px] bg-[#c5a869] mx-auto mb-8" />
          <p className="text-base sm:text-lg text-[#2e4034] leading-relaxed font-light mb-4">
            {content.intro_body_1}
          </p>
          <p className="text-sm sm:text-base text-[#4f6758] leading-relaxed font-light">
            {content.intro_body_2}
          </p>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-[#f4f5f0] border-y border-[#14452f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.22em] text-[#a3833e] uppercase">
              THE GREEN STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3822] mt-2 mb-3">
              Why Families Dine With Us
            </h2>
            <p className="text-xs sm:text-sm text-[#4a6353]">
              Every detail is shaped around authentic food, genuine warmth, and memorable family dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-7 rounded-xl border border-[#14452f]/12 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#0f3822] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#0f3822] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#526a5b] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE EXPERIENCE SECTION */}
      <section className="py-24 bg-[#092215] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.24em] text-[#c5a869] uppercase">
                AUTHENTIC HOSPITALITY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                {content.signature_title}
              </h2>
              <div className="w-16 h-[2px] bg-[#c5a869]" />
              <p className="text-sm sm:text-base text-[#c2d9cc] leading-relaxed font-light">
                {content.signature_description}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('story')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold tracking-wider text-white bg-[#14452f] hover:bg-[#1a573b] border border-[#c5a869]/40 rounded-md transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#c5a869]" />
                  <span>READ OUR FULL STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            {/* Featured Visual Spotlight (Real Restaurant Photo 3 Spread) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#c5a869]/30 bg-[#07170f]">
                <img
                  src={galleryImages[2]?.image_url || galleryImages[0]?.image_url}
                  alt="Authentic family feast dining spread"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-xs font-serif font-bold text-[#c5a869]">
                    Signature Dishes & Tandoor Creations
                  </p>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    Freshly prepared daily with slow-simmered perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALLERY PREVIEW */}
      <section className="py-20 bg-[#fbfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-[#a3833e] uppercase">
                ATMOSPHERE & DINING
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3822] mt-2">
                Moments at Green Family Restaurant
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0f3822] hover:text-[#14452f] transition-colors"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Preview using uploaded restaurant photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.slice(0, 4).map((img, idx) => (
              <div
                key={img.id}
                onClick={() => onOpenLightbox(idx)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 border border-[#14452f]/10"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#c5a869] font-semibold tracking-wider uppercase mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Click to Expand</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-16 bg-[#14452f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Ready to Dine With Us?
          </h2>
          <p className="text-sm sm:text-base text-[#d0e2d8] font-light max-w-xl mx-auto">
            Explore our chef-curated Indian and multi-cuisine dishes or call ahead for large family celebrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3 text-xs font-bold tracking-widest text-[#0f3822] bg-white hover:bg-[#f4f7f5] rounded-md transition-colors"
            >
              EXPLORE OUR MENU
            </button>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="px-8 py-3 text-xs font-bold tracking-widest text-white border border-[#c5a869] hover:bg-white/10 rounded-md transition-colors"
            >
              RESERVE A TABLE
            </a>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & MAP SECTION */}
      <ContactSection settings={settings} />
    </div>
  );
};
