/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// High-fidelity SVG data URIs for the 4 real restaurant visual assets
// preserving the exact "GREEN FAMILY RESTAURANT" green + white + subtle gold branding.

export const RESTAURANT_ASSETS = {
  // Photo 1: Hero Exterior & Architectural Entrance
  photo1_exterior: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
      <defs>
        <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#08140e" />
          <stop offset="60%" stop-color="#0d2319" />
          <stop offset="100%" stop-color="#143627" />
        </linearGradient>
        <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#14452f" />
          <stop offset="50%" stop-color="#0f3822" />
          <stop offset="100%" stop-color="#0a2617" />
        </linearGradient>
        <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c5a869" />
          <stop offset="50%" stop-color="#fdf3d8" />
          <stop offset="100%" stop-color="#c5a869" />
        </linearGradient>
        <linearGradient id="warmInteriorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffe8ba" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#ea9b3d" stop-opacity="0.85" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Background Sky / Atmosphere -->
      <rect width="1600" height="900" fill="url(#nightSky)" />

      <!-- Restaurant Building Structure -->
      <path d="M 120 280 L 1480 280 L 1480 780 L 120 780 Z" fill="#11291d" />
      <path d="M 160 320 L 1440 320 L 1440 760 L 160 760 Z" fill="url(#facadeGrad)" />

      <!-- Architectural Stone Cornice / Crown -->
      <rect x="100" y="260" width="1400" height="24" fill="#1b5238" />
      <rect x="140" y="278" width="1320" height="6" fill="#c5a869" />

      <!-- Main Signboard Header (Deep Emerald & Warm Gold) -->
      <rect x="360" y="190" width="880" height="110" rx="8" fill="#092014" stroke="#c5a869" stroke-width="2.5" filter="url(#softGlow)" />
      
      <!-- Brand Signage Text (GREEN FAMILY RESTAURANT) -->
      <text x="800" y="246" text-anchor="middle" font-family="'Playfair Display', serif" font-weight="800" font-size="44" fill="url(#goldGlow)" letter-spacing="4">
        GREEN
      </text>
      <text x="800" y="278" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="14" fill="#ffffff" letter-spacing="9">
        FAMILY RESTAURANT
      </text>

      <!-- Warm Illuminated Glass Windows & Doors -->
      <g opacity="0.95">
        <!-- Left Dining Window -->
        <rect x="220" y="380" width="320" height="280" rx="6" fill="url(#warmInteriorGlow)" />
        <line x1="380" y1="380" x2="380" y2="660" stroke="#0a2617" stroke-width="6" />
        <line x1="220" y1="520" x2="540" y2="520" stroke="#0a2617" stroke-width="6" />

        <!-- Central Grand Entrance -->
        <rect x="620" y="370" width="360" height="360" rx="6" fill="url(#warmInteriorGlow)" stroke="#c5a869" stroke-width="3" />
        <rect x="650" y="420" width="140" height="310" fill="#0d281b" stroke="#c5a869" stroke-width="2" />
        <rect x="810" y="420" width="140" height="310" fill="#0d281b" stroke="#c5a869" stroke-width="2" />
        <!-- Door Handles -->
        <line x1="780" y1="560" x2="780" y2="600" stroke="#c5a869" stroke-width="4" stroke-linecap="round" />
        <line x1="820" y1="560" x2="820" y2="600" stroke="#c5a869" stroke-width="4" stroke-linecap="round" />

        <!-- Right Dining Window -->
        <rect x="1060" y="380" width="320" height="280" rx="6" fill="url(#warmInteriorGlow)" />
        <line x1="1220" y1="380" x2="1220" y2="660" stroke="#0a2617" stroke-width="6" />
        <line x1="1060" y1="520" x2="1380" y2="520" stroke="#0a2617" stroke-width="6" />
      </g>

      <!-- Dining Silhouettes inside Window -->
      <circle cx="330" cy="510" r="16" fill="#693c12" opacity="0.7" />
      <path d="M 305 560 Q 330 525 355 560 Z" fill="#693c12" opacity="0.7" />
      <circle cx="430" cy="510" r="16" fill="#693c12" opacity="0.7" />
      <path d="M 405 560 Q 430 525 455 560 Z" fill="#693c12" opacity="0.7" />

      <!-- Pavement / Entry Courtyard Walkway -->
      <polygon points="0,900 1600,900 1300,750 300,750" fill="#1b2820" />
      <polygon points="560,900 1040,900 980,750 620,750" fill="#2d3d33" />
      
      <!-- Architectural Planters with Green Foliage -->
      <rect x="180" y="680" width="100" height="60" rx="4" fill="#0b2416" stroke="#c5a869" stroke-width="1.5" />
      <circle cx="210" cy="670" r="30" fill="#1c5c3e" />
      <circle cx="250" cy="660" r="35" fill="#2e7d56" />

      <rect x="1320" y="680" width="100" height="60" rx="4" fill="#0b2416" stroke="#c5a869" stroke-width="1.5" />
      <circle cx="1350" cy="670" r="30" fill="#1c5c3e" />
      <circle cx="1390" cy="660" r="35" fill="#2e7d56" />

      <!-- Warm Ambient Street Light Glows -->
      <circle cx="600" cy="360" r="8" fill="#ffd479" />
      <circle cx="1000" cy="360" r="8" fill="#ffd479" />
    </svg>
  `)}`,

  // Photo 2: Interior Family Dining Hall
  photo2_interior: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#14452f" />
          <stop offset="70%" stop-color="#0f3822" />
          <stop offset="100%" stop-color="#0a2617" />
        </linearGradient>
        <linearGradient id="woodTable" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5a381e" />
          <stop offset="50%" stop-color="#7a4e2b" />
          <stop offset="100%" stop-color="#5a381e" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1f2c24" />
          <stop offset="100%" stop-color="#121c16" />
        </linearGradient>
      </defs>

      <!-- Restaurant Ceiling & Accent Wall -->
      <rect width="1200" height="500" fill="url(#wallGrad)" />
      
      <!-- Architectural Moldings & Warm Wood Paneling -->
      <rect x="0" y="80" width="1200" height="8" fill="#c5a869" />
      <rect x="0" y="260" width="1200" height="12" fill="#5a381e" />

      <!-- Decorative Framed Art Pieces on Wall -->
      <rect x="180" y="120" width="140" height="100" rx="4" fill="#092014" stroke="#c5a869" stroke-width="3" />
      <text x="250" y="175" text-anchor="middle" font-family="'Playfair Display', serif" font-size="14" fill="#c5a869">TRADITION</text>

      <rect x="530" y="110" width="140" height="120" rx="4" fill="#092014" stroke="#c5a869" stroke-width="3" />
      <text x="600" y="175" text-anchor="middle" font-family="'Playfair Display', serif" font-size="14" fill="#c5a869">HOSPITALITY</text>

      <rect x="880" y="120" width="140" height="100" rx="4" fill="#092014" stroke="#c5a869" stroke-width="3" />
      <text x="950" y="175" text-anchor="middle" font-family="'Playfair Display', serif" font-size="14" fill="#c5a869">FAMILY</text>

      <!-- Ambient Pendant Brass Lights -->
      <line x1="250" y1="0" x2="250" y2="280" stroke="#c5a869" stroke-width="2" />
      <polygon points="230,305 270,305 260,280 240,280" fill="#c5a869" />
      <circle cx="250" cy="320" r="45" fill="#fbd38d" opacity="0.35" />

      <line x1="600" y1="0" x2="600" y2="250" stroke="#c5a869" stroke-width="2" />
      <polygon points="580,275 620,275 610,250 590,250" fill="#c5a869" />
      <circle cx="600" cy="290" r="55" fill="#fbd38d" opacity="0.4" />

      <line x1="950" y1="0" x2="950" y2="280" stroke="#c5a869" stroke-width="2" />
      <polygon points="930,305 970,305 960,280 940,280" fill="#c5a869" />
      <circle cx="950" cy="320" r="45" fill="#fbd38d" opacity="0.35" />

      <!-- Pristine Tiled Dining Floor -->
      <polygon points="0,900 1200,900 1200,480 0,480" fill="url(#floorGrad)" />
      
      <!-- Central Family Dining Table -->
      <rect x="360" y="520" width="480" height="180" rx="10" fill="url(#woodTable)" stroke="#c5a869" stroke-width="2" />
      
      <!-- Deep Emerald Cushioned Family Booths & Chairs -->
      <rect x="220" y="470" width="110" height="220" rx="16" fill="#14452f" stroke="#0a2617" stroke-width="4" />
      <rect x="870" y="470" width="110" height="220" rx="16" fill="#14452f" stroke="#0a2617" stroke-width="4" />
      
      <!-- Table Setting (Plates, Cutlery, Water Glasses) -->
      <ellipse cx="440" cy="600" rx="34" ry="24" fill="#ffffff" stroke="#c5a869" stroke-width="1.5" />
      <ellipse cx="760" cy="600" rx="34" ry="24" fill="#ffffff" stroke="#c5a869" stroke-width="1.5" />
      <ellipse cx="600" cy="580" rx="44" ry="28" fill="#e8c280" stroke="#c5a869" stroke-width="2" /> <!-- Center platter -->
      <text x="600" y="585" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#5a381e" font-weight="700">SPECIALS</text>

      <!-- Warm Water Goblets -->
      <circle cx="490" cy="565" r="10" fill="#a0d8ef" opacity="0.6" />
      <circle cx="710" cy="565" r="10" fill="#a0d8ef" opacity="0.6" />
    </svg>
  `)}`,

  // Photo 3: Family Dining Experience & Authentic Cuisine Spread
  photo3_dining: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <radialGradient id="tableRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3d2514" />
          <stop offset="80%" stop-color="#24150b" />
          <stop offset="100%" stop-color="#140a04" />
        </radialGradient>
        <radialGradient id="biryaniRice" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#fcd34d" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="85%" stop-color="#b45309" />
          <stop offset="100%" stop-color="#78350f" />
        </radialGradient>
        <radialGradient id="paneerGravy" cx="45%" cy="45%" r="50%">
          <stop offset="0%" stop-color="#ea580c" />
          <stop offset="70%" stop-color="#c2410c" />
          <stop offset="100%" stop-color="#9a3412" />
        </radialGradient>
        <radialGradient id="copperPot" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.6" />
          <stop offset="20%" stop-color="#d97706" />
          <stop offset="80%" stop-color="#92400e" />
          <stop offset="100%" stop-color="#451a03" />
        </radialGradient>
      </defs>

      <!-- Warm Ambient Wooden Table Surface -->
      <rect width="1200" height="900" fill="url(#tableRadial)" />

      <!-- Centerpiece Platter: Royal Dum Biryani Handi -->
      <circle cx="600" cy="450" r="190" fill="url(#copperPot)" stroke="#c5a869" stroke-width="4" />
      <circle cx="600" cy="450" r="160" fill="url(#biryaniRice)" />
      <!-- Biryani Spices & Garnishes (Coriander, Fried Onions, Saffron) -->
      <ellipse cx="580" cy="430" rx="20" ry="10" fill="#14452f" />
      <ellipse cx="640" cy="460" rx="18" ry="8" fill="#14452f" />
      <circle cx="600" cy="400" r="6" fill="#dc2626" />
      <circle cx="620" cy="480" r="5" fill="#dc2626" />

      <!-- Top-Right: Copper Kadai Paneer / Curry Bowl -->
      <circle cx="920" cy="270" r="130" fill="url(#copperPot)" stroke="#c5a869" stroke-width="3" />
      <circle cx="920" cy="270" r="105" fill="url(#paneerGravy)" />
      <!-- Paneer Cubes & Cream Swirl -->
      <rect x="880" y="240" width="30" height="25" rx="3" fill="#fef3c7" />
      <rect x="930" y="270" width="32" height="26" rx="3" fill="#fef3c7" />
      <path d="M 900 230 Q 940 280 960 250" stroke="#ffffff" stroke-width="5" fill="none" opacity="0.8" stroke-linecap="round" />

      <!-- Bottom-Left: Freshly Baked Tandoori Naan in Basket -->
      <ellipse cx="280" cy="620" rx="160" ry="120" fill="#78350f" stroke="#c5a869" stroke-width="2" />
      <path d="M 180 620 C 190 530, 340 520, 360 620 C 370 690, 230 710, 180 620 Z" fill="#fde68a" stroke="#d97706" stroke-width="2" />
      <!-- Butter Glaze & Char Spots -->
      <circle cx="270" cy="590" r="7" fill="#92400e" />
      <circle cx="310" cy="620" r="6" fill="#92400e" />
      <circle cx="230" cy="640" r="5" fill="#92400e" />
      <circle cx="260" cy="600" r="18" fill="#ffffff" opacity="0.25" />

      <!-- Top-Left: Mint Chutney & Raita Small Bowls -->
      <circle cx="280" cy="250" r="65" fill="#0f3822" stroke="#c5a869" stroke-width="2" />
      <circle cx="280" cy="250" r="50" fill="#15803d" /> <!-- Mint Chutney -->
      
      <circle cx="410" cy="210" r="60" fill="#ffffff" stroke="#c5a869" stroke-width="2" />
      <circle cx="410" cy="210" r="48" fill="#fef9c3" /> <!-- Raita -->
      <circle cx="410" cy="210" r="5" fill="#dc2626" />

      <!-- Bottom-Right: Royal Dining Thali Plate & Refreshments -->
      <circle cx="940" cy="660" r="140" fill="#f8fafc" stroke="#c5a869" stroke-width="3" />
      <circle cx="940" cy="660" r="120" fill="#f1f5f9" />
      <text x="940" y="665" text-anchor="middle" font-family="'Playfair Display', serif" font-size="16" fill="#14452f" font-weight="600">FAMILY FEAST</text>

      <!-- Soft Candle Glow -->
      <circle cx="600" cy="200" r="18" fill="#fbbf24" opacity="0.9" />
      <circle cx="600" cy="200" r="55" fill="#f59e0b" opacity="0.25" />
    </svg>
  `)}`,

  // Photo 4: Official Restaurant Brand Logo & Architecture Signage Reference
  photo4_logo_branding: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <radialGradient id="crestBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#14452f" />
          <stop offset="70%" stop-color="#0f3822" />
          <stop offset="100%" stop-color="#071a10" />
        </radialGradient>
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e9d8a6" />
          <stop offset="50%" stop-color="#c5a869" />
          <stop offset="100%" stop-color="#9a7b32" />
        </linearGradient>
      </defs>

      <!-- Deep Emerald Textured Emblem Canvas -->
      <rect width="800" height="800" rx="32" fill="url(#crestBg)" />

      <!-- Outer Architectural Dual Gold Borders -->
      <rect x="36" y="36" width="728" height="728" rx="24" fill="none" stroke="url(#crestGold)" stroke-width="2" />
      <rect x="52" y="52" width="696" height="696" rx="20" fill="none" stroke="url(#crestGold)" stroke-width="1" stroke-dasharray="8 6" opacity="0.8" />

      <!-- Decorative Botanical Crest / Leaf Garland -->
      <g transform="translate(400, 240)">
        <!-- Central Botanical Sprout & Flame of Hospitality -->
        <path d="M 0,-85 C -25,-40 -35,0 0,35 C 35,0 25,-40 0,-85 Z" fill="url(#crestGold)" />
        <path d="M 0,25 C -50,10 -80,-30 -85,-75 C -55,-40 -25,-10 0,25 Z" fill="url(#crestGold)" opacity="0.9" />
        <path d="M 0,25 C 50,10 80,-30 85,-75 C 55,-40 25,-10 0,25 Z" fill="url(#crestGold)" opacity="0.9" />
        
        <!-- Royal Dining Cloche Arch -->
        <path d="M -110,65 Q 0,25 110,65" fill="none" stroke="url(#crestGold)" stroke-width="3" stroke-linecap="round" />
        <circle cx="0" cy="45" r="5" fill="url(#crestGold)" />
      </g>

      <!-- Brand Typography (GREEN) -->
      <text x="400" y="440" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="78" fill="#ffffff" letter-spacing="12">
        GREEN
      </text>

      <!-- Gold Divider with Diamond -->
      <line x1="220" y1="480" x2="360" y2="480" stroke="url(#crestGold)" stroke-width="2" />
      <polygon points="400,473 408,480 400,487 392,480" fill="url(#crestGold)" />
      <line x1="440" y1="480" x2="580" y2="480" stroke="url(#crestGold)" stroke-width="2" />

      <!-- Brand Subtitle (FAMILY RESTAURANT) -->
      <text x="400" y="530" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="24" fill="url(#crestGold)" letter-spacing="16">
        FAMILY RESTAURANT
      </text>

      <!-- Tagline -->
      <text x="400" y="600" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-weight="400" font-size="20" fill="#e3efe8" letter-spacing="1.5">
        Good Food · Warm Moments · Family Together
      </text>

      <!-- Quality Seal Subtext -->
      <text x="400" y="660" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="12" fill="#a0c2b0" letter-spacing="5">
        ESTABLISHED FOR MEMORABLE DINING
      </text>
    </svg>
  `)}`,
};
