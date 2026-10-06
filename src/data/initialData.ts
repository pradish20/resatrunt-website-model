/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  RestaurantSettings,
  HomepageContent,
  StoryContent,
  MenuCategory,
  MenuItem,
  GalleryImage,
  SocialLinks,
} from '../types/restaurant';
import { RESTAURANT_ASSETS } from './restaurantImages';

export const INITIAL_SETTINGS: RestaurantSettings = {
  id: 'settings_default',
  name: 'GREEN FAMILY RESTAURANT',
  tagline: 'Good Food. Warm Moments. Family Together.',
  short_description:
    'A welcoming destination for delicious food, memorable moments and quality family dining.',
  phone: '+91 [RESTAURANT_PHONE_PLACEHOLDER]',
  email: 'contact@[RESTAURANT_DOMAIN_PLACEHOLDER].com',
  address_line1: '[RESTAURANT_MAIN_ROAD_PLACEHOLDER]',
  address_line2: '[NEARBY_LANDMARK_PLACEHOLDER]',
  city: '[CITY_NAME_PLACEHOLDER]',
  state: '[STATE_PLACEHOLDER]',
  postal_code: '[POSTAL_CODE_PLACEHOLDER]',
  country: 'India',
  opening_hours: {
    weekdays: '11:30 AM – 3:30 PM & 6:30 PM – 11:00 PM',
    weekends: '11:30 AM – 11:30 PM (All-Day Dining)',
    dining_note: 'Kitchen accepts last orders 30 minutes before closing.',
  },
  google_maps_url: 'https://maps.google.com',
  currency_symbol: '₹',
};

export const INITIAL_HOMEPAGE_CONTENT: HomepageContent = {
  id: 'homepage_default',
  hero_title: 'GREEN FAMILY RESTAURANT',
  hero_subtitle: 'Good Food. Warm Moments. Family Together.',
  hero_description:
    'A welcoming destination for delicious food, memorable moments and quality family dining.',
  hero_image_url: RESTAURANT_ASSETS.photo1_exterior,
  cta_primary_text: 'VIEW MENU',
  cta_secondary_text: 'OUR STORY',
  intro_badge: 'A WARM FAMILY TRADITION',
  intro_title: 'Wholesome Dining Made for Meaningful Conversations',
  intro_body_1:
    'At Green Family Restaurant, every meal is prepared with fresh ingredients, genuine care, and time-honored recipes that satisfy every generation at your table.',
  intro_body_2:
    'From aromatic dum biryanis and rich curries to sizzling tandoori starters and soothing refreshments, our menu offers something delightful for every palate in an atmosphere designed for relaxation.',
  features: [
    {
      id: 'f1',
      title: 'Fresh & Delicious',
      description:
        'Prepared daily using premium ingredients, freshly grounded aromatics, and authentic culinary techniques.',
      icon: 'Utensils',
    },
    {
      id: 'f2',
      title: 'Family Dining',
      description:
        'Spacious, comfortable seating arrangements thoughtfully organized for relaxed family get-togethers and group dinners.',
      icon: 'Users',
    },
    {
      id: 'f3',
      title: 'Warm Hospitality',
      description:
        'Attentive, courteous service dedicated to making every guest feel truly welcomed and cared for.',
      icon: 'HeartHandshake',
    },
    {
      id: 'f4',
      title: 'Comfortable Atmosphere',
      description:
        'Impeccably clean, air-conditioned dining halls styled with calming emerald tones and warm ambient lighting.',
      icon: 'Sparkles',
    },
  ],
  signature_title: 'The Green Family Experience',
  signature_description:
    'From weekday family lunches to celebratory weekend dinners, we bring together generations over hearty portions, vibrant spices, and generous smiles.',
};

