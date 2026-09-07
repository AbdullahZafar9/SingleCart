export const MALL_CATEGORIES = [
  { id: 'all', name: 'All Boutiques', icon: '🏬', description: 'Explore all digital mall storefronts' },
  { id: 'streetwear', name: 'Street Wear', icon: '👕', description: 'Oversized hoodies, denim & graphic drops' },
  { id: 'skincare', name: 'Skin Care', icon: '✨', description: 'Clean botanical serums, creams & cleansers' },
  { id: 'shoes', name: 'Shoes', icon: '👟', description: 'Retro runners, sneakers & artisan boots' },
  { id: 'tech', name: 'Tech Accessories', icon: '⚡', description: 'Audio monitors, mechanical keyboards & cables' },
  { id: 'bags', name: 'Bags', icon: '🎒', description: 'Commuter backpacks, leather duffels & slings' }
];

export const INITIAL_SHOPS = [
  {
    id: 'retailer-1',
    shop_name: 'Apex Streetwear & Denim',
    category: 'streetwear',
    department: 'Street Wear',
    rating: 4.9,
    reviews_count: 168,
    location_in_mall: 'Floor 2, West Promenade (Suite 204)',
    phone: '+1 (555) 302-8819',
    description: 'High-concept urban streetwear, heavyweight boxy hoodies, Japanese selvedge denim, and limited graphic drops.',
    logo_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#ea580c'
  },
  {
    id: 'retailer-2',
    shop_name: 'Aura Botanical Skincare',
    category: 'skincare',
    department: 'Skin Care',
    rating: 4.8,
    reviews_count: 145,
    location_in_mall: 'Floor 1, Garden Court (Suite 118)',
    phone: '+1 (555) 672-0044',
    description: 'Clean dermatological formulas, botanical facial oils, squalane hydration serums, and barrier-repair cleansers.',
    logo_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#10b981'
  },
  {
    id: 'retailer-3',
    shop_name: 'SoleCraft Shoes & Sneakers',
    category: 'shoes',
    department: 'Shoes',
    rating: 4.9,
    reviews_count: 210,
    location_in_mall: 'Floor 1, North Concourse (Suite 142)',
    phone: '+1 (555) 441-8899',
    description: 'Limited edition retro trainers, handcrafted leather Chelsea boots, lightweight runners, and Italian loafers.',
    logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#d97706'
  },
  {
    id: 'retailer-4',
    shop_name: 'CyberPulse Tech Accessories',
    category: 'tech',
    department: 'Tech Accessories',
    rating: 4.9,
    reviews_count: 132,
    location_in_mall: 'Floor 3, Innovation Hub (Suite 310)',
    phone: '+1 (555) 789-2211',
    description: 'Audiophile wireless noise-cancelling monitors, custom mechanical keyboards, titanium charging pads, and cables.',
    logo_url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#3b82f6'
  },
  {
    id: 'retailer-5',
    shop_name: 'Nomad Bags & Leathercraft',
    category: 'bags',
    department: 'Bags',
    rating: 4.9,
    reviews_count: 118,
    location_in_mall: 'Floor 2, South Promenade (Suite 228)',
    phone: '+1 (555) 901-4477',
    description: 'Weatherproof commuter backpacks, full-grain leather weekender duffels, ballistic slings, and canvas totes.',
    logo_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#8b5cf6'
  }
];

