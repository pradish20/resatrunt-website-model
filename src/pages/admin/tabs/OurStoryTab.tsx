/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoryContent, GalleryImage } from '../../../types/restaurant';
import { Save, Check, RefreshCw } from 'lucide-react';

interface OurStoryTabProps {
  story: StoryContent;
  galleryImages: GalleryImage[];
  onSave: (updated: StoryContent) => Promise<void>;
}

export const OurStoryTab: React.FC<OurStoryTabProps> = ({
  story,
  galleryImages,
  onSave,
}) => {
  const [formData, setFormData] = useState<StoryContent>(story);
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
            Edit Our Story Content
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize the storytelling copy for each chapter and update the featured story photograph.
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
              <span>SAVE STORY</span>
            </>
          )}
        </button>
      </div>

      {/* Main Header & Image */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Page Title & Featured Visual
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Page Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Subtitle
            </label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Story Feature Image URL
          </label>
          <input
            type="text"
            value={formData.main_image_url}
            onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
          />

          {galleryImages.length > 0 && (
            <div className="mt-2.5">
              <span className="text-[11px] text-slate-500 font-medium">
                Pick from gallery photos:
              </span>
              <div className="flex gap-2 mt-1.5 overflow-x-auto pb-1">
                {galleryImages.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, main_image_url: img.image_url })}
                    className={`h-12 w-20 rounded border shrink-0 overflow-hidden relative ${
                      formData.main_image_url === img.image_url
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
      </div>

      {/* Chapters */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Story Chapters
        </h3>

        {/* Chapter 1 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0f3822] uppercase tracking-wider">
            Chapter 01: Beginning
          </label>
          <input
            type="text"
            value={formData.beginning_title}
            onChange={(e) => setFormData({ ...formData, beginning_title: e.target.value })}
            className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md text-slate-900 mb-2"
          />
          <textarea
            rows={3}
            value={formData.beginning_text}
            onChange={(e) => setFormData({ ...formData, beginning_text: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>

        {/* Chapter 2 */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-[#0f3822] uppercase tracking-wider">
            Chapter 02: Philosophy
          </label>
          <input
            type="text"
            value={formData.philosophy_title}
            onChange={(e) => setFormData({ ...formData, philosophy_title: e.target.value })}
            className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md text-slate-900 mb-2"
          />
          <textarea
            rows={3}
            value={formData.philosophy_text}
            onChange={(e) => setFormData({ ...formData, philosophy_text: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>

        {/* Chapter 3 */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-[#0f3822] uppercase tracking-wider">
            Chapter 03: Quality & Hospitality
          </label>
          <input
            type="text"
            value={formData.quality_title}
            onChange={(e) => setFormData({ ...formData, quality_title: e.target.value })}
            className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md text-slate-900 mb-2"
          />
          <textarea
            rows={3}
            value={formData.quality_text}
            onChange={(e) => setFormData({ ...formData, quality_text: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>

        {/* Chapter 4 */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-[#0f3822] uppercase tracking-wider">
            Chapter 04: The Family Dining Experience
          </label>
          <input
            type="text"
            value={formData.family_title}
            onChange={(e) => setFormData({ ...formData, family_title: e.target.value })}
            className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md text-slate-900 mb-2"
          />
          <textarea
            rows={3}
            value={formData.family_text}
            onChange={(e) => setFormData({ ...formData, family_text: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900 leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
};
