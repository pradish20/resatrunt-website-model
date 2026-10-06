/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { RestaurantLogo } from '../common/RestaurantLogo';

interface NavbarProps {
  activeTab: 'home' | 'story' | 'gallery' | 'menu';
  onNavigate: (tab: 'home' | 'story' | 'gallery' | 'menu', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: 'home' | 'story' | 'gallery' | 'menu', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(tab, sectionId);
  };

  const navLinks = [
    { label: 'HOME', tab: 'home' as const },
    { label: 'OUR STORY', tab: 'story' as const },
    { label: 'GALLERY', tab: 'gallery' as const },
    { label: 'MENU', tab: 'menu' as const },
    { label: 'CONTACT', tab: 'home' as const, section: 'contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#ffffff]/95 backdrop-blur-md shadow-sm border-b border-[#14452f]/10 py-3'
            : 'bg-[#ffffff] border-b border-[#14452f]/10 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Restaurant Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14452f] rounded-lg transition-transform active:scale-[0.99]"
              aria-label="Green Family Restaurant Home"
            >
              <RestaurantLogo variant="emerald" size="md" />
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isCurrent =
                  link.section
                    ? false
                    : activeTab === link.tab;

                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.tab, link.section)}
                    className={`text-xs font-semibold tracking-[0.14em] py-1.5 relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14452f] ${
                      isCurrent
                        ? 'text-[#0f3822] font-bold'
                        : 'text-[#415447] hover:text-[#0f3822]'
                    }`}
                  >
                    {link.label}
                    {isCurrent && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0f3822] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('menu')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-[#0f3822] hover:bg-[#14452f] active:bg-[#071a10] rounded-md transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#c5a869]" />
                <span>VIEW MENU</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#0f3822] hover:bg-[#eaf1ec] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3822]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Responsive Navigation) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm h-full bg-[#fbfbf9] p-6 shadow-2xl flex flex-col justify-between border-l border-[#0f3822]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#0f3822]/10 mb-6">
                <RestaurantLogo variant="emerald" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#0f3822] hover:bg-[#eaf1ec] rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isCurrent = !link.section && activeTab === link.tab;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.tab, link.section)}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold tracking-wider rounded-md transition-colors ${
                        isCurrent
                          ? 'bg-[#0f3822] text-white'
                          : 'text-[#1d2d21] hover:bg-[#edf3ef]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#0f3822]/10">
              <button
                onClick={() => handleNavClick('menu')}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold tracking-widest text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md shadow-md"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#c5a869]" />
                <span>VIEW MENU</span>
              </button>
              <p className="text-[11px] text-center text-[#58705f] mt-4 font-serif italic">
                Good Food · Warm Moments · Family Together
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