export const INITIAL_PRODUCTS = [
  // 1. Street Wear - Apex Streetwear & Denim (retailer-1)
  {
    id: 'prod-101',
    retailer_id: 'retailer-1',
    name: 'Midnight Boxy Heavyweight Hoodie',
    category: 'streetwear',
    price: 98.00,
    badge: '🔥 Bestseller',
    description: '450 GSM organic French terry cotton with subtle high-density tonal embroidery and drop shoulders.',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-102',
    retailer_id: 'retailer-1',
    name: 'Selvedge Raw Denim Relaxed Pant',
    category: 'streetwear',
    price: 145.00,
    badge: '⭐ Premium Cut',
    description: '14oz Kurabo Japanese shuttle-loom selvedge denim with custom oxidized brass hardware.',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-103',
    retailer_id: 'retailer-1',
    name: 'Vintage Wash Heavy Cotton Graphic Tee',
    category: 'streetwear',
    price: 48.00,
    badge: '✨ New Drop',
    description: 'Pre-shrunk 240 GSM combed cotton with faded distressed wash and vintage screenprint.',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // 2. Skin Care - Aura Botanical Skincare (retailer-2)
  {
    id: 'prod-201',
    retailer_id: 'retailer-2',
    name: 'Celestial Glow Squalane Facial Elixir',
    category: 'skincare',
    price: 48.00,
    badge: '✨ Radiance',
    description: 'Deeply hydrating plant-derived squalane infused with cold-pressed rosehip seed and blue tansy oil.',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-202',
    retailer_id: 'retailer-2',
    name: 'Botanical Rosehip & Oat Cleansing Balm',
    category: 'skincare',
    price: 36.00,
    badge: '🌿 Clean Beauty',
    description: 'Melt-away antioxidant cleansing balm that gently breaks down SPF and impurities without stripping.',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-203',
    retailer_id: 'retailer-2',
    name: 'Peptide Infusion Overnight Barrier Cream',
    category: 'skincare',
    price: 52.00,
    badge: '💧 Barrier Restore',
    description: 'Multi-peptide ceramide complex designed to repair skin barrier resilience and lock in moisture.',
    image_url: 'https://images.unsplash.com/photo-1608248597359-07f9c8f2b3e8?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // 3. Shoes - SoleCraft Shoes & Sneakers (retailer-3)
  {
    id: 'prod-301',
    retailer_id: 'retailer-3',
    name: 'Phantom Kinetic Retro Low-Top Sneakers',
    category: 'shoes',
    price: 135.00,
    badge: '👟 Trending',
    description: 'Premium Italian calfskin leather with gum sole and ergonomic OrthoLite cushioned footbed.',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-302',
    retailer_id: 'retailer-3',
    name: 'Artisan Chelsea Boot in Handcrafted Suede',
    category: 'shoes',
    price: 185.00,
    badge: '⭐ Handcrafted',
    description: 'Goodyear-welted waxed suede leather with elasticated side gussets and Vibram lugged outsoles.',
    image_url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-303',
    retailer_id: 'retailer-3',
    name: 'CloudStrider Ultralight Cushion Runner',
    category: 'shoes',
    price: 120.00,
    badge: '⚡ Performance',
    description: 'Engineered breathable knit upper with nitrogen-infused foam midsole for boundless energy return.',
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // 4. Tech Accessories - CyberPulse Tech Accessories (retailer-4)
  {
    id: 'prod-401',
    retailer_id: 'retailer-4',
    name: 'PulseWave Active Noise Cancelling Headphones',
    category: 'tech',
    price: 249.00,
    badge: '⚡ Top Rated',
    description: 'Dual bio-cellulose dynamic drivers, 48dB active hybrid noise cancellation, and 40-hour battery life.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-402',
    retailer_id: 'retailer-4',
    name: 'Lumik 75% Mechanical Wireless Keyboard',
    category: 'tech',
    price: 139.00,
    badge: '⌨️ Enthusiast',
    description: 'CNC aluminum chassis with pre-lubed Gateron Yellow switches, sound-dampening silicone, and RGB.',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-403',
    retailer_id: 'retailer-4',
    name: 'MagFast Titanium Qi2 Wireless Charging Pad',
    category: 'tech',
    price: 54.00,
    badge: '⚡ Fast Charge',
    description: 'Braided aramid cable with aerospace titanium housing capable of 15W high-speed magnetic alignment.',
    image_url: 'https://images.unsplash.com/photo-1622445262464-84b1a07374a4?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // 5. Bags - Nomad Bags & Leathercraft (retailer-5)
  {
    id: 'prod-501',
    retailer_id: 'retailer-5',
    name: 'Voyager Weatherproof Commuter Backpack',
    category: 'bags',
    price: 125.00,
    badge: '🎒 Daily Carry',
    description: 'Cordura 1000D ballistic nylon with padded 16" laptop pocket and magnetic Fidlock quick release.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-502',
    retailer_id: 'retailer-5',
    name: 'Heritage Full-Grain Leather Weekender Duffel',
    category: 'bags',
    price: 195.00,
    badge: '⭐ Premium Leather',
    description: 'Hand-burnished vegetable-tanned leather with heavy solid brass YKK zippers and reinforced base.',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-503',
    retailer_id: 'retailer-5',
    name: 'Tactical Ballistic Crossbody Sling',
    category: 'bags',
    price: 68.00,
    badge: '✨ Modular',
    description: 'Compact weather-sealed sling with quick-adjust strap, internal passport slot, and key leash.',
    image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 1001,
    retailer_id: 'retailer-1',
    customer_name: 'Marcus Vance',
    customer_phone: '+1 (555) 234-9812',
    delivery_notes: 'Floor 2 Pickup Locker Bay B',
    total_price: 98.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    items: [
      { id: 'prod-101', name: 'Midnight Boxy Heavyweight Hoodie', price: 98.00, quantity: 1 }
    ]
  },
  {
    id: 1002,
    retailer_id: 'retailer-3',
    customer_name: 'Sophia Chen',
    customer_phone: '+1 (555) 891-2304',
    delivery_notes: 'Curbside Pickup Bay C',
    total_price: 135.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { id: 'prod-301', name: 'Phantom Kinetic Retro Low-Top Sneakers', price: 135.00, quantity: 1 }
    ]
  },
  {
    id: 1003,
    retailer_id: 'retailer-4',
    customer_name: 'Liam Gallagher',
    customer_phone: '+1 (555) 345-6789',
    delivery_notes: 'Pickup at Tech Hub Counter',
    total_price: 139.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    items: [
      { id: 'prod-402', name: 'Lumik 75% Mechanical Wireless Keyboard', price: 139.00, quantity: 1 }
    ]
  },
  {
    id: 1004,
    retailer_id: 'retailer-2',
    customer_name: 'Elena Rostova',
    customer_phone: '+1 (555) 778-9901',
    delivery_notes: 'Garden Court Lounge',
    total_price: 48.00,
    status: 'Preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    items: [
      { id: 'prod-201', name: 'Celestial Glow Squalane Facial Elixir', price: 48.00, quantity: 1 }
    ]
  },
  {
    id: 1005,
    retailer_id: 'retailer-5',
    customer_name: 'Devon Brooks',
    customer_phone: '+1 (555) 432-1199',
    delivery_notes: 'Store Counter Pickup',
    total_price: 125.00,
    status: 'Pending',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    items: [
      { id: 'prod-501', name: 'Voyager Weatherproof Commuter Backpack', price: 125.00, quantity: 1 }
    ]
  }
];