export const INITIAL_STORY_CONTENT: StoryContent = {
  id: 'story_default',
  title: 'OUR STORY',
  subtitle:
    'A dedicated family destination built upon the simple joy of sharing authentic, delicious meals together.',
  main_image_url: RESTAURANT_ASSETS.photo2_interior,
  beginning_title: 'Our Beginning',
  beginning_text:
    'Green Family Restaurant was conceived with a heartfelt mission: to create a trustworthy, comforting dining destination where families of all sizes could gather and experience uncompromised food quality in a dignified, warm setting. From day one, our priority has been to serve honest dishes that evoke the comforts of home and the excitement of celebration.',
  philosophy_title: 'Our Philosophy',
  philosophy_text:
    'We believe that great food begins with purity and patience. We steer clear of shortcuts, relying on freshly blended spices, unadulterated oils, and careful timing. For us, hospitality is not merely serving plates; it is welcoming our neighbors and guests as extended members of our own family.',
  quality_title: 'Quality & Hospitality',
  quality_text:
    'Every kitchen preparation adheres to stringent hygiene and freshness standards. Whether it is our simmered gravies, charcoal-kissed kebabs, or steaming breads, our culinary team pours meticulous attention into every recipe so that consistency shines through in every bite.',
  family_title: 'The Family Dining Experience',
  family_text:
    'Dining is at its finest when conversations linger without rush. We designed our dining hall with spacious tables, comfortable cushioned booths, and an ambient acoustic balance that allows grandparents, parents, and children to share stories, celebrate milestones, and create lasting memories.',
};

