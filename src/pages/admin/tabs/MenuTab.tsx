/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MenuCategory,
  MenuItem,
  RestaurantSettings,
} from '../../../types/restaurant';
import { VegIndicator } from '../../../components/common/VegIndicator';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Search,
  CheckCircle2,
  XCircle,
  FolderPlus,
} from 'lucide-react';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface MenuTabProps {
  categories: MenuCategory[];
  items: MenuItem[];
  settings: RestaurantSettings;
  onAddCategory: (name: string, description?: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onAddMenuItem: (item: Omit<MenuItem, 'id' | 'created_at'>) => Promise<void>;
  onUpdateMenuItem: (item: MenuItem) => Promise<void>;
  onDeleteMenuItem: (id: string) => Promise<void>;
}

export const MenuTab: React.FC<MenuTabProps> = ({
  categories,
  items,
  settings,
  onAddCategory,
  onDeleteCategory,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  // Modals state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const [deleteItemCandidate, setDeleteItemCandidate] = useState<string | null>(null);
  const [deleteCatCandidate, setDeleteCatCandidate] = useState<string | null>(null);

  // Form State for Item
  const [itemFormData, setItemFormData] = useState({
    name: '',
    category_id: categories[0]?.id || '',
    description: '',
    price: 250,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'MILD' as 'MILD' | 'MEDIUM' | 'SPICY' | 'NONE',
  });

  const openNewItemModal = () => {
    setEditingItem(null);
    setItemFormData({
      name: '',
      category_id: categories[0]?.id || '',
      description: '',
      price: 250,
      is_veg: true,
      is_available: true,
      is_featured: false,
      spice_level: 'MILD',
    });
    setShowItemModal(true);
  };

  const openEditItemModal = (item: MenuItem) => {
    setEditingItem(item);
    setItemFormData({
      name: item.name,
      category_id: item.category_id,
      description: item.description,
      price: item.price,
      is_veg: item.is_veg,
      is_available: item.is_available,
      is_featured: item.is_featured,
      spice_level: item.spice_level || 'NONE',
    });
    setShowItemModal(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemFormData.name.trim() || !itemFormData.category_id) return;

    if (editingItem) {
      await onUpdateMenuItem({
        ...editingItem,
        ...itemFormData,
        price: Number(itemFormData.price),
      });
    } else {
      await onAddMenuItem({
        ...itemFormData,
        price: Number(itemFormData.price),
        display_order: items.length + 1,
      });
    }

    setShowItemModal(false);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    await onAddCategory(newCatName, newCatDesc);
    setNewCatName('');
    setNewCatDesc('');
    setShowCategoryModal(false);
  };

  const filteredItems = items.filter((item) => {
    if (selectedCatId !== 'all' && item.category_id !== selectedCatId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Tab Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Menu Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add dishes, adjust prices, toggle sold-out availability, mark specials, and organize categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5 text-[#0f3822]" />
            <span>New Category</span>
          </button>

          <button
            onClick={openNewItemModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider text-white bg-[#0f3822] hover:bg-[#14452f] rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-[#c5a869]" />
            <span>ADD MENU ITEM</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedCatId === 'all'
                ? 'bg-[#0f3822] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories ({items.length})
          </button>
          {categories.map((c) => {
            const count = items.filter((i) => i.category_id === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCatId(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedCatId === c.id
                    ? 'bg-[#0f3822] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Item Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Dietary</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Special</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No menu items found. Click &quot;ADD MENU ITEM&quot; to create one.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const cat = categories.find((c) => c.id === item.category_id);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Name & Desc */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 font-light mt-0.5">
                          {item.description}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {cat?.name || 'Uncategorized'}
                      </td>

                      {/* Veg / Non-Veg */}
                      <td className="py-3.5 px-4">
                        <VegIndicator isVeg={item.is_veg} size="sm" showLabel={true} />
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 tabular-nums">
                        {settings.currency_symbol}
                        {item.price.toFixed(0)}
                      </td>

                      {/* Availability Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() =>
                            onUpdateMenuItem({
                              ...item,
                              is_available: !item.is_available,
                            })
                          }
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            item.is_available
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          {item.is_available ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-500" />
                              <span>Sold Out</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() =>
                            onUpdateMenuItem({
                              ...item,
                              is_featured: !item.is_featured,
                            })
                          }
                          className={`p-1 rounded transition-colors ${
                            item.is_featured
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-slate-300 hover:text-slate-500'
                          }`}
                          title="Toggle Chef's Special"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              item.is_featured ? 'fill-amber-500' : ''
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditItemModal(item)}
                            className="p-1.5 text-slate-500 hover:text-[#0f3822] hover:bg-slate-100 rounded"
                            title="Edit Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteItemCandidate(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Menu Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={() => setShowItemModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Dum Biryani Handi"
                  value={itemFormData.name}
                  onChange={(e) =>
                    setItemFormData({ ...itemFormData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={itemFormData.category_id}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white text-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Price ({settings.currency_symbol})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={itemFormData.price}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ingredients, preparation style, flavours..."
                  value={itemFormData.description}
                  onChange={(e) =>
                    setItemFormData({ ...itemFormData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Dietary
                  </label>
                  <select
                    value={itemFormData.is_veg ? 'veg' : 'non-veg'}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        is_veg: e.target.value === 'veg',
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                  >
                    <option value="veg">Pure Veg</option>
                    <option value="non-veg">Non-Veg</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Spice Level
                  </label>
                  <select
                    value={itemFormData.spice_level}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        spice_level: e.target.value as any,
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                  >
                    <option value="NONE">None</option>
                    <option value="MILD">Mild</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="SPICY">Spicy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Availability
                  </label>
                  <select
                    value={itemFormData.is_available ? 'avail' : 'soldout'}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        is_available: e.target.value === 'avail',
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                  >
                    <option value="avail">Available</option>
                    <option value="soldout">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={itemFormData.is_featured}
                    onChange={(e) =>
                      setItemFormData({
                        ...itemFormData,
                        is_featured: e.target.checked,
                      })
                    }
                    className="rounded text-[#0f3822] focus:ring-[#0f3822]"
                  />
                  <span>Mark as Chef's Special / Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md"
                >
                  {editingItem ? 'Save Updates' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Add Menu Category
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SOUPS & SALADS"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Optional Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Traditional slow-cooked soups"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0f3822] hover:bg-[#14452f] rounded"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Item Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteItemCandidate)}
        title="Delete Menu Dish?"
        message="Are you sure you want to remove this dish from the menu? It will no longer appear on the public website."
        confirmLabel="Yes, Delete Dish"
        isDestructive={true}
        onConfirm={async () => {
          if (deleteItemCandidate) {
            await onDeleteMenuItem(deleteItemCandidate);
            setDeleteItemCandidate(null);
          }
        }}
        onCancel={() => setDeleteItemCandidate(null)}
      />
    </div>
  );
};
