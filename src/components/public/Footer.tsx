/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { RestaurantLogo } from '../common/RestaurantLogo';
import { RestaurantSettings, SocialLinks } from '../../types/restaurant';

interface FooterProps {
  settings: RestaurantSettings;
  social: SocialLinks;
  onNavigate: (tab: 'home' | 'story' | 'gallery' | 'menu', sectionId?: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  social,
  onNavigate,
  onOpenAdminLogin,
}) => {
  return (
    <footer className="bg-[#092215] text-[#e3efe8] pt-16 pb-8 border-t border-[#c5a869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-start space-y-4">
            <RestaurantLogo variant="light" size="lg" />
            <p className="text-sm font-serif italic text-[#c5a869] mt-2">
              “{settings.tagline}”
            </p>
            <p className="text-xs text-[#a0c2b0] leading-relaxed max-w-xs">
              {settings.short_description}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={social.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#14452f] flex items-center justify-center text-[#c5a869] hover:bg-[#c5a869] hover:text-[#0f3822] transition-colors"
                aria-label="Visit Green Family Restaurant on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={social.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#14452f] flex items-center justify-center text-[#c5a869] hover:bg-[#c5a869] hover:text-[#0f3822] transition-colors"
                aria-label="Visit Green Family Restaurant on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {settings.google_maps_url && (
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#14452f] flex items-center justify-center text-[#c5a869] hover:bg-[#c5a869] hover:text-[#0f3822] transition-colors"
                  aria-label="Locate on Google Maps"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#c5a869] uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c2d9cc]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home & Welcome
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Full Restaurant Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Dining & Interior Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Table Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#c5a869] uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-[#c2d9cc]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a869] shrink-0 mt-0.5" />
                <span>
                  {settings.address_line1}
                  {settings.address_line2 && <>, {settings.address_line2}</>}
                  <br />
                  {settings.city}, {settings.state} {settings.postal_code}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a869] shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a869] shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#c5a869] uppercase mb-4">
              Opening Hours
            </h4>
            <div className="space-y-3 text-xs text-[#c2d9cc]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a869] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p className="text-[11px] text-[#a0c2b0]">{settings.opening_hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a869] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Saturday – Sunday</p>
                  <p className="text-[11px] text-[#a0c2b0]">{settings.opening_hours.weekends}</p>
                </div>
              </div>
              <p className="text-[10.5px] italic text-[#a3833e] pt-1">
                {settings.opening_hours.dining_note}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discrete Admin Entry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#82a390] gap-4">
          <p>© 2026 Green Family Restaurant. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#5e816d]">Family Dining · Authentic Flavours</span>
            
            {/* Discrete Owner Portal Entry (Unauthorized visitors redirect to /admin/login) */}
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#82a390] hover:text-[#c5a869] transition-colors focus:outline-none focus-visible:underline"
              title="Restaurant Owner Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a869]" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
