/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { dbService } from './services/db';
import { authService } from './services/auth';
import {
  RestaurantSettings,
  HomepageContent,
  StoryContent,
  MenuCategory,
  MenuItem,
  GalleryImage,
  SocialLinks,
} from './types/restaurant';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { Lightbox } from './components/public/Lightbox';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { OurStoryPage } from './pages/public/OurStoryPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { MenuPage } from './pages/public/MenuPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

type ViewMode = 'home' | 'story' | 'gallery' | 'menu' | 'admin-login' | 'admin-dashboard';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Database Data States
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [story, setStory] = useState<StoryContent | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);

  // Toast Helper
  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all initial data
  const loadAllData = useCallback(async () => {
    try {
      const [s, h, st, cats, items, gal, soc] = await Promise.all([
        dbService.getSettings(),
        dbService.getHomepageContent(),
        dbService.getStoryContent(),
        dbService.getCategories(),
        dbService.getMenuItems(),
        dbService.getGalleryImages(),
        dbService.getSocialLinks(),
      ]);

      setSettings(s);
      setHomepage(h);
      setStory(st);
      setCategories(cats);
      setMenuItems(items);
      setGalleryImages(gal);
      setSocialLinks(soc);
    } catch (err) {
      console.error('Failed to load restaurant data:', err);
      addToast('error', 'Could not load restaurant data.');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Handle URL / Route Sync
  useEffect(() => {
    const handleUrlHash = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash.includes('admin/dashboard') || path.includes('/admin/dashboard') || hash === '#admin') {
        if (authService.isAuthenticated()) {
          setCurrentView('admin-dashboard');
        } else {
          setCurrentView('admin-login');
        }
      } else if (hash.includes('admin/login') || path.includes('/admin/login') || hash === '#login') {
        setCurrentView('admin-login');
      } else if (hash.includes('story')) {
        setCurrentView('story');
      } else if (hash.includes('gallery')) {
        setCurrentView('gallery');
      } else if (hash.includes('menu')) {
        setCurrentView('menu');
      } else if (hash.includes('contact')) {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
    return () => window.removeEventListener('hashchange', handleUrlHash);
  }, []);

  // Public Navigation Handler
  const handlePublicNavigate = (tab: 'home' | 'story' | 'gallery' | 'menu', sectionId?: string) => {
    setCurrentView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // Admin Navigation
  const handleOpenAdminLogin = () => {
    if (authService.isAuthenticated()) {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('admin-login');
    }
    window.scrollTo({ top: 0 });
  };

  const handleAdminLoginSuccess = () => {
    setCurrentView('admin-dashboard');
    addToast('success', 'Logged in as Restaurant Owner.');
    window.scrollTo({ top: 0 });
  };

  const handleAdminLogout = () => {
    setCurrentView('admin-login');
    addToast('info', 'Logged out successfully.');
    window.scrollTo({ top: 0 });
  };

  // Loading Screen
  if (isLoading || !settings || !homepage || !story || !socialLinks) {
    return (
      <div className="min-h-screen bg-[#07170f] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-full border-2 border-[#c5a869] border-t-transparent animate-spin mb-4" />
        <h2 className="font-serif font-bold text-lg tracking-widest text-[#c5a869] uppercase">
          GREEN FAMILY RESTAURANT
        </h2>
        <p className="text-xs text-[#a0c2b0] mt-1 italic">
          Good Food · Warm Moments · Family Together
        </p>
      </div>
    );
  }

  // Admin Views
  if (currentView === 'admin-login') {
    return (
      <>
        <AdminLoginPage
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToSite={() => handlePublicNavigate('home')}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  if (currentView === 'admin-dashboard') {
    // Protected Route Enforcement: Unauthorized visitors redirected to login
    if (!authService.isAuthenticated()) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToSite={() => handlePublicNavigate('home')}
        />
      );
    }

    return (
      <>
        <AdminDashboardPage
          settings={settings}
          homepage={homepage}
          story={story}
          categories={categories}
          menuItems={menuItems}
          galleryImages={galleryImages}
          socialLinks={socialLinks}
          onUpdateSettings={async (s) => {
            const updated = await dbService.updateSettings(s);
            setSettings(updated);
          }}
          onUpdateHomepage={async (h) => {
            const updated = await dbService.updateHomepageContent(h);
            setHomepage(updated);
          }}
          onUpdateStory={async (st) => {
            const updated = await dbService.updateStoryContent(st);
            setStory(updated);
          }}
          onAddCategory={async (name, desc) => {
            const cat = await dbService.addCategory(name, desc);
            setCategories((prev) => [...prev, cat]);
          }}
          onDeleteCategory={async (id) => {
            await dbService.deleteCategory(id);
            setCategories((prev) => prev.filter((c) => c.id !== id));
          }}
          onAddMenuItem={async (item) => {
            const newItem = await dbService.addMenuItem(item);
            setMenuItems((prev) => [...prev, newItem]);
          }}
          onUpdateMenuItem={async (item) => {
            const updated = await dbService.updateMenuItem(item);
            setMenuItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
          }}
          onDeleteMenuItem={async (id) => {
            await dbService.deleteMenuItem(id);
            setMenuItems((prev) => prev.filter((i) => i.id !== id));
          }}
          onUploadPhotoFile={async (file) => {
            return await dbService.uploadPhotoFile(file);
          }}
          onAddGalleryImage={async (img) => {
            const newImg = await dbService.addGalleryImage(img);
            setGalleryImages((prev) => [...prev, newImg]);
          }}
          onUpdateGalleryImage={async (img) => {
            const updated = await dbService.updateGalleryImage(img);
            setGalleryImages((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
          }}
          onDeleteGalleryImage={async (id) => {
            await dbService.deleteGalleryImage(id);
            setGalleryImages((prev) => prev.filter((g) => g.id !== id));
          }}
          onReorderGalleryImages={async (imgs) => {
            const updated = await dbService.saveGalleryImages(imgs);
            setGalleryImages(updated);
          }}
          onUpdateSocialLinks={async (soc) => {
            const updated = await dbService.updateSocialLinks(soc);
            setSocialLinks(updated);
          }}
          onDataReset={() => loadAllData()}
          onLogout={handleAdminLogout}
          onViewLiveSite={() => handlePublicNavigate('home')}
          onNotify={addToast}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  // Public Website View
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-[#17241a]">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={currentView as 'home' | 'story' | 'gallery' | 'menu'}
        onNavigate={handlePublicNavigate}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            content={homepage}
            settings={settings}
            galleryImages={galleryImages}
            onNavigate={handlePublicNavigate}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {currentView === 'story' && (
          <OurStoryPage
            story={story}
            onNavigateMenu={() => handlePublicNavigate('menu')}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryPage
            images={galleryImages}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {currentView === 'menu' && (
          <MenuPage
            categories={categories}
            items={menuItems}
            settings={settings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        social={socialLinks}
        onNavigate={handlePublicNavigate}
        onOpenAdminLogin={handleOpenAdminLogin}
      />

      {/* Lightbox Modal */}
      <Lightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
