/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HomepageContent, GalleryImage } from '../../../types/restaurant';
import { Save, Check, RefreshCw } from 'lucide-react';

interface HomepageTabProps {
  content: HomepageContent;
  galleryImages: GalleryImage[];
  onSave: (updated: HomepageContent) => Promise<void>;
}

export const HomepageTab: React.FC<HomepageTabProps> = ({
  content,
  galleryImages,
  onSave,
}) => {
  const [formData, setFormData] = useState<HomepageContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await onSave(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Edit Homepage Content
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update hero headlines, imagery, call-to-actions, and introduction copy.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-wider text-white bg-[#0f3822] hover:bg-[#14452f] rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>SAVING...</span>
            </>
          ) : saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>SAVED!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-[#c5a869]" />
              <span>SAVE CHANGES</span>
            </>
          )}
        </button>
      </div>

      {/* 1. HERO SECTION SETTINGS */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          1. Hero Banner Section
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Hero Restaurant Title
            </label>
            <input
              type="text"
              required
              value={formData.hero_title}
              onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Tagline (Hero Subtitle)
            </label>
            <input
              type="text"
              required
              value={formData.hero_subtitle}
              onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Hero Short Description
          </label>
          <textarea
            rows={2}
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900 leading-relaxed"
          />
        </div>

        {/* Hero Background Image Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Hero Image
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={formData.hero_image_url}
              onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
              placeholder="Image data URL or public URL"
            />
          </div>

          {/* Quick Picker from Gallery */}
          {galleryImages.length > 0 && (
            <div className="mt-2.5">
              <span className="text-[11px] text-slate-500 font-medium">
                Or select from restaurant photos:
              </span>
              <div className="flex gap-2 mt-1.5 overflow-x-auto pb-1">
                {galleryImages.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, hero_image_url: img.image_url })}
                    className={`h-12 w-20 rounded border shrink-0 overflow-hidden relative ${
                      formData.hero_image_url === img.image_url
                        ? 'ring-2 ring-[#0f3822] border-transparent'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Primary Button Text
            </label>
            <input
              type="text"
              value={formData.cta_primary_text}
              onChange={(e) => setFormData({ ...formData, cta_primary_text: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={formData.cta_secondary_text}
              onChange={(e) => setFormData({ ...formData, cta_secondary_text: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 2. INTRODUCTION SECTION SETTINGS */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          2. Introduction Copy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Intro Badge
            </label>
            <input
              type="text"
              value={formData.intro_badge}
              onChange={(e) => setFormData({ ...formData, intro_badge: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Intro Main Title
            </label>
            <input
              type="text"
              value={formData.intro_title}
              onChange={(e) => setFormData({ ...formData, intro_title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Intro Body Paragraph 1
          </label>
          <textarea
            rows={2}
            value={formData.intro_body_1}
            onChange={(e) => setFormData({ ...formData, intro_body_1: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Intro Body Paragraph 2
          </label>
          <textarea
            rows={2}
            value={formData.intro_body_2}
            onChange={(e) => setFormData({ ...formData, intro_body_2: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>
      </div>

      {/* 3. SIGNATURE EXPERIENCE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          3. Signature Experience Section
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={formData.signature_title}
            onChange={(e) => setFormData({ ...formData, signature_title: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={formData.signature_description}
            onChange={(e) => setFormData({ ...formData, signature_description: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
};
