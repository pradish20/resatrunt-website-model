/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Utensils,
  CheckCircle2,
  Image as ImageIcon,
  Star,
  ArrowRight,
  Globe,
  Settings as SettingsIcon,
} from 'lucide-react';
import {
  MenuItem,
  GalleryImage,
  RestaurantSettings,
} from '../../../types/restaurant';

interface OverviewTabProps {
  items: MenuItem[];
  gallery: GalleryImage[];
  settings: RestaurantSettings;
  onNavigateTab: (tabId: string) => void;
  onViewLiveSite: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  items,
  gallery,
  settings,
  onNavigateTab,
  onViewLiveSite,
}) => {
  const totalItems = items.length;
  const availableItems = items.filter((i) => i.is_available).length;
  const totalImages = gallery.length;
  const featuredItems = items.filter((i) => i.is_featured).length;

  const stats = [
    {
      label: 'Total Menu Items',
      value: totalItems,
      icon: <Utensils className="w-5 h-5 text-[#14452f]" />,
      action: () => onNavigateTab('menu'),
      actionLabel: 'Manage Menu',
    },
    {
      label: 'Available Items',
      value: availableItems,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      subtext: `${totalItems - availableItems} currently sold out`,
      action: () => onNavigateTab('menu'),
      actionLabel: 'Check Availability',
    },
    {
      label: 'Gallery Images',
      value: totalImages,
      icon: <ImageIcon className="w-5 h-5 text-[#a3833e]" />,
      action: () => onNavigateTab('gallery'),
      actionLabel: 'Manage Photos',
    },
    {
      label: 'Featured Specials',
      value: featuredItems,
      icon: <Star className="w-5 h-5 text-amber-500" />,
      action: () => onNavigateTab('menu'),
      actionLabel: 'Edit Specials',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Welcome to the Owner CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time control center for {settings.name}. Changes publish instantly to the live website.
          </p>
        </div>

        <button
          onClick={onViewLiveSite}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0f3822] hover:bg-[#14452f] rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Globe className="w-3.5 h-3.5 text-[#c5a869]" />
          <span>View Live Website</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                <div className="p-2 rounded-lg bg-slate-50">{stat.icon}</div>
              </div>
              <div className="text-3xl font-serif font-bold text-slate-900 tabular-nums">
                {stat.value}
              </div>
              {stat.subtext && (
                <p className="text-[11px] text-slate-400 mt-1">{stat.subtext}</p>
              )}
            </div>

            <button
              onClick={stat.action}
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0f3822] hover:text-[#14452f] transition-colors"
            >
              <span>{stat.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Launchpad Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Quick Menu Overview */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Featured Menu Highlights
            </h3>
            <button
              onClick={() => onNavigateTab('menu')}
              className="text-xs font-semibold text-[#0f3822] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {items
              .filter((i) => i.is_featured)
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.is_veg ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                    />
                    <span className="font-semibold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900">
                      {settings.currency_symbol}
                      {item.price}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        item.is_available
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {item.is_available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Restaurant Contact & Hours Quick Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Restaurant Contact & Hours
              </h3>
              <button
                onClick={() => onNavigateTab('restaurant-info')}
                className="text-xs font-semibold text-[#0f3822] hover:underline flex items-center gap-1"
              >
                <SettingsIcon className="w-3 h-3" />
                <span>Edit Info</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-800">{settings.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800">{settings.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium text-slate-500">Weekday Hours:</span>
                <span className="text-slate-800">{settings.opening_hours.weekdays}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium text-slate-500">Weekend Hours:</span>
                <span className="text-slate-800">{settings.opening_hours.weekends}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-slate-500">City / State:</span>
                <span className="text-slate-800">
                  {settings.city}, {settings.state}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-[#f4f7f5] p-3 rounded-lg text-[11px] text-[#0f3822]">
            <strong>Tip for the Owner:</strong> Use the sidebar navigation on the left to customize every section of your public website.
          </div>
        </div>
      </div>
    </div>
  );
};
