/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  BookOpen,
  Image as ImageIcon,
  UtensilsCrossed,
  Store,
  Settings as SettingsIcon,
  LogOut,
  Globe,
  Menu as MenuIcon,
  X,
  ShieldCheck,
} from 'lucide-react';
import { RestaurantLogo } from '../../components/common/RestaurantLogo';
import { authService } from '../../services/auth';
import {
  RestaurantSettings,
  HomepageContent,
  StoryContent,
  MenuCategory,
  MenuItem,
  GalleryImage,
  SocialLinks,
} from '../../types/restaurant';

// Tabs
import { OverviewTab } from './tabs/OverviewTab';
import { HomepageTab } from './tabs/HomepageTab';
import { OurStoryTab } from './tabs/OurStoryTab';
import { GalleryTab } from './tabs/GalleryTab';
import { MenuTab } from './tabs/MenuTab';
import { RestaurantInfoTab } from './tabs/RestaurantInfoTab';
import { SettingsTab } from './tabs/SettingsTab';

interface AdminDashboardPageProps {
  settings: RestaurantSettings;
  homepage: HomepageContent;
  story: StoryContent;
  categories: MenuCategory[];
  menuItems: MenuItem[];
  galleryImages: GalleryImage[];
  socialLinks: SocialLinks;
  onUpdateSettings: (s: RestaurantSettings) => Promise<void>;
  onUpdateHomepage: (h: HomepageContent) => Promise<void>;
  onUpdateStory: (st: StoryContent) => Promise<void>;
  onAddCategory: (name: string, desc?: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onAddMenuItem: (item: Omit<MenuItem, 'id' | 'created_at'>) => Promise<void>;
  onUpdateMenuItem: (item: MenuItem) => Promise<void>;
  onDeleteMenuItem: (id: string) => Promise<void>;
  onUploadPhotoFile: (file: File) => Promise<string>;
  onAddGalleryImage: (img: Omit<GalleryImage, 'id' | 'created_at'>) => Promise<void>;
  onUpdateGalleryImage: (img: GalleryImage) => Promise<void>;
  onDeleteGalleryImage: (id: string) => Promise<void>;
  onReorderGalleryImages: (imgs: GalleryImage[]) => Promise<void>;
  onUpdateSocialLinks: (soc: SocialLinks) => Promise<void>;
  onDataReset: () => void;
  onLogout: () => void;
  onViewLiveSite: () => void;
  onNotify: (type: 'success' | 'error' | 'info', message: string) => void;
}

type TabType =
  | 'overview'
  | 'homepage'
  | 'story'
  | 'gallery'
  | 'menu'
  | 'restaurant-info'
  | 'settings';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  settings,
  homepage,
  story,
  categories,
  menuItems,
  galleryImages,
  socialLinks,
  onUpdateSettings,
  onUpdateHomepage,
  onUpdateStory,
  onAddCategory,
  onDeleteCategory,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onUploadPhotoFile,
  onAddGalleryImage,
  onUpdateGalleryImage,
  onDeleteGalleryImage,
  onReorderGalleryImages,
  onUpdateSocialLinks,
  onDataReset,
  onLogout,
  onViewLiveSite,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentUser = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  const navItems = [
    { id: 'overview' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'homepage' as const, label: 'Homepage', icon: Home },
    { id: 'story' as const, label: 'Our Story', icon: BookOpen },
    { id: 'gallery' as const, label: 'Gallery', icon: ImageIcon },
    { id: 'menu' as const, label: 'Menu', icon: UtensilsCrossed },
    { id: 'restaurant-info' as const, label: 'Restaurant Information', icon: Store },
    { id: 'settings' as const, label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavSelect = (tab: TabType) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#092215] text-white border-b border-[#c5a869]/20 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-md text-[#c5a869] hover:bg-[#14452f]"
              aria-label="Toggle Navigation Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

            <RestaurantLogo variant="light" size="sm" />
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-widest text-[#c5a869] border-l border-white/20 pl-3 uppercase">
              Owner CMS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewLiveSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#e3efe8] bg-[#14452f] hover:bg-[#1a573b] border border-[#c5a869]/30 rounded-md transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a869]" />
              <span className="hidden sm:inline">View Public Site</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs text-[#a0c2b0] border-l border-white/10 pl-3">
              <ShieldCheck className="w-4 h-4 text-[#c5a869]" />
              <span className="truncate max-w-[180px]">{currentUser?.email || 'Owner'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-white/70 hover:text-red-300 rounded hover:bg-white/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:w-64 bg-white border-r border-slate-200 shrink-0 z-20 flex flex-col justify-between transition-all duration-200 ${
            mobileSidebarOpen
              ? 'fixed inset-y-0 left-0 top-[53px] w-64 shadow-2xl'
              : 'hidden lg:flex'
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Management Sections
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#0f3822] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#c5a869]' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && (
            <OverviewTab
              items={menuItems}
              gallery={galleryImages}
              settings={settings}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
              onViewLiveSite={onViewLiveSite}
            />
          )}

          {activeTab === 'homepage' && (
            <HomepageTab
              content={homepage}
              galleryImages={galleryImages}
              onSave={async (updated) => {
                await onUpdateHomepage(updated);
                onNotify('success', 'Homepage content updated successfully!');
              }}
            />
          )}

          {activeTab === 'story' && (
            <OurStoryTab
              story={story}
              galleryImages={galleryImages}
              onSave={async (updated) => {
                await onUpdateStory(updated);
                onNotify('success', 'Our Story page content saved successfully!');
              }}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab
              images={galleryImages}
              onUploadFile={onUploadPhotoFile}
              onAddImage={async (img) => {
                await onAddGalleryImage(img);
                onNotify('success', 'New restaurant photo added to gallery!');
              }}
              onUpdateImage={async (img) => {
                await onUpdateGalleryImage(img);
                onNotify('success', 'Photo details updated!');
              }}
              onDeleteImage={async (id) => {
                await onDeleteGalleryImage(id);
                onNotify('info', 'Photo removed from gallery.');
              }}
              onReorder={async (imgs) => {
                await onReorderGalleryImages(imgs);
                onNotify('success', 'Gallery photo order saved!');
              }}
            />
          )}

          {activeTab === 'menu' && (
            <MenuTab
              categories={categories}
              items={menuItems}
              settings={settings}
              onAddCategory={async (name, desc) => {
                await onAddCategory(name, desc);
                onNotify('success', `Category "${name}" created!`);
              }}
              onDeleteCategory={async (id) => {
                await onDeleteCategory(id);
                onNotify('info', 'Category deleted.');
              }}
              onAddMenuItem={async (item) => {
                await onAddMenuItem(item);
                onNotify('success', `"${item.name}" added to menu!`);
              }}
              onUpdateMenuItem={async (item) => {
                await onUpdateMenuItem(item);
                onNotify('success', `"${item.name}" updated!`);
              }}
              onDeleteMenuItem={async (id) => {
                await onDeleteMenuItem(id);
                onNotify('info', 'Menu item removed.');
              }}
            />
          )}

          {activeTab === 'restaurant-info' && (
            <RestaurantInfoTab
              settings={settings}
              social={socialLinks}
              onSaveSettings={async (s) => {
                await onUpdateSettings(s);
                onNotify('success', 'Restaurant settings updated!');
              }}
              onSaveSocial={async (soc) => {
                await onUpdateSocialLinks(soc);
                onNotify('success', 'Social links updated!');
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              onNotify={onNotify}
              onDataReset={onDataReset}
            />
          )}
        </main>
      </div>
    </div>
  );
};