export const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'cat_starters', name: 'STARTERS', slug: 'starters', display_order: 1, is_active: true },
  { id: 'cat_veg', name: 'VEGETARIAN', slug: 'vegetarian', display_order: 2, is_active: true },
  { id: 'cat_nonveg', name: 'NON-VEGETARIAN', slug: 'non-vegetarian', display_order: 3, is_active: true },
  { id: 'cat_main', name: 'MAIN COURSE', slug: 'main-course', display_order: 4, is_active: true },
  { id: 'cat_rice', name: 'RICE & BIRYANI', slug: 'rice-biryani', display_order: 5, is_active: true },
  { id: 'cat_breads', name: 'BREADS', slug: 'breads', display_order: 6, is_active: true },
  { id: 'cat_beverages', name: 'BEVERAGES', slug: 'beverages', display_order: 7, is_active: true },
  { id: 'cat_desserts', name: 'DESSERTS', slug: 'desserts', display_order: 8, is_active: true },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'm1',
    category_id: 'cat_starters',
    name: 'Paneer Tikka Angara',
    description: 'Cubes of fresh cottage cheese marinated in spiced yogurt and grilled in clay tandoor.',
    price: 260,
    is_veg: true,
    is_available: true,
    is_featured: true,
    spice_level: 'MEDIUM',
    display_order: 1,
  },
  {
    id: 'm2',
    category_id: 'cat_starters',
    name: 'Crispy Corn & Water Chestnut',
    description: 'Golden fried corn kernels and water chestnuts tossed with spring onions and cracked pepper.',
    price: 220,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'MILD',
    display_order: 2,
  },
  {
    id: 'm3',
    category_id: 'cat_starters',
    name: 'Murgh Malai Kebab',
    description: 'Succulent chicken morsels infused with cream, cardamom, and gentle spices, gently char-grilled.',
    price: 320,
    is_veg: false,
    is_available: true,
    is_featured: true,
    spice_level: 'MILD',
    display_order: 3,
  },
  {
    id: 'm4',
    category_id: 'cat_starters',
    name: 'Amritsari Fish Fry',
    description: 'Tender river fish fillets spiced with carom seeds and gram flour batter, fried crisp.',
    price: 360,
    is_veg: false,
    is_available: true,
    is_featured: false,
    spice_level: 'MEDIUM',
    display_order: 4,
  },

  // VEGETARIAN
  {
    id: 'm5',
    category_id: 'cat_veg',
    name: 'Paneer Butter Masala',
    description: 'Classic cottage cheese simmered in a velvety tomato, cashew, and butter reduction.',
    price: 290,
    is_veg: true,
    is_available: true,
    is_featured: true,
    spice_level: 'MILD',
    display_order: 1,
  },
  {
    id: 'm6',
    category_id: 'cat_veg',
    name: 'Dal Makhani Royal',
    description: 'Slow-simmered whole black lentils, kidney beans, churned white butter, and aromatic spices.',
    price: 240,
    is_veg: true,
    is_available: true,
    is_featured: true,
    spice_level: 'MILD',
    display_order: 2,
  },
  {
    id: 'm7',
    category_id: 'cat_veg',
    name: 'Subz Diwani Handi',
    description: 'Garden fresh vegetables cooked in an aromatic spinach and cashew nut gravy.',
    price: 270,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'MEDIUM',
    display_order: 3,
  },

  // NON-VEGETARIAN
  {
    id: 'm8',
    category_id: 'cat_nonveg',
    name: 'Butter Chicken Heritage',
    description: 'Tandoor-roasted chicken in a rich, mild, buttery tomato gravy scented with fenugreek.',
    price: 350,
    is_veg: false,
    is_available: true,
    is_featured: true,
    spice_level: 'MILD',
    display_order: 1,
  },
  {
    id: 'm9',
    category_id: 'cat_nonveg',
    name: 'Rogan Josh Mutton',
    description: 'Slow-cooked tender mutton infused with Kashmiri chillies, cloves, and whole spice blend.',
    price: 420,
    is_veg: false,
    is_available: true,
    is_featured: true,
    spice_level: 'SPICY',
    display_order: 2,
  },
  {
    id: 'm10',
    category_id: 'cat_nonveg',
    name: 'Murgh Kadai Peshawari',
    description: 'Chicken tossed with freshly pounded coriander seeds, bell peppers, and onion gravy.',
    price: 330,
    is_veg: false,
    is_available: true,
    is_featured: false,
    spice_level: 'MEDIUM',
    display_order: 3,
  },

  // MAIN COURSE
  {
    id: 'm11',
    category_id: 'cat_main',
    name: 'Mushroom Do Pyaza',
    description: 'Fresh button mushrooms cooked with twice the onions and aromatic whole spices.',
    price: 260,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'MEDIUM',
    display_order: 1,
  },
  {
    id: 'm12',
    category_id: 'cat_main',
    name: 'Yellow Dal Tadka Double',
    description: 'Golden yellow lentils tempered with ghee, cumin seeds, garlic, and dried red chillies.',
    price: 210,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'MILD',
    display_order: 2,
  },

  // RICE & BIRYANI
  {
    id: 'm13',
    category_id: 'cat_rice',
    name: 'Dum Biryani Murgh (Pot Biryani)',
    description: 'Long-grain basmati rice layered with spiced chicken, mint, brown onions, sealed with dough in copper handi.',
    price: 340,
    is_veg: false,
    is_available: true,
    is_featured: true,
    spice_level: 'MEDIUM',
    display_order: 1,
  },
  {
    id: 'm14',
    category_id: 'cat_rice',
    name: 'Royal Subz Dum Biryani',
    description: 'Fragrant basmati rice infused with seasonal vegetables, saffron, rose water, and mint.',
    price: 270,
    is_veg: true,
    is_available: true,
    is_featured: true,
    spice_level: 'MILD',
    display_order: 2,
  },
  {
    id: 'm15',
    category_id: 'cat_rice',
    name: 'Jeera Ghee Rice',
    description: 'Fluffy aged basmati rice tempered with roasted cumin seeds and pure desi ghee.',
    price: 180,
    is_veg: true,
    is_available: true,
    is_featured: false,
    spice_level: 'NONE',
    display_order: 3,
  },

  // BREADS
  {
    id: 'm16',
    category_id: 'cat_breads',
    name: 'Garlic Butter Naan',
    description: 'Clay-oven baked leavened bread brushed with garlic butter and fresh cilantro.',
    price: 75,
    is_veg: true,
    is_available: true,
    is_featured: true,
    display_order: 1,
  },
  {
    id: 'm17',
    category_id: 'cat_breads',
    name: 'Laccha Paratha',
    description: 'Multi-layered crispy whole wheat flatbread brushed with ghee.',
    price: 65,
    is_veg: true,
    is_available: true,
    is_featured: false,
    display_order: 2,
  },
  {
    id: 'm18',
    category_id: 'cat_breads',
    name: 'Tandoori Roti (Butter / Plain)',
    description: 'Traditional crisp whole wheat bread baked in clay tandoor.',
    price: 35,
    is_veg: true,
    is_available: true,
    is_featured: false,
    display_order: 3,
  },

  // BEVERAGES
  {
    id: 'm19',
    category_id: 'cat_beverages',
    name: 'Green Special Sweet Lassi',
    description: 'Thick churned creamy yogurt drink topped with saffron and crushed pistachios.',
    price: 90,
    is_veg: true,
    is_available: true,
    is_featured: true,
    display_order: 1,
  },
  {
    id: 'm20',
    category_id: 'cat_beverages',
    name: 'Masala Spiced Chaas',
    description: 'Traditional buttermilk seasoned with roasted cumin, green chillies, ginger, and black salt.',
    price: 60,
    is_veg: true,
    is_available: true,
    is_featured: false,
    display_order: 2,
  },
  {
    id: 'm21',
    category_id: 'cat_beverages',
    name: 'Fresh Mint Lime Cooler',
    description: 'Crushed garden mint, freshly squeezed lime, and sparkling soda with rock salt.',
    price: 80,
    is_veg: true,
    is_available: true,
    is_featured: false,
    display_order: 3,
  },

  // DESSERTS
  {
    id: 'm22',
    category_id: 'cat_desserts',
    name: 'Gulab Jamun Royal (Warm)',
    description: 'Piping hot reduced milk dumplings soaked in cardamom and rose sugar syrup.',
    price: 110,
    is_veg: true,
    is_available: true,
    is_featured: true,
    display_order: 1,
  },
  {
    id: 'm23',
    category_id: 'cat_desserts',
    name: 'Kesari Matka Kulfi',
    description: 'Traditional slow-reduced dense pistachio and saffron milk ice served in earthen pot.',
    price: 130,
    is_veg: true,
    is_available: true,
    is_featured: true,
    display_order: 2,
  },
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal_1',
    title: 'Restaurant Facade & Welcoming Entrance',
    category: 'EXTERIOR',
    image_url: RESTAURANT_ASSETS.photo1_exterior,
    is_featured: true,
    caption: 'The welcoming exterior of Green Family Restaurant illuminated for evening guests.',
    display_order: 1,
  },
  {
    id: 'gal_2',
    title: 'Spacious Family Dining Hall & Seating',
    category: 'INTERIOR',
    image_url: RESTAURANT_ASSETS.photo2_interior,
    is_featured: true,
    caption: 'Thoughtfully designed dining hall with comfortable emerald booths and warm ambient lighting.',
    display_order: 2,
  },
  {
    id: 'gal_3',
    title: 'Signature Family Feast & Royal Biryani',
    category: 'DINING',
    image_url: RESTAURANT_ASSETS.photo3_dining,
    is_featured: true,
    caption: 'An authentic multi-course family feast featuring aromatic handi biryani and traditional accompaniments.',
    display_order: 3,
  },
  {
    id: 'gal_4',
    title: 'Official Restaurant Brand Identity & Signage',
    category: 'ATMOSPHERE',
    image_url: RESTAURANT_ASSETS.photo4_logo_branding,
    is_featured: false,
    caption: 'The distinguished Green Family Restaurant emblem representing our commitment to warm hospitality.',
    display_order: 4,
  },
];

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  id: 'social_default',
  instagram_url: 'https://instagram.com/[RESTAURANT_INSTAGRAM_PLACEHOLDER]',
  facebook_url: 'https://facebook.com/[RESTAURANT_FACEBOOK_PLACEHOLDER]',
  whatsapp_number: '+91 [RESTAURANT_WHATSAPP_PLACEHOLDER]',
};
