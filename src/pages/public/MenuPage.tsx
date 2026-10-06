/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MenuCategory,
  MenuItem,
  RestaurantSettings,
} from '../../types/restaurant';
import { VegIndicator } from '../../components/common/VegIndicator';
import {
  Search,
  Star,
  Info,
  Flame,
  AlertCircle,
} from 'lucide-react';

interface MenuPageProps {
  categories: MenuCategory[];
  items: MenuItem[];
  settings: RestaurantSettings;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  categories,
  items,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active categories only
  const activeCategories = categories.filter((c) => c.is_active);

  // Filter items
  const filteredItems = items.filter((item) => {
    // Category match
    if (selectedCategory !== 'all' && item.category_id !== selectedCategory) {
      return false;
    }
    // Dietary match
    if (dietaryFilter === 'veg' && !item.is_veg) return false;
    if (dietaryFilter === 'non-veg' && item.is_veg) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      return nameMatch || descMatch;
    }
    return true;
  });

  // Group filtered items by category for traditional menu presentation
  const groupedByCategory = activeCategories
    .map((cat) => ({
      category: cat,
      items: filteredItems.filter((item) => item.category_id === cat.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="w-full bg-[#fbfbf9] min-h-[85vh] pb-24">
      {/* Menu Header */}
      <section className="bg-[#092215] text-white py-16 border-b border-[#c5a869]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.24em] text-[#c5a869] uppercase">
            CHEF'S SELECTION & TRADITIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-wider text-white mt-2 mb-3">
            Restaurant Menu
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#c2d9cc] font-light leading-relaxed">
            Prepared fresh to order using authentic spices, traditional slow-simmered gravies, and fragrant tandoori crafts.
          </p>

          {/* Demo Pricing Notice Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#14452f] border border-[#c5a869]/40 text-xs text-[#e3efe8] max-w-lg">
            <Info className="w-4 h-4 text-[#c5a869] shrink-0" />
            <span className="text-left">
              <strong>Menu Notice:</strong> Prices shown below are indicative demo entries. The restaurant owner can edit dishes, prices, and availability directly in the Owner Portal.
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-[69px] z-30 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-[#14452f]/10 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Navigation Pills/Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-bold tracking-wider rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#0f3822] text-white'
                    : 'bg-white text-[#384c3f] border border-[#14452f]/15 hover:bg-[#eaf1ec]'
                }`}
              >
                ALL COURSES
              </button>
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold tracking-wider rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#0f3822] text-white'
                      : 'bg-white text-[#384c3f] border border-[#14452f]/15 hover:bg-[#eaf1ec]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Right Controls: Dietary Toggles & Search */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Dietary Filter */}
              <div className="flex items-center p-1 bg-white border border-[#14452f]/15 rounded-md">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    dietaryFilter === 'all'
                      ? 'bg-[#0f3822] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                    dietaryFilter === 'veg'
                      ? 'bg-[#15803d] text-white'
                      : 'text-[#15803d] hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>Veg</span>
                </button>
                <button
                  onClick={() => setDietaryFilter('non-veg')}
                  className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                    dietaryFilter === 'non-veg'
                      ? 'bg-[#991b1b] text-white'
                      : 'text-[#991b1b] hover:bg-red-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>Non-Veg</span>
                </button>
              </div>

              {/* Dish Search */}
              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#14452f]/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0f3822] text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Listing Section (Organized by Editorial Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {groupedByCategory.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-serif font-bold text-slate-700">
              No menu items match your current selection
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting the dietary filter or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {groupedByCategory.map(({ category, items: catItems }) => (
              <div key={category.id} className="scroll-mt-36" id={category.slug}>
                {/* Category Section Header */}
                <div className="flex items-center gap-4 mb-8 pb-3 border-b-2 border-[#14452f]/20">
                  <div>
                    <h2 className="text-2xl font-serif font-bold tracking-wide text-[#0f3822]">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-xs text-[#526a5b] mt-0.5 font-light">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-auto text-xs text-[#718a7a] font-medium">
                    {catItems.length} {catItems.length === 1 ? 'item' : 'items'}
                  </div>
                </div>

                {/* Restaurant Menu Items (2-Column Classical Restaurant Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`relative p-5 rounded-xl border transition-all duration-200 ${
                        item.is_available
                          ? 'bg-white border-[#14452f]/12 hover:border-[#14452f]/30 hover:shadow-sm'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Title and Badges */}
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <VegIndicator isVeg={item.is_veg} size="sm" />
                            <h3 className="text-base font-serif font-bold text-[#0f3822] tracking-wide">
                              {item.name}
                            </h3>
                            {item.is_featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                <span>Chef's Special</span>
                              </span>
                            )}
                            {item.spice_level && item.spice_level !== 'NONE' && (
                              <span
                                className={`inline-flex items-center gap-0.5 text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                                  item.spice_level === 'SPICY'
                                    ? 'text-red-700 bg-red-50'
                                    : item.spice_level === 'MEDIUM'
                                    ? 'text-amber-800 bg-amber-50'
                                    : 'text-emerald-800 bg-emerald-50'
                                }`}
                              >
                                <Flame className="w-2.5 h-2.5" />
                                <span>{item.spice_level}</span>
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-xs text-[#526a5b] leading-relaxed font-light mt-1">
                            {item.description}
                          </p>
                        </div>

                        {/* Price & Availability */}
                        <div className="text-right shrink-0">
                          <span className="text-base font-serif font-bold text-[#0f3822] tabular-nums block">
                            {settings.currency_symbol}
                            {item.price.toFixed(0)}
                          </span>

                          {!item.is_available && (
                            <span className="inline-block mt-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Temporarily Sold Out
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Table Reservation Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="p-8 rounded-2xl bg-[#0f3822] text-white shadow-xl">
          <h3 className="text-2xl font-serif font-bold mb-2">
            Looking for Large Family Catering or Special Occasions?
          </h3>
          <p className="text-xs sm:text-sm text-[#c2d9cc] max-w-lg mx-auto mb-6">
            We happily accommodate private party reservations, birthday dinners, and customized set menus.
          </p>
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="inline-block px-6 py-3 text-xs font-bold tracking-widest text-[#0f3822] bg-white hover:bg-[#f4f7f5] rounded-md transition-colors"
          >
            CALL US TO RESERVE: {settings.phone}
          </a>
        </div>
      </section>
    </div>
  );
};
