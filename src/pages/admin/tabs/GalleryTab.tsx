/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  GalleryImage,
  GalleryCategory,
} from '../../../types/restaurant';
import {
  Upload,
  Plus,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface GalleryTabProps {
  images: GalleryImage[];
  onUploadFile: (file: File) => Promise<string>;
  onAddImage: (image: Omit<GalleryImage, 'id' | 'created_at'>) => Promise<void>;
  onUpdateImage: (image: GalleryImage) => Promise<void>;
  onDeleteImage: (id: string) => Promise<void>;
  onReorder: (images: GalleryImage[]) => Promise<void>;
}

const CATEGORIES: GalleryCategory[] = ['ALL', 'INTERIOR', 'EXTERIOR', 'DINING', 'ATMOSPHERE'];

export const GalleryTab: React.FC<GalleryTabProps> = ({
  images,
  onUploadFile,
  onAddImage,
  onUpdateImage,
  onDeleteImage,
  onReorder,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // New Image Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryCategory>('ALL');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newIsFeatured, setNewIsFeatured] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await onUploadFile(file);
      setNewImageUrl(url);
      if (!newTitle) {
        // Generate neat title from filename
        const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setNewTitle(baseName.charAt(0).toUpperCase() + baseName.slice(1));
      }
    } catch (err) {
      console.error('File upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !newTitle.trim()) return;

    await onAddImage({
      title: newTitle.trim(),
      category: newCategory,
      caption: newCaption.trim() || undefined,
      image_url: newImageUrl.trim(),
      is_featured: newIsFeatured,
      display_order: images.length + 1,
    });

    // Reset modal
    setNewTitle('');
    setNewCategory('ALL');
    setNewCaption('');
    setNewImageUrl('');
    setNewIsFeatured(false);
    setShowAddModal(false);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const reordered = [...images];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    // Update display orders
    const updatedWithOrder = reordered.map((img, i) => ({
      ...img,
      display_order: i + 1,
    }));

    await onReorder(updatedWithOrder);
  };

  const confirmDelete = async () => {
    if (deleteCandidate) {
      await onDeleteImage(deleteCandidate);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Gallery Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload new high-resolution restaurant photos, assign categories, reorder items, and manage featured showcases.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-[#0f3822] hover:bg-[#14452f] rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-[#c5a869]" />
          <span>ADD NEW PHOTO</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Image Preview & Controls */}
            <div className="relative h-48 bg-slate-900 overflow-hidden group">
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-[#c5a869] backdrop-blur-xs border border-white/10 uppercase">
                  {image.category}
                </span>
                {image.is_featured && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Order buttons */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 rounded bg-black/60 hover:bg-black/90 text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === images.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 rounded bg-black/60 hover:bg-black/90 text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Image Details Form */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => onUpdateImage({ ...image, title: e.target.value })}
                  className="w-full font-serif font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-[#0f3822] focus:outline-none pb-1"
                />

                <textarea
                  rows={2}
                  value={image.caption || ''}
                  placeholder="Optional image caption..."
                  onChange={(e) => onUpdateImage({ ...image, caption: e.target.value })}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded p-1.5 mt-2 focus:outline-none focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              {/* Controls bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {/* Category Selector */}
                <select
                  value={image.category}
                  onChange={(e) =>
                    onUpdateImage({
                      ...image,
                      category: e.target.value as GalleryCategory,
                    })
                  }
                  className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateImage({ ...image, is_featured: !image.is_featured })
                    }
                    className={`p-1.5 rounded transition-colors ${
                      image.is_featured
                        ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                        : 'text-slate-400 hover:text-amber-500'
                    }`}
                    title={image.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                  >
                    <Star
                      className={`w-4 h-4 ${image.is_featured ? 'fill-amber-500' : ''}`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteCandidate(image.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Add Photo to Gallery
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateImage} className="p-6 space-y-4">
              {/* File Upload Zone */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Upload Image File
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#0f3822] rounded-lg p-5 text-center cursor-pointer transition-colors bg-slate-50"
                >
                  <Upload className="w-6 h-6 text-[#0f3822] mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700">
                    {isUploading
                      ? 'Uploading & Optimizing...'
                      : 'Click to browse device or camera photo'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports JPG, PNG, WEBP (saved to Supabase Storage or browser storage)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Or manual URL */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Or Image URL / Data
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste image link or data URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Evening Dining Room Ambiance"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white text-slate-900"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={newIsFeatured}
                      onChange={(e) => setNewIsFeatured(e.target.checked)}
                      className="rounded text-[#0f3822] focus:ring-[#0f3822]"
                    />
                    <span>Set as Featured</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Optional Caption
                </label>
                <input
                  type="text"
                  placeholder="Brief descriptive note..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImageUrl || !newTitle || isUploading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md disabled:opacity-50"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Gallery Photo?"
        message="Are you sure you want to remove this photo from the restaurant gallery? This action cannot be undone."
        confirmLabel="Yes, Delete Photo"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
