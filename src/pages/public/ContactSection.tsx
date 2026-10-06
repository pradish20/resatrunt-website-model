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
  ExternalLink,
  Users,
} from 'lucide-react';
import { RestaurantSettings } from '../../types/restaurant';

interface ContactSectionProps {
  settings: RestaurantSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  return (
    <section id="contact" className="py-20 bg-[#f4f5f0] border-t border-[#14452f]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.22em] text-[#a3833e] uppercase">
            VISIT & CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3822] mt-2 mb-3">
            Join Us at Green Family Restaurant
          </h2>
          <p className="text-sm text-[#445b4c] leading-relaxed">
            Whether planning a weekend family dinner, celebrating a special milestone, or dropping in for authentic flavours, our doors and tables are warmly open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Location & Google Maps */}
          <div className="bg-white p-8 rounded-xl border border-[#14452f]/12 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#eaf2ed] text-[#0f3822] flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-[#14452f]" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0f3822] mb-2">
                Our Location
              </h3>
              <p className="text-xs text-[#526a5b] leading-relaxed">
                {settings.address_line1}
                {settings.address_line2 && <><br />{settings.address_line2}</>}
                <br />
                {settings.city}, {settings.state} {settings.postal_code}
                <br />
                {settings.country}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-[#718a7a] italic">
                Convenient parking space available for family vehicles.
              </div>
            </div>

            <div className="mt-6 pt-4">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md transition-colors w-full justify-center"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#c5a869]" />
              </a>
            </div>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="bg-white p-8 rounded-xl border border-[#14452f]/12 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#eaf2ed] text-[#0f3822] flex items-center justify-center mb-5">
                <Clock className="w-5 h-5 text-[#14452f]" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0f3822] mb-3">
                Dining Hours
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 block">Monday – Friday</span>
                  <span className="text-[#526a5b]">{settings.opening_hours.weekdays}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">Saturday – Sunday</span>
                  <span className="text-[#526a5b]">{settings.opening_hours.weekends}</span>
                </div>
                <div className="pt-2 text-[11.5px] text-[#a3833e] italic">
                  {settings.opening_hours.dining_note}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#4a6353]">
              <Users className="w-4 h-4 text-[#c5a869] shrink-0" />
              <span>Welcoming families, parties, and walk-in diners.</span>
            </div>
          </div>

          {/* Card 3: Contact & Direct Inquiries */}
          <div className="bg-white p-8 rounded-xl border border-[#14452f]/12 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#eaf2ed] text-[#0f3822] flex items-center justify-center mb-5">
                <Phone className="w-5 h-5 text-[#14452f]" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0f3822] mb-3">
                Direct Inquiries
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#718a7a] font-semibold block mb-1">
                    Phone Reservations & Enquiries
                  </span>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-[#0f3822] hover:text-[#14452f] transition-colors block"
                  >
                    {settings.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#718a7a] font-semibold block mb-1">
                    Email Correspondence
                  </span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-xs font-medium text-[#0f3822] hover:text-[#14452f] transition-colors block"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0f3822] bg-[#eaf2ed] hover:bg-[#d8e7dc] rounded-md transition-colors w-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#14452f]" />
                <span>CALL FOR TABLE INQUIRY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
