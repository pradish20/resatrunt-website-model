/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RestaurantSettings {
  id: string;
  name: string;
  tagline: string;
  short_description: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  opening_hours: {
    weekdays: string;
    weekends: string;
    dining_note: string;
  };
  google_maps_url: string;
  currency_symbol: string;
  updated_at?: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image_url: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  intro_badge: string;
  intro_title: string;
  intro_body_1: string;
  intro_body_2: string;
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  signature_title: string;
  signature_description: string;
  updated_at?: string;
}

export interface StoryContent {
  id: string;
  title: string;
  subtitle: string;
  main_image_url: string;
  beginning_title: string;
  beginning_text: string;
  philosophy_title: string;
  philosophy_text: string;
  quality_title: string;
  quality_text: string;
  family_title: string;
  family_text: string;
  updated_at?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  is_veg: boolean;
  is_available: boolean;
  is_featured: boolean;
  image_url?: string;
  spice_level?: 'MILD' | 'MEDIUM' | 'SPICY' | 'NONE';
  display_order: number;
  created_at?: string;
}

export type GalleryCategory = 'ALL' | 'INTERIOR' | 'EXTERIOR' | 'DINING' | 'ATMOSPHERE';

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url: string;
  is_featured: boolean;
  display_order: number;
  caption?: string;
  created_at?: string;
}

export interface SocialLinks {
  id: string;
  instagram_url: string;
  facebook_url: string;
  whatsapp_number: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner' | 'admin';
  name: string;
}
