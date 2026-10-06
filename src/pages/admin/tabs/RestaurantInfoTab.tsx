/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  RestaurantSettings,
  SocialLinks,
} from '../../../types/restaurant';
import { Save, Check, RefreshCw, MapPin, Clock, Phone, Share2 } from 'lucide-react';

interface RestaurantInfoTabProps {
  settings: RestaurantSettings;
  social: SocialLinks;
  onSaveSettings: (settings: RestaurantSettings) => Promise<void>;
  onSaveSocial: (social: SocialLinks) => Promise<void>;
}

export const RestaurantInfoTab: React.FC<RestaurantInfoTabProps> = ({
  settings,
  social,
  onSaveSettings,
  onSaveSocial,
}) => {
  const [formData, setFormData] = useState<RestaurantSettings>(settings);
  const [socialData, setSocialData] = useState<SocialLinks>(social);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await onSaveSettings(formData);
      await onSaveSocial(socialData);
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
            Restaurant Information & Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain your official business phone, address, operating hours, Google Maps locator, and social links.
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
              <span>SAVE INFORMATION</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Brand Identity */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          1. Brand Identity & Tagline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Official Restaurant Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Currency Symbol
            </label>
            <input
              type="text"
              required
              value={formData.currency_symbol}
              onChange={(e) => setFormData({ ...formData, currency_symbol: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
              placeholder="e.g. ₹ or $"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
            Tagline
          </label>
          <input
            type="text"
            required
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
            Short Description
          </label>
          <textarea
            rows={2}
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
          />
        </div>
      </div>

      {/* 2. Direct Contact Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Phone className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            2. Contact Channels
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Primary Phone Number
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Primary Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 3. Physical Address & Location */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            3. Address & Maps Navigation
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Address Line 1 (Street / Road)
            </label>
            <input
              type="text"
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Address Line 2 (Landmark / Area)
            </label>
            <input
              type="text"
              value={formData.address_line2}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postal_code}
              onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
            Google Maps Link
          </label>
          <input
            type="text"
            value={formData.google_maps_url}
            onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            placeholder="https://maps.google.com/..."
          />
        </div>
      </div>

      {/* 4. Operating Hours */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            4. Dining Hours
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Weekday Hours (Mon – Fri)
            </label>
            <input
              type="text"
              value={formData.opening_hours.weekdays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  opening_hours: {
                    ...formData.opening_hours,
                    weekdays: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Weekend Hours (Sat – Sun)
            </label>
            <input
              type="text"
              value={formData.opening_hours.weekends}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  opening_hours: {
                    ...formData.opening_hours,
                    weekends: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
            Dining / Kitchen Note
          </label>
          <input
            type="text"
            value={formData.opening_hours.dining_note}
            onChange={(e) =>
              setFormData({
                ...formData,
                opening_hours: {
                  ...formData.opening_hours,
                  dining_note: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
          />
        </div>
      </div>

      {/* 5. Social Media Presence */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Share2 className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            5. Social & Messaging Links
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Instagram Link
            </label>
            <input
              type="text"
              value={socialData.instagram_url}
              onChange={(e) =>
                setSocialData({ ...socialData, instagram_url: e.target.value })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Facebook Link
            </label>
            <input
              type="text"
              value={socialData.facebook_url}
              onChange={(e) =>
                setSocialData({ ...socialData, facebook_url: e.target.value })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              value={socialData.whatsapp_number}
              onChange={(e) =>
                setSocialData({ ...socialData, whatsapp_number: e.target.value })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md text-slate-900"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
