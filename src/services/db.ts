/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  RestaurantSettings,
  HomepageContent,
  StoryContent,
  MenuCategory,
  MenuItem,
  GalleryImage,
  SocialLinks,
} from '../types/restaurant';
import {
  INITIAL_SETTINGS,
  INITIAL_HOMEPAGE_CONTENT,
  INITIAL_STORY_CONTENT,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_GALLERY_IMAGES,
  INITIAL_SOCIAL_LINKS,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'gfr_restaurant_settings_v1',
  HOMEPAGE: 'gfr_homepage_content_v1',
  STORY: 'gfr_story_content_v1',
  CATEGORIES: 'gfr_menu_categories_v1',
  MENU_ITEMS: 'gfr_menu_items_v1',
  GALLERY: 'gfr_gallery_images_v1',
  SOCIAL: 'gfr_social_links_v1',
};

// Local storage helper with fallbacks
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export const dbService = {
  // ------------------ RESTAURANT SETTINGS ------------------
  async getSettings(): Promise<RestaurantSettings> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('restaurant_settings')
          .select('*')
          .limit(1)
          .single();
        if (!error && data) return data as RestaurantSettings;
      } catch (e) {
        console.warn('Falling back to local storage for settings:', e);
      }
    }
    return getLocalItem<RestaurantSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: RestaurantSettings): Promise<RestaurantSettings> {
    const updated = { ...settings, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('restaurant_settings')
          .upsert(updated);
        if (error) throw error;
      } catch (e) {
        console.error('Supabase updateSettings error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // ------------------ HOMEPAGE CONTENT ------------------
  async getHomepageContent(): Promise<HomepageContent> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('homepage_content')
          .select('*')
          .limit(1)
          .single();
        if (!error && data) return data as HomepageContent;
      } catch (e) {
        console.warn('Falling back to local storage for homepage:', e);
      }
    }
    return getLocalItem<HomepageContent>(STORAGE_KEYS.HOMEPAGE, INITIAL_HOMEPAGE_CONTENT);
  },

  async updateHomepageContent(content: HomepageContent): Promise<HomepageContent> {
    const updated = { ...content, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('homepage_content')
          .upsert(updated);
        if (error) throw error;
      } catch (e) {
        console.error('Supabase updateHomepageContent error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.HOMEPAGE, updated);
    return updated;
  },

  // ------------------ STORY CONTENT ------------------
  async getStoryContent(): Promise<StoryContent> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('story_content')
          .select('*')
          .limit(1)
          .single();
        if (!error && data) return data as StoryContent;
      } catch (e) {
        console.warn('Falling back to local storage for story:', e);
      }
    }
    return getLocalItem<StoryContent>(STORAGE_KEYS.STORY, INITIAL_STORY_CONTENT);
  },

  async updateStoryContent(content: StoryContent): Promise<StoryContent> {
    const updated = { ...content, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('story_content')
          .upsert(updated);
        if (error) throw error;
      } catch (e) {
        console.error('Supabase updateStoryContent error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.STORY, updated);
    return updated;
  },

  // ------------------ MENU CATEGORIES ------------------
  async getCategories(): Promise<MenuCategory[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_categories')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as MenuCategory[];
      } catch (e) {
        console.warn('Falling back to local categories:', e);
      }
    }
    return getLocalItem<MenuCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async saveCategories(categories: MenuCategory[]): Promise<MenuCategory[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('menu_categories')
          .upsert(categories);
        if (error) console.error('Supabase saveCategories error:', error);
      } catch (e) {
        console.error('Supabase saveCategories catch:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.CATEGORIES, categories);
    return categories;
  },

  async addCategory(name: string, description?: string): Promise<MenuCategory> {
    const current = await this.getCategories();
    const newCategory: MenuCategory = {
      id: `cat_${Date.now()}`,
      name: name.trim().toUpperCase(),
      slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
      description,
      display_order: current.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    const updated = [...current, newCategory];
    await this.saveCategories(updated);
    return newCategory;
  },

  async updateCategory(category: MenuCategory): Promise<MenuCategory> {
    const current = await this.getCategories();
    const updated = current.map((c) => (c.id === category.id ? category : c));
    await this.saveCategories(updated);
    return category;
  },

  async deleteCategory(id: string): Promise<void> {
    const current = await this.getCategories();
    const updated = current.filter((c) => c.id !== id);
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('menu_categories').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase deleteCategory error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.CATEGORIES, updated);
  },

  // ------------------ MENU ITEMS ------------------
  async getMenuItems(): Promise<MenuItem[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as MenuItem[];
      } catch (e) {
        console.warn('Falling back to local menu items:', e);
      }
    }
    return getLocalItem<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
  },

  async saveMenuItems(items: MenuItem[]): Promise<MenuItem[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .upsert(items);
        if (error) console.error('Supabase saveMenuItems error:', error);
      } catch (e) {
        console.error('Supabase saveMenuItems catch:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.MENU_ITEMS, items);
    return items;
  },

  async addMenuItem(item: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem> {
    const current = await this.getMenuItems();
    const newItem: MenuItem = {
      ...item,
      id: `item_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [...current, newItem];
    await this.saveMenuItems(updated);
    return newItem;
  },

  async updateMenuItem(item: MenuItem): Promise<MenuItem> {
    const current = await this.getMenuItems();
    const updated = current.map((i) => (i.id === item.id ? item : i));
    await this.saveMenuItems(updated);
    return item;
  },

  async deleteMenuItem(id: string): Promise<void> {
    const current = await this.getMenuItems();
    const updated = current.filter((i) => i.id !== id);
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('menu_items').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase deleteMenuItem error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.MENU_ITEMS, updated);
  },

  // ------------------ GALLERY IMAGES ------------------
  async getGalleryImages(): Promise<GalleryImage[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as GalleryImage[];
      } catch (e) {
        console.warn('Falling back to local gallery images:', e);
      }
    }
    return getLocalItem<GalleryImage[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_IMAGES);
  },

  async saveGalleryImages(images: GalleryImage[]): Promise<GalleryImage[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('gallery_images')
          .upsert(images);
        if (error) console.error('Supabase saveGalleryImages error:', error);
      } catch (e) {
        console.error('Supabase saveGalleryImages catch:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.GALLERY, images);
    return images;
  },

  async addGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at'>): Promise<GalleryImage> {
    const current = await this.getGalleryImages();
    const newImage: GalleryImage = {
      ...image,
      id: `gal_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [...current, newImage];
    await this.saveGalleryImages(updated);
    return newImage;
  },

  async updateGalleryImage(image: GalleryImage): Promise<GalleryImage> {
    const current = await this.getGalleryImages();
    const updated = current.map((g) => (g.id === image.id ? image : g));
    await this.saveGalleryImages(updated);
    return image;
  },

  async deleteGalleryImage(id: string): Promise<void> {
    const current = await this.getGalleryImages();
    const updated = current.filter((g) => g.id !== id);
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('gallery_images').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase deleteGalleryImage error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.GALLERY, updated);
  },

  async uploadPhotoFile(file: File): Promise<string> {
    // If Supabase Storage is configured, upload to 'restaurant-gallery' bucket
    if (isSupabaseConfigured() && supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `restaurant_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('restaurant-gallery')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (!uploadError) {
          const { data } = supabase.storage.from('restaurant-gallery').getPublicUrl(filePath);
          if (data?.publicUrl) return data.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase storage upload failed, falling back to local data URL:', err);
      }
    }

    // Reliable browser base64 storage fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('File reading failed'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsDataURL(file);
    });
  },

  // ------------------ SOCIAL LINKS ------------------
  async getSocialLinks(): Promise<SocialLinks> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .select('*')
          .limit(1)
          .single();
        if (!error && data) return data as SocialLinks;
      } catch (e) {
        console.warn('Falling back to local social links:', e);
      }
    }
    return getLocalItem<SocialLinks>(STORAGE_KEYS.SOCIAL, INITIAL_SOCIAL_LINKS);
  },

  async updateSocialLinks(links: SocialLinks): Promise<SocialLinks> {
    const updated = { ...links, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('social_links').upsert(updated);
      } catch (e) {
        console.error('Supabase updateSocialLinks error:', e);
      }
    }
    setLocalItem(STORAGE_KEYS.SOCIAL, updated);
    return updated;
  },

  // ------------------ DATABASE RESET & SQL GENERATION ------------------
  resetToInitialDefaults(): void {
    setLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setLocalItem(STORAGE_KEYS.HOMEPAGE, INITIAL_HOMEPAGE_CONTENT);
    setLocalItem(STORAGE_KEYS.STORY, INITIAL_STORY_CONTENT);
    setLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setLocalItem(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
    setLocalItem(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_IMAGES);
    setLocalItem(STORAGE_KEYS.SOCIAL, INITIAL_SOCIAL_LINKS);
  },

  generateSupabaseSQL(): string {
    return `-- ========================================================
-- GREEN FAMILY RESTAURANT DATABASE SCHEMA FOR SUPABASE
-- Run this in the Supabase SQL Editor (Database -> SQL Editor)
-- ========================================================

-- 1. Create Restaurant Settings Table
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT,
  phone TEXT,
  email TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  opening_hours JSONB,
  google_maps_url TEXT,
  currency_symbol TEXT DEFAULT '₹',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Homepage Content Table
CREATE TABLE IF NOT EXISTS public.homepage_content (
  id TEXT PRIMARY KEY,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_image_url TEXT,
  cta_primary_text TEXT,
  cta_secondary_text TEXT,
  intro_badge TEXT,
  intro_title TEXT,
  intro_body_1 TEXT,
  intro_body_2 TEXT,
  features JSONB,
  signature_title TEXT,
  signature_description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Story Content Table
CREATE TABLE IF NOT EXISTS public.story_content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  main_image_url TEXT,
  beginning_title TEXT,
  beginning_text TEXT,
  philosophy_title TEXT,
  philosophy_text TEXT,
  quality_title TEXT,
  quality_text TEXT,
  family_title TEXT,
  family_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Menu Categories Table
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  is_veg BOOLEAN DEFAULT TRUE,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  spice_level TEXT DEFAULT 'NONE',
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ALL', 'INTERIOR', 'EXTERIOR', 'DINING', 'ATMOSPHERE')),
  image_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  caption TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  instagram_url TEXT,
  facebook_url TEXT,
  whatsapp_number TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public can READ published restaurant data.
-- Only authenticated owner can INSERT/UPDATE/DELETE.
-- ========================================================

ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Read policies for anonymous visitors
CREATE POLICY "Allow public read restaurant_settings" ON public.restaurant_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read homepage_content" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "Allow public read story_content" ON public.story_content FOR SELECT USING (true);
CREATE POLICY "Allow public read menu_categories" ON public.menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read menu_items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery_images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read social_links" ON public.social_links FOR SELECT USING (true);

-- Authenticated write policies for owner
CREATE POLICY "Allow owner manage restaurant_settings" ON public.restaurant_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage homepage_content" ON public.homepage_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage story_content" ON public.story_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage menu_categories" ON public.menu_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage menu_items" ON public.menu_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage gallery_images" ON public.gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow owner manage social_links" ON public.social_links FOR ALL TO authenticated USING (true);

-- Storage bucket for restaurant gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-gallery', 'restaurant-gallery', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Allow public view gallery files" ON storage.objects FOR SELECT USING (bucket_id = 'restaurant-gallery');
CREATE POLICY "Allow owner upload gallery files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'restaurant-gallery');
`;
  },
};
